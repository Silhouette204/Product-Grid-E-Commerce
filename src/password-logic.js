const toggleButtons = document.querySelectorAll(".password-toggle-btn");

toggleButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Hahanapin ang pinakamalapit na input field sa loob ng parehong container
    const container = button.closest('.relative');
    const passwordInput = container.querySelector('input');
    const eyeIcon = button.querySelector('.eye-icon, i'); // hahanapin ang icon sa loob ng button

    if (passwordInput && eyeIcon) {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      
      eyeIcon.classList.toggle("fa-eye");
      eyeIcon.classList.toggle("fa-eye-slash");
    }
  });
});