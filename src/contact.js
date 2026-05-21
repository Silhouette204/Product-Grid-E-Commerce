document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contact-modal');
  const modalBox = document.getElementById('modal-box');
  const closeBtn = document.getElementById('close-modal-btn');
  const openTriggers = document.querySelectorAll('.open-modal-trigger');
  const inquiryForm = document.getElementById('modal-inquiry-form');

  // FUNCTION PARA SA FLICKER-FREE OPEN STATE
  function openModal() {
    // 1. Buhayin muna ang structure block para makita ng rendering engine
    modal.classList.remove('hidden');
    
    // 2. Bigyan ng micro-delay para pumasok nang swabe ang transition animation nang hindi nag-flicker
    setTimeout(() => {
      modal.classList.add('opacity-100');
      modal.classList.remove('opacity-0');
      modalBox.classList.remove('scale-95');
      modalBox.classList.add('scale-100');
    }, 10);
  }

  // FUNCTION PARA SA SMOOTH CLOSE STATE
  function closeModal() {
    // 1. Unahing i-fade out ang visual styles
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');

    // 2. Hintayin matapos ang 300ms na transition bago tuluyang itago sa layout screen
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }

  // 1. Event Listeners para sa lahat ng triggers na may class
  if (openTriggers.length > 0) {
    openTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault(); // Pipigilan nito ang page jumps o accidental reloads
        openModal();
      });
    });
  }

  // 2. Click logic para sa close button
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // 3. Click logic para sa backdrop grey zone
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 4. Auto-trigger pop up management loop (1.5 seconds)
  setTimeout(openModal, 1500);

  // 5. Submit form tracking interface loop
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inquiryData = {
        id: 'INQ-' + Date.now(),
        name: document.getElementById('modal-name').value,
        email: document.getElementById('modal-email').value,
        phone: document.getElementById('modal-phone').value || 'N/A',
        address: document.getElementById('modal-address').value,
        message: document.getElementById('modal-message').value,
        timestamp: new Date().toLocaleString()
      };

      const currentInquiries = JSON.parse(localStorage.getItem('computer_grid_inquiries')) || [];
      currentInquiries.unshift(inquiryData);
      localStorage.setItem('computer_grid_inquiries', JSON.stringify(currentInquiries));

      showToast('System synced! Inquiry submitted successfully.', 'success');

      inquiryForm.reset();
      closeModal();
    });
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Gumawa ng bagong toast element
    const toast = document.createElement('div');
    
    // Ang disenyo ng toast: Dark mode framework na may green/orange text indicators
    toast.className = `flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white px-5 py-4 rounded-xl shadow-2xl translate-y-5 opacity-0 transition-all duration-300 min-w-[300px] max-w-md`;

    // Lagyan ng icon at text sa loob
    toast.innerHTML = `
      <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500">
        <i class="fa-solid fa-circle-check text-lg"></i>
      </div>
      <div class="flex-1">
        <p class="text-sm font-semibold">Success</p>
        <p class="text-xs text-zinc-400 mt-0.5">${message}</p>
      </div>
    `;

    // Isalpak sa screen container
    container.appendChild(toast);

    // Micro-delay para gumana ang slide-up fade-in animation
    setTimeout(() => {
      toast.classList.remove('translate-y-5', 'opacity-0');
    }, 10);

    // Kusa nating tunawin o burahin pagkalipas ng 3 segundo
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      
      // Hintayin matapos ang fade out animation bago tuluyang tanggalin sa DOM
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }
});