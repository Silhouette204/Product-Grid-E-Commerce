// src/profile-manager.js

document.addEventListener("DOMContentLoaded", () => {
  const activeSession = JSON.parse(localStorage.getItem("active_user_session"));

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

  const editBioBtn = document.getElementById("edit-bio-btn");
  const editAddrBtn = document.getElementById("edit-addr-btn");

  const closeBioModal = document.getElementById("close-bio-modal");
  const closeAddrModal = document.getElementById("close-addr-modal");

  const bioForm = document.getElementById("bio-form");
  const addrForm = document.getElementById("addr-form");
  const orderStatusContainer = document.getElementById("order-status-container");
  // ==========================================
  // FUNCTION: RENDER DOM SCREEN INFORMATION
  // ==========================================
  function refreshProfileScreen() {
    const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
    const masterUserData = allUsers.find(u => u.email === activeSession.email);

    if (!masterUserData) return;

    // Set Biodata Card Block Panels MUNA (Para may reference kung sakali)
    if (bioFullName) bioFullName.textContent = masterUserData.fullname || "N.A";
    if (bioUsername) bioUsername.textContent = activeSession.username || "N.A";
    if (bioContact) bioContact.textContent = masterUserData.contact || "N.A";
    if (bioEmail) bioEmail.textContent = activeSession.email || "N.A";

    // Dynamic set of order status
    if (orderStatusContainer) {
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

      const allOrdersActive = JSON.parse(localStorage.getItem("computer_grid_orders")) || [];
      const allOrdersArchived = JSON.parse(localStorage.getItem("computer_grid_archived")) || [];
      const allOrders = [...allOrdersActive, ...allOrdersArchived];

      // Convert order.date (e.g. "May 20, 2026") into a timestamp we can compare.
      function parseOrderDateToMs(order) {
        const raw = order.lastPurchaseAt || order.purchaseDate || order.date;
        if (!raw) return null;

        const dt = new Date(raw);
        const ms = dt.getTime();
        return Number.isFinite(ms) ? ms : null;
      }

      // Filter: only orders that belong to the currently signed-in user.
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

      // Inactive rules:
      // - New account / never purchased => Inactive
      // - Last purchase older than 1 week => Inactive
      // Active rule:
      // - Purchased at least once and last purchase within 1 week => Active
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

    // Set Hero Header Fields
    if (heroUsername) heroUsername.textContent = activeSession.username || "Agent";
    if (heroEmail) heroEmail.textContent = activeSession.email || "N/A";
    if (heroContact) heroContact.textContent = masterUserData.contact || "None";
    if (heroSignUpDate) heroSignUpDate.textContent = activeSession.signUpDate || "N/A";

    // Set Address Card Block Panels
    if (addrCountry) addrCountry.textContent = masterUserData.address?.country || "N.A";
    if (addrCity) addrCity.textContent = masterUserData.address?.city || "N.A";
    if (addrPostal) addrPostal.textContent = masterUserData.address?.postalCode || "N.A";
    if (addrHome) addrHome.textContent = masterUserData.address?.homeAddress || "N.A";
  }

  // Initial load up call execution
  refreshProfileScreen();

  // ==========================================
  // MODAL TRIGGER INTERFACE LINK CLICK LOGIC
  // ==========================================
  
  // A. BIODATA MODAL OVERLAYS
  if (editBioBtn) {
    editBioBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email === activeSession.email);
      
      // Auto-fill existing values down to input variables fields
      document.getElementById("modal-fullname").value = masterUserData?.fullname || "";
      document.getElementById("modal-username").value = masterUserData?.username || "";
      document.getElementById("modal-contact").value = masterUserData?.contact || "";
      
     //email and password na naka disabled
     const modalEmailInput = document.getElementById("modal-locked-email");
     if (modalEmailInput) {
       modalEmailInput.value = activeSession.email || "";
     }

     const modalPasswordInput = document.getElementById("modal-locked-password");
     if (modalPasswordInput) {
       modalPasswordInput.value = masterUserData?.password || "";
       modalPasswordInput.type = "password"; // Siguraduhing tago sa simula
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
        if (icon) icon.className = "fa-solid fa-eye-slash";
      } else {
        modalPasswordInput.type = "password";
        if (icon) icon.className = "fa-solid fa-eye";
      }
    });
  }

  if (closeBioModal) {
    closeBioModal.addEventListener("click", () => bioModal.classList.add("hidden"));
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
        // Save back update layers directly to master tracking configuration arrays
        allUsers[userIndex].fullname = inputFullName;
        allUsers[userIndex].username = inputUsername;
        allUsers[userIndex].contact = inputContact;
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));
        
        // 🚨 CRITICAL UPDATE: I-synchronize din ang active session para magbago ang "Welcome, [username]!" greetings mo agad
        activeSession.username = inputUsername;
        activeSession.contact = inputContact;
        localStorage.setItem("active_user_session", JSON.stringify(activeSession));

        bioModal.classList.add("hidden");
        refreshProfileScreen();
        if (window.showToast) window.showToast("⚡ Biodata parameters synchronized successfully!", "success");

      }
    });
  }

  // B. ADDRESS MODAL OVERLAYS
  if (editAddrBtn) {
    editAddrBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const allUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const masterUserData = allUsers.find(u => u.email === activeSession.email);
      
      // Auto-fill existing address parameters inside inputs tags
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
        // Embed object values layers data parameters back safely
        allUsers[userIndex].address = { country, city, postalCode, homeAddress };
        localStorage.setItem("computer_grid_users", JSON.stringify(allUsers));

        addrModal.classList.add("hidden");
        refreshProfileScreen();
        if (window.showToast) window.showToast("🌍 Address grid layout configuration saved!", "success");
      }
    });
  }
});