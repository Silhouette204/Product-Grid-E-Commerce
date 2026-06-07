// src/auth.js

// 🚀 REGISTER TOAST ENGINE IN GLOBAL SCOPE IMMEDIATELY
window.showToast = function(message, type = "success") {
  const isError = type === "error" || type === "danger";
  const bgColor = isError ? "bg-red-600 shadow-red-900/20" : "bg-emerald-600 shadow-emerald-900/20";
  const icon = isError ? "fa-circle-exclamation" : "fa-circle-check";

  const toast = document.createElement("div");
  toast.className = `fixed bottom-5 right-5 z-50 flex items-center gap-3 ${bgColor} text-white px-5 py-3.5 rounded-xl font-poppins text-sm font-medium shadow-xl transform translate-y-10 opacity-0 transition-all duration-300 ease-out`;
  
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-base"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-10", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
};

// 🛠️ MODERN CUSTOM MODAL ENGINE (REPLACES PROMPT/ALERT)
window.createCustomModal = function({ title, description, inputType, inputPlaceholder, buttonText, onSubmit, onCancel }) {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 font-poppins";
  
  const modalBox = document.createElement("div");
  modalBox.className = "bg-white text-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl transform scale-95 transition-transform duration-300 flex flex-col gap-4";
  
  modalBox.innerHTML = `
    <div class="flex items-center gap-3 text-primary">
      <div class="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-800">
        <i class="fa-solid fa-shield-halved text-lg"></i>
      </div>
      <div>
        <h3 class="font-bold text-lg leading-tight">${title}</h3>
        <p class="text-xs text-zinc-500">${description}</p>
      </div>
    </div>
    <form id="custom-modal-form" class="space-y-4 mt-2">
      <input type="${inputType}" id="custom-modal-input" placeholder="${inputPlaceholder}" required class="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition">
      <div class="flex items-center justify-end gap-2 pt-2">
        <button type="button" id="custom-modal-cancel" class="px-4 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition rounded-lg">Cancel</button>
        <button type="submit" class="bg-secondary hover:bg-zinc-800 text-primary hover:text-white font-bold px-5 py-2.5 rounded-xl text-xs transition uppercase tracking-wider shadow-md">${buttonText}</button>
      </div>
    </form>
  `;
  
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);
  
  // Animate Entrance
  setTimeout(() => {
    modalOverlay.classList.remove("opacity-0");
    modalBox.classList.remove("scale-95");
  }, 10);
  
  const closeModal = () => {
    modalOverlay.classList.add("opacity-0");
    modalBox.classList.add("scale-95");
    setTimeout(() => modalOverlay.remove(), 300);
  };
  
  modalBox.querySelector("#custom-modal-cancel").addEventListener("click", () => {
    closeModal();
    if(onCancel) onCancel();
  });
  
  modalBox.querySelector("#custom-modal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = modalBox.querySelector("#custom-modal-input").value.trim();
    closeModal();
    onSubmit(value);
  });
};

const ACCOUNT_CREATED_FLAG = "account_created_redirect";
const LOGOUT_REDIRECT_FLAG = "user_logged_out";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const forgotForm = document.getElementById("forgot-form"); 

  if (sessionStorage.getItem(ACCOUNT_CREATED_FLAG) === "true") {
    sessionStorage.removeItem(ACCOUNT_CREATED_FLAG);
    window.showToast("🎉 Account profile successfully created! Please sign in to continue.", "success");
  }

  if (sessionStorage.getItem(LOGOUT_REDIRECT_FLAG) === "true") {
    sessionStorage.removeItem(LOGOUT_REDIRECT_FLAG);
    window.showToast("Thank you for visiting Computer Grid. Your session has been securely ended. We appreciate your time and look forward to welcoming you again.", "success");
  }

  // ==========================================
  // 1. ACCOUNT CREATION ENGINE (SIGN UP)
  // ==========================================
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); 
      const username = document.getElementById("register-username").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const contact = document.getElementById("register-contact").value.trim();
      const password = document.getElementById("register-password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();

      if (password !== confirmPassword) {
        window.showToast("⚠️ Passwords do not match! Please verify configuration parameters.", "error");
        return;
      }

      if (!email || !password || !username) {
        window.showToast("⚠️ Fill up all entry fields node.", "error");
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const emailExists = existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase());

      if (emailExists) {
        window.showToast("⚠️ Email address is already registered to a network node.", "error");
        return;
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedSignUpDate = new Date().toLocaleDateString('en-US', options);

      const newUser = { 
        username, email, contact, password,
        signUpDate: formattedSignUpDate,
        fullname: "", 
        address: { country: "", city: "", postalCode: "", homeAddress: "" }
      };

      existingUsers.push(newUser);
      localStorage.setItem("computer_grid_users", JSON.stringify(existingUsers));
      sessionStorage.setItem(ACCOUNT_CREATED_FLAG, "true");
      window.location.href = "sign-in.html";
    });
  }

  // ==========================================
  // 2. AUTHENTICATION IDENTITY CHECKER (SIGN IN)
  // ==========================================
  if (loginForm && loginForm.id !== "forgot-form") {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("signin-email").value.trim();
      const passwordInput = document.getElementById("input-password").value.trim();

      const registeredUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const validUser = registeredUsers.find(user => user.email.toLowerCase() === emailInput.toLowerCase() && user.password === passwordInput);

      if (validUser) {
        if (!validUser.signUpDate) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          validUser.signUpDate = new Date().toLocaleDateString('en-US', options);
          localStorage.setItem("computer_grid_users", JSON.stringify(registeredUsers));
        }

        localStorage.setItem("active_user_session", JSON.stringify({
          username: validUser.username,
          email: validUser.email,
          contact: validUser.contact || "N/A",
          signUpDate: validUser.signUpDate || "N/A",
          loginToken: true
        }));

        window.showToast(`🚀 Welcome back, Agent ${validUser.username}! Secure connection sequence initialized.`, "success");
        setTimeout(() => { window.location.href = "index.html"; }, 1500);
      } else {
        window.showToast("🚨 Access Denied: Invalid email credentials or password failure.", "error");
      }
    });
  }

  // ==========================================
  // 🔑 3. INTERACTIVE OTP & MODAL PASSWORD RESET ENGINE
  // ==========================================
  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("forgot-email").value.trim().toLowerCase();
      const registeredUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];

      const userIndex = registeredUsers.findIndex(user => user.email.toLowerCase() === emailInput);

      if (userIndex !== -1) {
        const targetUser = registeredUsers[userIndex];

        // 1. Generate Secure Simulated OTP
        const simulatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        window.showToast(`🔑 Security Token Sent! Your simulation OTP is: ${simulatedOTP}`, "success");

        // 2. Trigger Custom Verification OTP Modal
        setTimeout(() => {
          window.createCustomModal({
            title: "Security Gateway Verification",
            description: "Isang One-Time Password (OTP) ang binaril sa network line. Ipasok ito sa ibaba:",
            inputType: "text",
            inputPlaceholder: "Enter 6-Digit OTP Code",
            buttonText: "Verify Token",
            onSubmit: (userInputOTP) => {
              if (userInputOTP === simulatedOTP) {
                window.showToast("✅ Node Verified! Authorized security access granted.", "success");

                // 3. Trigger New Password Creation Modal
                setTimeout(() => {
                  window.createCustomModal({
                    title: "Credential Configuration Override",
                    description: `Account Security Node: ${targetUser.username}. Magtalaga ng bagong password configuration parameter:`,
                    inputType: "password",
                    inputPlaceholder: "Enter New Secure Password",
                    buttonText: "Update Password",
                    onSubmit: (newPassword) => {
                      if (newPassword !== "") {
                        // Update Data Registry Base
                        registeredUsers[userIndex].password = newPassword;
                        localStorage.setItem("computer_grid_users", JSON.stringify(registeredUsers));

                        window.showToast("⚡ Configuration Updated! Redirecting to central security sync layer...", "success");
                        setTimeout(() => { window.location.href = "sign-in.html"; }, 2000);
                      } else {
                        window.showToast("🚨 Error: Password parameters cannot be empty fields.", "error");
                      }
                    },
                    onCancel: () => { window.showToast("⚠️ Password update cancelled.", "error"); }
                  });
                }, 800);

              } else {
                window.showToast("🚨 Security Breached: Invalid OTP configuration tracking token.", "error");
              }
            },
            onCancel: () => { window.showToast("⚠️ Verification protocol aborted.", "error"); }
          });
        }, 1000);

      } else {
        window.showToast("🚨 Query Failure: Target email loop routing path not found in registry nodes.", "error");
      }
    });
  }

  function injectHeroUsername() {
    const activeSession = JSON.parse(localStorage.getItem("active_user_session"));
    if (activeSession && activeSession.username) {
      document.querySelectorAll("#hero-username").forEach(node => {
        node.innerHTML = ` <span class=" text-secondary font-semibold">${activeSession.username}</span>`;
      });
      document.querySelectorAll("#account-username").forEach(node => {
        node.innerHTML = ` <span class="underline text-primary font-semibold">${activeSession.username}</span>!`;
      });
    }
  }

  injectHeroUsername();
  guardSystemGateway();
});

function guardSystemGateway() {
  const isUserAuthenticated = localStorage.getItem("active_user_session") !== null;
  const currentPath = window.location.pathname;
  const secureNavLinks = document.querySelectorAll("nav a, footer a, .grid-nav-links");
  
  if (!isUserAuthenticated) {
    secureNavLinks.forEach(link => {
      const hrefValue = link.getAttribute("href");
      if (hrefValue && (hrefValue.includes("products.html") || hrefValue.includes("product-list"))) {
        link.style.display = "none"; 
      }
    });
  }

  if (currentPath.includes("products.html") && !isUserAuthenticated) {
    alert("🔒 Security Override Active: Access Denied. Authenticated credentials needed.");
    window.location.href = "index.html";
  }
}