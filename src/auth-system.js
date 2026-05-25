// src/auth.js

// 🚀 REGISTER TOAST ENGINE IN GLOBAL SCOPE IMMEDIATELY
window.showToast = function(message, type = "success") {
  const bgColor = type === "success" ? "bg-emerald-600 shadow-emerald-900/20" : "bg-red-600 shadow-red-900/20";
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";

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

const ACCOUNT_CREATED_FLAG = "account_created_redirect";
const LOGOUT_REDIRECT_FLAG = "user_logged_out";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  // Show success toast on sign-in after account creation redirect
  if (sessionStorage.getItem(ACCOUNT_CREATED_FLAG) === "true") {
    sessionStorage.removeItem(ACCOUNT_CREATED_FLAG);
    window.showToast("🎉 Account profile successfully created! Please sign in to continue.", "success");
  }

  // Show farewell toast on home after logout redirect
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
      
      // 💡 PINANTAY SA SIGN-UP.JS: Nilagyan ng .trim() para iwas space bugs
      const password = document.getElementById("register-password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();

      // VALIDATION: Strict Password Match Check
      if (password !== confirmPassword) {
        window.showToast("⚠️ Passwords do not match! Please verify configuration parameters.", "error");
        return;
      }

      if (!email || !password) {
        window.showToast("⚠️ Fill up all entry fields node.", "error");
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const emailExists = existingUsers.some(user => user.email === email);

      if (emailExists) {
        window.showToast("⚠️ Email address is already registered to a network node.", "error");
        return;
      }

      // Construct New User Identity Node Object
      const newUser = { username, email, contact, password };

      // Push into simulation database array
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
      const validUser = registeredUsers.find(user => user.email === emailInput && user.password === passwordInput);

      if (validUser) {
        localStorage.setItem("active_user_session", JSON.stringify({
          username: validUser.username,
          email: validUser.email,
          loginToken: true
        }));

        window.showToast(`🚀 Welcome back, Agent ${validUser.username}! Secure connection sequence initialized.`, "success");
        
        setTimeout(() => {
          window.location.href = "index.html"; 
        }, 1500);
      } else {
        window.showToast("🚨 Access Denied: Invalid email credentials or password failure.", "error");
      }
    });
  }

  guardSystemGateway();
});

// SYSTEM HUB NAVIGATION GATEWAY FUNCTION
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

  if (currentPath.includes("products.html")) {
    if (!isUserAuthenticated) {
      alert("🔒 Security Override Active: Access Denied. Authenticated credentials needed.");
      window.location.href = "index.html";
    }
  }
}