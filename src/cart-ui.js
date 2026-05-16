// cart-ui.js
export function renderCartUI() {
  const container = document.querySelector('#cart-container');
  if (!container) return;

  container.innerHTML = `
    <div id="shopping-cart" class="fixed top-0 right-0 h-full w-full md:w-100 bg-primary text-white translate-x-full transition-transform duration-500 z-60 shadow-2xl flex flex-col border-l border-primary/20">
      
      <div class="p-5.5 border-b border-white/10 flex justify-between items-center bg-secondary">
          <h2 class="text-xl font-bold  uppercase">Shopping Cart</h2>
          <button onclick="toggleCart()" class="p-2 hover:bg-white/10 rounded-full transition">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </button>
      </div>

      <div id="cart-list" class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <div id="empty-cart-msg" class="text-center mt-20 text-gray-500">
             <i class="fa-solid fa-cart-shopping text-5xl mb-4 "></i>
             <p>Your cart is empty</p>
          </div>
      </div>

      <div class="p-6 border-t border-white/10 bg-secondary">
          <div class="flex justify-between items-center mb-4">
              <span class="text-gray-400">Subtotal:</span>
              <span id="cart-total-price" class="text-xl font-bold text-primary">₱0.00</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
              <button onclick="toggleCart()" class="bg-text py-3 border border-white/20 font-semibold uppercase hover:bg-white hover:text-black transition duration-300 hover:cursor-pointer">
                Close
              </button>
              <button id="check-out-btn" class="py-3 bg-red-600 text-white font-bold uppercase hover:bg-primary hover:text-secondary transition duration-300 shadow-lg shadow-orange-900/20 hover:cursor-pointer">
                Checkout
              </button>
          </div>
      </div>
    </div>
  `;
}

// Global Toggle Function (Para sa Push Effect)
window.toggleCart = function() {
  const cart = document.querySelector('#shopping-cart');
  const mainLayout = document.querySelector('#main-layout');
  const isMobile = window.innerWidth < 768;

  if (cart.classList.contains('translate-x-full')) {
    cart.classList.remove('translate-x-full');
    
    // Push effect logic
    if (!isMobile) {
      mainLayout.style.transform = "translateX(-200px)";
    } else {
      document.body.style.overflow = 'hidden'; // Lock scroll on mobile
    }
  } else {
    cart.classList.add('translate-x-full');
    mainLayout.style.transform = "translateX(0)";
    document.body.style.overflow = ''; // Unlock scroll
  }
};