// ==========================================
// AVATAR ENGINE: GLOBAL SCOPE BRIDGE
// ==========================================
window.triggerFileInput = function() {
  const fileInput = document.getElementById('hidden-avatar-input');
  if (fileInput) fileInput.click();
};

window.handleAvatarUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Image = e.target.result;
    const activeSession = JSON.parse(localStorage.getItem("active_user_session"));
    const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];

    if (activeSession) {
      activeSession.profileImage = base64Image;
      localStorage.setItem("active_user_session", JSON.stringify(activeSession));

      const updatedUsers = allUsers.map(user => {
        if (user.email.toLowerCase() === activeSession.email.toLowerCase()) {
          return { ...user, profileImage: base64Image };
        }
        return user;
      });
      localStorage.setItem("computer_grid_users", JSON.stringify(updatedUsers));

      const avatarRender = document.getElementById("user-avatar-render");
      if (avatarRender) avatarRender.src = base64Image;

      alert("📸 Profile avatar synchronized and saved permanently!");
    }
  };
  reader.readAsDataURL(file);
};

// ==========================================
// CORE PROFILE EVENT MANAGER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const activeSession = JSON.parse(localStorage.getItem("active_user_session"));

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

  // 🚨 CRITICAL DOM HOOKS (Dito nadale ni Cursor kaya nawalan ng malay ang mga buttons)
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

  // Modals
  const bioModal = document.getElementById("bio-modal");
  const addrModal = document.getElementById("addr-modal");
  const securityGateModal = document.getElementById("security-gate-modal");
  const sensitiveUpdateModal = document.getElementById("sensitive-update-modal");

  // Action Buttons
  const editBioBtn = document.getElementById("edit-bio-btn");
  const editAddrBtn = document.getElementById("edit-addr-btn");
  const triggerEmailGate = document.getElementById("trigger-email-gate"); // Nabura ni Cursor
  const triggerPassGate = document.getElementById("trigger-pass-gate");   // Nabura ni Cursor

  // Close Buttons
  const closeBioModal = document.getElementById("close-bio-modal");
  const closeAddrModal = document.getElementById("close-addr-modal");
  const closeGateModal = document.getElementById("close-gate-modal");
  const closeSensitiveBtns = document.querySelectorAll(".close-sensitive-modal");

  // Forms
  const bioForm = document.getElementById("bio-form");
  const addrForm = document.getElementById("addr-form");
  const securityGateForm = document.getElementById("security-gate-form");
  const sensitiveEmailForm = document.getElementById("sensitive-email-form");
  const sensitivePassForm = document.getElementById("sensitive-pass-form");
  
  const orderStatusContainer = document.getElementById("order-status-container");

  let activeSecurityTarget = ""; 

  // ==========================================
  // SCREEN REFRESH & STATE RENDER ENGINE
  // ==========================================
  function refreshProfileScreen() {
    const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
    const masterUserData = allUsers.find(u => u.email.toLowerCase() === activeSession.email.toLowerCase());

    if (!masterUserData) return;

    // Render Text to Fields
    if (bioFullName) bioFullName.textContent = masterUserData.fullname || "N.A";
    if (bioUsername) bioUsername.textContent = masterUserData.username || "N.A"; 
    if (bioContact) bioContact.textContent = masterUserData.contact || "N.A";
    if (bioEmail) bioEmail.textContent = masterUserData.email || "N.A";

    if (heroUsername) heroUsername.textContent = masterUserData.username || "Agent";
    if (heroEmail) heroEmail.textContent = masterUserData.email || "--";
    if (heroContact) heroContact.textContent = masterUserData.contact || "--";
    if (heroSignUpDate) heroSignUpDate.textContent = activeSession.signUpDate || masterUserData.signUpDate || "--";

    if (addrCountry) addrCountry.textContent = masterUserData.address?.country || "N.A";
    if (addrCity) addrCity.textContent = masterUserData.address?.city || "N.A";
    if (addrPostal) addrPostal.textContent = masterUserData.address?.postalCode || "N.A";
    if (addrHome) addrHome.textContent = masterUserData.address?.homeAddress || "N.A";

    // 📦 RE-SYNC ORDER STATUS & TRANSACTION ENGINE
    if (orderStatusContainer) {
      const allOrdersActive = JSON.parse(localStorage.getItem("computer_grid_orders")) || [];
      const allOrdersArchived = JSON.parse(localStorage.getItem("computer_grid_archived")) || [];
      const allOrders = [...allOrdersActive, ...allOrdersArchived];

      // Safe deep filtering para kahit magkaiba ang key naming sa pages, hihilahin pa rin
      const userOrders = allOrders.filter(order => {
        const orderEmail = order.userEmail || order.email || "";
        return orderEmail.trim().toLowerCase() === activeSession.email.trim().toLowerCase();
      });

      if (userOrders.length > 0) {
        orderStatusContainer.className = "text-emerald-400 ml-1 inline-flex items-center font-semibold text-sm";
        orderStatusContainer.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1"></span>Active`;
      } else {
        orderStatusContainer.className = "text-yellow-500 ml-1 inline-flex items-center font-semibold text-sm";
        orderStatusContainer.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>Inactive`;
      }
    }

    // Avatar Render Check
    const avatarRender = document.getElementById("user-avatar-render");
    if (avatarRender) {
      if (masterUserData && masterUserData.profileImage) {
        avatarRender.src = masterUserData.profileImage;
      } else {
        avatarRender.src = "./public/image/default-avatar.png"; 
      }
    }
  }

  // Initial Load Trigger
  refreshProfileScreen();

  // ==========================================
  // EVENT LISTENERS: MODAL TRIGGERS & HANDLING
  // ==========================================
  
  // A. Biodata Modal Form Open
  if (editBioBtn) {
    editBioBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email.toLowerCase() === activeSession.email.toLowerCase());
      
      document.getElementById("modal-fullname").value = masterUserData?.fullname || "";
      document.getElementById("modal-username").value = masterUserData?.username || "";
      document.getElementById("modal-contact").value = masterUserData?.contact || "";
      
      if (document.getElementById("modal-locked-email")) {
        document.getElementById("modal-locked-email").value = masterUserData?.email || activeSession.email || "";
      }
      if (document.getElementById("modal-locked-password")) {
        document.getElementById("modal-locked-password").value = masterUserData?.password || "";
      }
      bioModal.classList.remove("hidden");
    });
  }

  if (closeBioModal) closeBioModal.addEventListener("click", () => bioModal.classList.add("hidden"));

  if (bioForm) {
    bioForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === activeSession.email.toLowerCase());

      if (userIndex !== -1) {
        allUsers[userIndex].fullname = document.getElementById("modal-fullname").value.trim();
        allUsers[userIndex].username = document.getElementById("modal-username").value.trim();
        allUsers[userIndex].contact = document.getElementById("modal-contact").value.trim();
        
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
        
        activeSession.username = allUsers[userIndex].username;
        activeSession.contact = allUsers[userIndex].contact;
        localStorage.setItem("active_user_session", JSON.stringify(activeSession));

        bioModal.classList.add("hidden");
        refreshProfileScreen();
        localShowToast("⚡ Biodata parameters synchronized successfully!");
      }
    });
  }

  // B. Address Modal Flow (Sinira ni Cursor, eto na ang fix)
  if (editAddrBtn) {
    editAddrBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email.toLowerCase() === activeSession.email.toLowerCase());
      
      document.getElementById("modal-country").value = masterUserData?.address?.country || "";
      document.getElementById("modal-city").value = masterUserData?.address?.city || "";
      document.getElementById("modal-postal").value = masterUserData?.address?.postalCode || "";
      document.getElementById("modal-home").value = masterUserData?.address?.homeAddress || "";
      
      addrModal.classList.remove("hidden");
    });
  }

  if (closeAddrModal) closeAddrModal.addEventListener("click", () => addrModal.classList.add("hidden"));

  if (addrForm) {
    addrForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === activeSession.email.toLowerCase());

      if (userIndex !== -1) {
        allUsers[userIndex].address = {
          country: document.getElementById("modal-country").value.trim(),
          city: document.getElementById("modal-city").value.trim(),
          postalCode: document.getElementById("modal-postal").value.trim(),
          homeAddress: document.getElementById("modal-home").value.trim()
        };
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
        addrModal.classList.add("hidden");
        refreshProfileScreen();
        localShowToast("📍 Shipping address updated successfully!");
      }
    });
  }

  // C. Security Gates (Email & Password Lock Gates)
  if (triggerEmailGate) {
    triggerEmailGate.addEventListener("click", () => { 
      activeSecurityTarget = "email"; 
      if (securityGateModal) securityGateModal.classList.remove("hidden"); 
    });
  }
  
  if (triggerPassGate) {
    triggerPassGate.addEventListener("click", () => { 
      activeSecurityTarget = "password"; 
      if (securityGateModal) securityGateModal.classList.remove("hidden"); 
    });
  }
  
  if (closeGateModal) closeGateModal.addEventListener("click", () => securityGateModal.classList.add("hidden"));

  if (securityGateForm) {
    securityGateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPassword = document.getElementById("gate-current-password").value;
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email.toLowerCase() === activeSession.email.toLowerCase());

      if (masterUserData && masterUserData.password === enteredPassword) {
        securityGateModal.classList.add("hidden");
        sensitiveEmailForm.classList.add("hidden");
        sensitivePassForm.classList.add("hidden");

        const sensitiveTitle = document.getElementById("sensitive-title");
        if (activeSecurityTarget === "email") {
          if (sensitiveTitle) sensitiveTitle.textContent = "Update Email Address";
          sensitiveEmailForm.classList.remove("hidden");
        } else if (activeSecurityTarget === "password") {
          if (sensitiveTitle) sensitiveTitle.textContent = "Update Security Password";
          sensitivePassForm.classList.remove("hidden");
        }
        if (sensitiveUpdateModal) sensitiveUpdateModal.classList.remove("hidden");
      } else {
        alert("❌ Incorrect password verification. Access denied.");
      }
    });
  }

  closeSensitiveBtns.forEach(btn => btn.addEventListener("click", () => sensitiveUpdateModal.classList.add("hidden")));

  if (sensitiveEmailForm) {
    sensitiveEmailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newEmail = document.getElementById("update-new-email").value.trim().toLowerCase();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];

      if (allUsers.some(u => u.email.toLowerCase() === newEmail && u.email.toLowerCase() !== activeSession.email.toLowerCase())) {
        alert("⚠️ Email address is already in use.");
        return;
      }

      const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === activeSession.email.toLowerCase());
      if (userIndex !== -1) {
        allUsers[userIndex].email = newEmail;
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
        activeSession.email = newEmail;
        localStorage.setItem("active_user_session", JSON.stringify(activeSession));

        sensitiveUpdateModal.classList.add("hidden");
        bioModal.classList.add("hidden"); 
        refreshProfileScreen();
        localShowToast("📧 Email address updated successfully!");
      }
    });
  }

  if (sensitivePassForm) {
    sensitivePassForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("update-new-password").value.trim();
      const confirmPassword = document.getElementById("update-confirm-password").value.trim();
  
      if (newPassword !== confirmPassword) {
        alert("⚠️ Passwords do not match.");
        return;
      }
  
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === activeSession.email.toLowerCase());
  
      if (userIndex !== -1) {
        allUsers[userIndex].password = newPassword;
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
        sensitiveUpdateModal.classList.add("hidden");
        bioModal.classList.add("hidden");
        refreshProfileScreen();
        localShowToast("🔒 Security password updated successfully!");
      }
    });
  }
});