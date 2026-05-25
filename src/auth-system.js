// src/auth-system.js

document.addEventListener("DOMContentLoaded", () => {
  // --- CORE ENGINE SELECTION NODES ---
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  // ==========================================
  // 1. ACCOUNT CREATION ENGINE (SIGN UP)
  // ==========================================
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Pipigilan muna natin ang page reload

      // Extract raw element nodes
      const username = document.getElementById("register-username").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const contact = document.getElementById("register-contact").value.trim();
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // VALIDATION: Strict Password Match Check
      if (password !== confirmPassword) {
        alert("🚨 Security Alert: Passwords do not match! Please verify configuration parameters.");
        return;
      }

      // Check kung may nakarekord nang email sa database matrix natin
      const existingUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];
      const emailExists = existingUsers.some(user => user.email === email);

      if (emailExists) {
        alert("🚨 System Identity Error: Email address is already registered to a network node.");
        return;
      }

      // Construct New User Identity Node Object
      const newUser = {
        username,
        email,
        contact,
        password // Tandaan paps, client-side encryption loop (plain text muna para sa local structural dev)
      };

      // Push into simulation database array
      existingUsers.push(newUser);
      localStorage.setItem("computer_grid_users", JSON.stringify(existingUsers));

      alert("🎉 Connection Identity Configured! Account profile successfully created.");
      window.location.href = "sign-in.html"; // Auto redirect to Login terminal
    });
  }

  // ==========================================
  // 2. AUTHENTICATION IDENTITY CHECKER (SIGN IN)
  // ==========================================
  if (loginForm && loginForm.id !== "forgot-form") {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = loginForm.querySelector('input[type="email"]').value.trim();
      const passwordInput = document.getElementById("input-password").value;

      const registeredUsers = JSON.parse(localStorage.getItem("computer_grid_users")) || [];

      // Validating match values inside database grid arrays
      const validUser = registeredUsers.find(user => user.email === emailInput && user.password === passwordInput);

      if (validUser) {
        // Ise-set natin ang logged-in state sa active session profile matrix
        localStorage.setItem("active_user_session", JSON.stringify({
          username: validUser.username,
          email: validUser.email,
          loginToken: true
        }));

        alert(`🚀 Welcome back, Agent ${validUser.username}! Secure connection sequence initialized.`);
        window.location.href = "index.html"; // Lipad pabalik sa user main hub
      } else {
        alert("🚨 Access Denied: Invalid email credentials or password override failure.");
      }
    });
  }

  // ==========================================
  // 3. REMAINING TASK 1 & 2: ROUTER SECURITY & NAV GUARD
  // ==========================================
  guardSystemGateway();
});

// SYSTEM HUB NAVIGATION GATEWAY FUNCTION
function guardSystemGateway() {
  const isUserAuthenticated = localStorage.getItem("active_user_session") !== null;
  const currentPath = window.location.pathname;

  // --- TASK 1: NAV LINK EXTINCTION LOGIC ---
  // Ang code block na ito ay hahanap ng mga links na papuntang products at tatanggalin sa view node kapag unauthenticated.
  const secureNavLinks = document.querySelectorAll("nav a, footer a, .grid-nav-links");
  
  if (!isUserAuthenticated) {
    secureNavLinks.forEach(link => {
      const hrefValue = link.getAttribute("href");
      if (hrefValue && (hrefValue.includes("products.html") || hrefValue.includes("product-list"))) {
        link.style.display = "none"; // Binubura ang element sa DOM structure tree
      }
    });
  }

  // --- TASK 2: DIRECT URL BAR HARD DETECTOR ---
  // Kung pilit nilang ita-type ang secure URL sa endpoint address, ibabalik sila sa control deck index.
  if (currentPath.includes("products.html")) {
    if (!isUserAuthenticated) {
      alert("🔒 Security Override Active: Access Denied. Authenticated credentials needed to interface inventory systems.");
      window.location.href = "index.html";
    }
  }
}