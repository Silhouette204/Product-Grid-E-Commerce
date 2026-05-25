document.addEventListener('DOMContentLoaded', () => {
  // TUGMA SA HTML: #login-form
  const signInForm = document.querySelector('#login-form'); 

  if (!signInForm) return;

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // TUGMA SA HTML: Galing sa id na idinagdag natin sa itaas
    const inputEmail = document.querySelector('#signin-email').value.trim();
    const inputPassword = document.querySelector('#input-password').value.trim();

    // 1. Hatakin ang nakaimbak na profile record
    const storedData = localStorage.getItem("registered_user_credentials");

    if (!storedData) {
      alert("❌ Identity not found: No account records exists in local computer cache. Sign up first!");
      return;
    }

    // I-parse natin pabalik sa readable JavaScript object structure
    const registeredUser = JSON.parse(storedData);

    // 2. --- 🔑 AUTHENTICATION MATCH HANDSHAKE DATA ---
    if (inputEmail === registeredUser.email && inputPassword === registeredUser.password) {
      
      // KAPAG TAMA: Isaksak ang active connection session token key!
      localStorage.setItem("active_user_session", "true");

      alert("🔒 Authorization Complete: Connection profile match. Welcome back!");
      window.location.href = "index.html"; // Balik sa Home page o kung saan mo gustong ituro
      
    } else {
      // KAPAG MALI
      alert("❌ Invalid Credentials: Password mismatch or username rejection.");
    }
  });
});