document.addEventListener('DOMContentLoaded', () => {
  // TUGMA SA HTML: #register-form
  const signUpForm = document.querySelector('#register-form'); 

  if (!signUpForm) return;

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Pigilan ang page reload

    // TUGMA SA HTML: #register-email at #register-password
    const email = document.querySelector('#register-email').value.trim();
    const password = document.querySelector('#register-password').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();

    // Dagdag na validation: I-check kung nagtugma ang dalawang password
    if (password !== confirmPassword) {
      alert("⚠️ Password mismatch! Please confirm your password correctly.");
      return;
    }

    // Safety validation block
    if (!email || !password) {
      alert("⚠️ Fill up all entry fields node.");
      return;
    }

    // --- 💾 SAVE REGISTERED CREDENTIALS DATA ---
    const userCredentials = { email: email, password: password };
    localStorage.setItem("registered_user_credentials", JSON.stringify(userCredentials));

    alert("🎉 Account Registered Successfully! Network routing to Sign-In page.");
    window.location.href = "sign-in.html"; // Papuntang sign-in page safely
  });
});