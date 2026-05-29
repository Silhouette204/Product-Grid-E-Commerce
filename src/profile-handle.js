// src/profile-manager.js

document.addEventListener("DOMContentLoaded", () => {
  const activeSession = JSON.parse(localStorage.getItem("active_user_session"));

  // ⚙️ DEFINED LOCAL TOAST ENGINE (Siguradong gagana kahit walang window scope)
  function localShowToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
  
    setTimeout(() => toast.classList.add("show"), 100);
  
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400); 
    }, 3000);
  }

  if (!activeSession) {
    alert("🔒 Security Override Active: Access Denied. Please authenticate.");
    window.location.href = "sign-in.html";
    return;
  }

  // TARGET DISPLAY DOM NODES
  const heroUsername = document.getElementById("hero-username");
  const heroEmail = document.getElementById("hero-email");
  const heroContact = document.getElementById("hero-contact");
  const heroSignUpDate = document.getElementById("hero-signup-date");

  const bioFullName = document.getElementById("bio-fullname");
  const bioUsername = document.getElementById("bio-username");
  const bioContact = document.getElementById("bio-contact");
  const bioEmail = document.getElementById("bio-email");

  const addrCountry = document.getElementById("addr-country");
  const addrCity = document.getElementById("addr-city");
  const addrPostal = document.getElementById("addr-postal");
  const addrHome = document.getElementById("addr-home");

  // MODAL ELEMENT DOM HOOKS
  const bioModal = document.getElementById("bio-modal");
  const addrModal = document.getElementById("addr-modal");
  const securityGateModal = document.getElementById("security-gate-modal");
  const sensitiveUpdateModal = document.getElementById("sensitive-update-modal");

  const editBioBtn = document.getElementById("edit-bio-btn");
  const editAddrBtn = document.getElementById("edit-addr-btn");

  const closeBioModal = document.getElementById("close-bio-modal");
  const closeAddrModal = document.getElementById("close-addr-modal");
  const closeGateModal = document.getElementById("close-gate-modal");
  const closeSensitiveBtns = document.querySelectorAll(".close-sensitive-modal");

  const bioForm = document.getElementById("bio-form");
  const addrForm = document.getElementById("addr-form");
  const securityGateForm = document.getElementById("security-gate-form");
  const sensitiveEmailForm = document.getElementById("sensitive-email-form");
  const sensitivePassForm = document.getElementById("sensitive-pass-form");
  
  const orderStatusContainer = document.getElementById("order-status-container");

  // Eye modal sa password setting
  const toggleUpdatePassBtn = document.getElementById("toggle-update-pass");
  const updatePasswordInput = document.getElementById("update-new-password");

  // State tracker para sa security gate Routing
  let activeSecurityTarget = ""; 

  // ==========================================
  // FUNCTION: RENDER DOM SCREEN INFORMATION
  // ==========================================
  function refreshProfileScreen() {
    const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
    const masterUserData = allUsers.find(u => u.email === activeSession.email);
    


    if (!masterUserData) return;

    if (bioFullName) bioFullName.textContent = masterUserData.fullname || "N.A";
    if (bioUsername) bioUsername.textContent = masterUserData.username || "N.A"; 
    if (bioContact) bioContact.textContent = masterUserData.contact || "N.A";
    if (bioEmail) bioEmail.textContent = masterUserData.email || "N.A";

    if (orderStatusContainer) {
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
      const allOrdersActive = JSON.parse(localStorage.getItem("computer_grid_orders")) || [];
      const allOrdersArchived = JSON.parse(localStorage.getItem("computer_grid_archived")) || [];
      const allOrders = [...allOrdersActive, ...allOrdersArchived];

      function parseOrderDateToMs(order) {
        const raw = order.lastPurchaseAt || order.purchaseDate || order.date;
        if (!raw) return null;
        const dt = new Date(raw);
        const ms = dt.getTime();
        return Number.isFinite(ms) ? ms : null;
      }

      const userOrders = allOrders.filter(order => {
        const norm = (v) => (v ?? "").toString().trim().toLowerCase();
        const orderEmail = norm(order.userEmail || order.email);
        const activeEmail = norm(activeSession.email);
        const orderName = norm(order.customerName);
        const activeUsername = norm(activeSession.username);
        const masterFullname = norm(masterUserData.fullname);
        const masterUsername = norm(masterUserData.username);

        const matchEmail = orderEmail && activeEmail && orderEmail === activeEmail;
        const matchName =
          orderName &&
          ((activeUsername && orderName === activeUsername) ||
            (masterFullname && orderName === masterFullname) ||
            (masterUsername && orderName === masterUsername));

        return matchEmail || matchName;
      });

      const lastPurchaseMs = userOrders
        .map(parseOrderDateToMs)
        .filter(Boolean)
        .sort((a, b) => b - a)[0] || null;

      const isActive =
        userOrders.length > 0 && (lastPurchaseMs === null || (Date.now() - lastPurchaseMs) <= oneWeekMs);

      if (isActive) {
        orderStatusContainer.className = "text-emerald-400 ml-1 inline-flex items-center font-semibold text-sm";
        orderStatusContainer.innerHTML = `
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
          Active
        `;
      } else {
        orderStatusContainer.className = "text-yellow-500 ml-1 inline-flex items-center font-semibold text-sm";
        orderStatusContainer.innerHTML = `
          <span class="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
          Inactive
        `;
      }
    }

    if (heroUsername) heroUsername.textContent = masterUserData.username || "Agent";
    if (heroEmail) heroEmail.textContent = masterUserData.email || "N/A";
    if (heroContact) heroContact.textContent = masterUserData.contact || "None";
    if (heroSignUpDate) {
      heroSignUpDate.textContent =
        activeSession.signUpDate ||
        masterUserData.signUpDate ||
        "N/A";
    }

    if (addrCountry) addrCountry.textContent = masterUserData.address?.country || "N.A";
    if (addrCity) addrCity.textContent = masterUserData.address?.city || "N.A";
    if (addrPostal) addrPostal.textContent = masterUserData.address?.postalCode || "N.A";
    if (addrHome) addrHome.textContent = masterUserData.address?.homeAddress || "N.A";
  }

  refreshProfileScreen();

  // A. BIODATA MODAL OVERLAYS
  if (editBioBtn) {
    editBioBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email === activeSession.email);
      
      document.getElementById("modal-fullname").value = masterUserData?.fullname || "";
      document.getElementById("modal-username").value = masterUserData?.username || "";
      document.getElementById("modal-contact").value = masterUserData?.contact || "";
      
      const modalEmailInput = document.getElementById("modal-locked-email");
      if (modalEmailInput) {
        modalEmailInput.value = masterUserData?.email || activeSession.email || "";
      }

      const modalPasswordInput = document.getElementById("modal-locked-password");
      if (modalPasswordInput) {
        modalPasswordInput.value = masterUserData?.password || "";
        modalPasswordInput.type = "password"; 
      }

      bioModal.classList.remove("hidden");
    });
  }

  if (closeBioModal) {
    closeBioModal.addEventListener("click", () => bioModal.classList.add("hidden"));
  }

  const togglePasswordBtn = document.getElementById("toggle-locked-pass");
  const modalPasswordInput = document.getElementById("modal-locked-password");
  if (togglePasswordBtn && modalPasswordInput) {
    togglePasswordBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const icon = togglePasswordBtn.querySelector("i");
      if (modalPasswordInput.type === "password") {
        modalPasswordInput.type = "text";
        if (icon) icon.className = "fa-solid fa-eye-slash text-xs";
      } else {
        modalPasswordInput.type = "password";
        if (icon) icon.className = "fa-solid fa-eye text-xs";
      }
    });
  }

  if (bioForm) {
    bioForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputFullName = document.getElementById("modal-fullname").value.trim();
      const inputContact = document.getElementById("modal-contact").value.trim();
      const usernameField = document.getElementById("modal-username");
      const inputUsername = usernameField ? usernameField.value.trim() : activeSession.username;

      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const userIndex = allUsers.findIndex(u => u.email === activeSession.email);

      if (userIndex !== -1) {
        allUsers[userIndex].fullname = inputFullName;
        allUsers[userIndex].username = inputUsername;
        allUsers[userIndex].contact = inputContact;
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
        
        activeSession.username = inputUsername;
        activeSession.contact = inputContact;
        localStorage.setItem("active_user_session", JSON.stringify(activeSession));

        bioModal.classList.add("hidden");
        refreshProfileScreen();
        
        // ⚡ GINAMIT ANG LOCAL TOAST DRIVER PARA SIGURADONG GAGANA
        localShowToast("⚡ Biodata parameters synchronized successfully!");
      }
    });
  }

  // 🔐 SECURITY GATE LOGIC
  const triggerEmailGate = document.getElementById("trigger-email-gate");
  const triggerPassGate = document.getElementById("trigger-pass-gate");

  if (triggerEmailGate) {
    triggerEmailGate.addEventListener("click", () => {
      activeSecurityTarget = "email";
      document.getElementById("gate-current-password").value = "";
      if (securityGateModal) securityGateModal.classList.remove("hidden");
    });
  }

  if (triggerPassGate) {
    triggerPassGate.addEventListener("click", () => {
      activeSecurityTarget = "password";
      document.getElementById("gate-current-password").value = "";
      if (securityGateModal) securityGateModal.classList.remove("hidden");
    });
  }

  if (closeGateModal) {
    closeGateModal.addEventListener("click", () => securityGateModal.classList.add("hidden"));
  }

  if (securityGateForm) {
    securityGateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPassword = document.getElementById("gate-current-password").value;
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email === activeSession.email);

      if (masterUserData && masterUserData.password === enteredPassword) {
        securityGateModal.classList.add("hidden");
        sensitiveEmailForm.classList.add("hidden");
        sensitivePassForm.classList.add("hidden");

        const sensitiveTitle = document.getElementById("sensitive-title");

        if (sensitiveTitle) {
          sensitiveTitle.classList.remove("text-white");
          sensitiveTitle.classList.add("text-secondary");
        }

        if (activeSecurityTarget === "email") {
          if (sensitiveTitle) sensitiveTitle.textContent = "Update Email Address";
          sensitiveEmailForm.classList.remove("hidden");
          document.getElementById("update-new-email").value = "";
        } else if (activeSecurityTarget === "password") {
          if (sensitiveTitle) sensitiveTitle.textContent = "Update Security Password";
          sensitivePassForm.classList.remove("hidden");
          document.getElementById("update-new-password").value = "";
          document.getElementById("update-confirm-password").value = "";
        }

        // 👍 FIXED: Tinanggal ang maling localShowToast dito (kasi bubuksan pa lang ang modal)
        if (sensitiveUpdateModal) sensitiveUpdateModal.classList.remove("hidden");
      } else {
        alert("❌ Incorrect password verification. Access denied.");
      }
    });
  }

  closeSensitiveBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (sensitiveUpdateModal) sensitiveUpdateModal.classList.add("hidden");
    });
  });

  // Handle Update Email Process Flow
  if (sensitiveEmailForm) {
    sensitiveEmailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newEmail = document.getElementById("update-new-email").value.trim().toLowerCase();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];

      const emailExists = allUsers.some(u => u.email.toLowerCase() === newEmail && u.email.toLowerCase() !== activeSession.email.toLowerCase());

      if (emailExists) {
        alert("⚠️ Email address is already in use by another account.");
        return;
      }

      const userIndex = allUsers.findIndex(u => u.email === activeSession.email);
      if (userIndex !== -1) {
        allUsers[userIndex].email = newEmail;
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));

        activeSession.email = newEmail;
        localStorage.setItem("active_user_session", JSON.stringify(activeSession));

        sensitiveUpdateModal.classList.add("hidden");
        bioModal.classList.add("hidden"); 
        refreshProfileScreen();
        
        // ⚡ FIXED: Direktang tinawag ang local function ng tama!
        localShowToast("📧 Email address updated and synchronized successfully!");
      }
    });
  }

  // Handle Update Password Process Flow
  if (sensitivePassForm) {
    sensitivePassForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("update-new-password").value.trim();
      const confirmPassword = document.getElementById("update-confirm-password").value.trim();
  
      if (newPassword !== confirmPassword) {
        alert("⚠️ Confirm password does not match with your entry.");
        return;
      }
  
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const userIndex = allUsers.findIndex(u => u.email === activeSession.email);
  
      if (userIndex !== -1) {
        allUsers[userIndex].password = newPassword;
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
  
        sensitiveUpdateModal.classList.add("hidden");
        bioModal.classList.add("hidden");
        refreshProfileScreen();
        
        // ⚡ FIXED: Tinanggal ang window check, ginamit ang local engine sa TAMANG ORAS (dito sa dulo ng submit)
        localShowToast("🔒 Security password updated successfully!");
      }
    });
  }

  if (toggleUpdatePassBtn && updatePasswordInput) {
    toggleUpdatePassBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const icon = toggleUpdatePassBtn.querySelector("i");
      if (updatePasswordInput.type === "password") {
        updatePasswordInput.type = "text";
        if (icon) icon.className = "fa-solid fa-eye-slash text-xs";
      } else {
        updatePasswordInput.type = "password";
        if (icon) icon.className = "fa-solid fa-eye text-xs";
      }
    });
  }

  // B. ADDRESS MODAL OVERLAYS
  if (editAddrBtn) {
    editAddrBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email === activeSession.email);
      
      document.getElementById("modal-country").value = masterUserData?.address?.country || "";
      document.getElementById("modal-city").value = masterUserData?.address?.city || "";
      document.getElementById("modal-postal").value = masterUserData?.address?.postalCode || "";
      document.getElementById("modal-home").value = masterUserData?.address?.homeAddress || "";
      
      addrModal.classList.remove("hidden");
    });
  }

  if (closeAddrModal) {
    closeAddrModal.addEventListener("click", () => addrModal.classList.add("hidden"));
  }

  if (addrForm) {
    addrForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const country = document.getElementById("modal-country").value.trim();
      const city = document.getElementById("modal-city").value.trim();
      const postalCode = document.getElementById("modal-postal").value.trim();
      const homeAddress = document.getElementById("modal-home").value.trim();

      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const userIndex = allUsers.findIndex(u => u.email === activeSession.email);

      if (userIndex !== -1) {
        allUsers[userIndex].address = { country, city, postalCode, homeAddress };
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));

        addrModal.classList.add("hidden");
        refreshProfileScreen();
        localShowToast("🌍 Address grid layout configuration saved!");
      }
    });
  }
});


//PROFILE AVATAR
// 1. Trigger para buksan ang Local File Manager ng device
function triggerFileInput() {
  document.getElementById('hidden-avatar-input').click();
}

// 2. Basahin ang image, i-convert sa Base64, at i-commit sa LocalStorage
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  
  if (file) {
      // Guard Check Rule: Limitahan sa 2MB para hindi sumabog ang localStorage limits
      if (file.size > 2 * 1024 * 1024) {
          alert("Masyadong malaki ang larawan! Pumili ng file na mababa sa 2MB para mag-save.");
          event.target.value = ""; // Clear values
          return;
      }

      const reader = new FileReader();
      
      reader.onload = function(e) {
          const base64Str = e.target.result;
          
          // Kuhanin ang active user records mula sa database mo
          let currentUser = JSON.parse(localStorage.getItem('active_user_session'));
          let allUsers = JSON.parse(localStorage.getItem('computer_grid_users')) || [];

          if (currentUser) {
              // I-save ang Base64 string sa local app instance fields
              currentUser.avatar = base64Str;
              localStorage.setItem('active_user_session', JSON.stringify(currentUser));

              // I-sync ang record node sa master users block array
              let userIndex = allUsers.findIndex(user => user.username === currentUser.username);
              if (userIndex !== -1) {
                  allUsers[userIndex].avatar = base64Str;
                  localStorage.setItem('computer_grid_users', JSON.stringify(allUsers));
              }

              // Patakbuhin agad ang display update function para makita ang pagbabago
              renderUserAvatar();
              
              // Kung may load global navbar notification function ka, pwede mo ring tawagin dito:
              // if(typeof updateNavbarAvatar === "function") updateNavbarAvatar();
          }
      };
      
      reader.readAsDataURL(file); // Execute logic stream conversion
  }
}

// 3. Render Loop Execution Controller (Tawagin mo ito sa initialization / window onload phase mo)
function renderUserAvatar() {
  const session = JSON.parse(localStorage.getItem('active_user_session'));
  const avatarImg = document.getElementById('user-avatar-render');
  const defaultIcon = document.getElementById('default-avatar-icon');

  if (session && session.avatar) {
      // Kung may nakitang existing Base64, ipakita ang image node at itago ang static user icon
      avatarImg.src = session.avatar;
      avatarImg.classList.remove('hidden');
      defaultIcon.classList.add('hidden');
  } else {
      // Fallback layout state kung bagong gawa o walang upload record
      avatarImg.classList.add('hidden');
      defaultIcon.classList.remove('hidden');
  }
}

// Siguraduhing tumatakbo ito sa tuwing naglo-load ang profile page para laging up-to-date ang mukha ng account mo
document.addEventListener("DOMContentLoaded", () => {
  renderUserAvatar();
});