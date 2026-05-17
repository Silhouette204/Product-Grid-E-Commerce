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
              <button id="check-out-btn" onclick="openCheckoutFlow()" class="py-3 bg-red-600 text-white font-bold uppercase hover:bg-primary hover:text-secondary transition duration-300 shadow-lg shadow-orange-900/20 hover:cursor-pointer">
                Checkout
              </button>
          </div>
      </div>
    </div>





   <div id="checkout-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-70 hidden">
      <div class="bg-text/90 border border-primary/80 p-8 rounded-xl max-w-md w-full text-zinc-100 shadow-2xl mx-4">
        
        <div class="flex flex-row justify-between items-center mb-4"> 
          <h2 class="text-2xl font-bold uppercase tracking-wide text-primary">Checkout Details</h2>
          <a href="/product.html" class="bg-dark w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-secondary transition">
            <i class="fa-solid fa-greater-than text-md font-semibold text-secondary hover:text-primary"></i>
          </a>
        </div>

        <form id="checkout-form" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
            <input type="text" id="cust-name" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none focus:border-light text-white">
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Delivery Address</label>
            <input type="text" id="cust-address" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none focus:border-light text-white">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Contact No.</label>
              <input type="tel" id="cust-phone" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none focus:border-light text-white">
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
              <input type="email" id="cust-email" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none focus:border-light text-white">
            </div>
          </div>
       
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Select Bank Account</label>
            <select id="cust-bank" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-sm focus:outline-none focus:border-light text-white cursor-pointer appearance-none">
              <option value="" disabled selected hidden>Choose your bank...</option>
              <option value="BDO" class="bg-zinc-900">BDO (Banco de Oro)</option>
              <option value="Metrobank" class="bg-zinc-900">Metrobank</option>
              <option value="ChinaBank" class="bg-zinc-900">ChinaBank</option>
              <option value="BPO" class="bg-zinc-900">BPO Bank</option>
              <option value="BPI" class="bg-zinc-900">BPI (Bank of the Philippine Islands)</option>
            </select>
          </div>

            <div>  
          <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">OR</label>
</div>

 <div>  
          <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">SELECT DIGITAL E-WALLET</label>

          <div class="grid grid-cols-3 gap-2">
      <label class="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer select-none hover:border-blue-600 transition group">
        <input type="radio" name="digital-payment" value="GCash" class="sr-only payment-radio">
        <span class="text-sm font-bold text-gray-400 group-hover:text-blue-400 transition">GCash</span>
      </label>
      
      <label class="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer select-none hover:border-green-600 transition group">
        <input type="radio" name="digital-payment" value="PayMaya" class="sr-only payment-radio">
        <span class="text-sm font-bold text-gray-400 group-hover:text-green-400 transition">PayMaya</span>
      </label>

      <label class="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer select-none hover:border-primary transition group">
        <input type="radio" name="digital-payment" value="PayPal" class="sr-only payment-radio">
        <span class="text-sm font-bold text-gray-400 group-hover:text-primary transition">PayPal</span>
      </label>
    </div>
  </div>

<div id="cust-mobile-wallet-wrapper" class="hidden transition-all duration-300">
            <label id="mobile-wallet-label" class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">GCash Mobile Number</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500 font-semibold select-none">+63</span>
              <input type="tel" id="cust-mobile-wallet" placeholder="9xxxxxxxxx" maxlength="10" class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 pl-12 text-sm focus:outline-none focus:border-light text-white">
            </div>
          </div>

          <div id="card-number-wrapper" class="hidden transition-all duration-300"> 
            <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Card Number (Simulated)</label>
            <input type="text" id="cust-card" placeholder="xxxx-xxxx-xxxx-xxxx" class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none focus:border-light text-white">
          </div>


          <div class="flex items-start gap-2 pt-2">
            <input type="checkbox" id="policy-check" required class="mt-1 cursor-pointer">
            <label for="policy-check" class="text-xs text-gray-400 leading-tight cursor-pointer select-none">
              I confirm that all provided data is correct for simulation purposes.
            </label>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="button" onclick="closeCheckoutFlow()" class="w-1/2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-sm font-semibold py-2.5 rounded transition hover:cursor-pointer">Cancel</button>
            <button type="submit" class="w-1/2 bg-red-600 hover:bg-red-700 text-sm font-bold py-2.5 rounded transition hover:cursor-pointer uppercase">Order Now</button>
          </div>
        </form>
      </div>
    </div>

    <div id="toast-notification" class="fixed top-5 left-1/2 -translate-x-1/2 bg-red-800 text-white px-6 py-3 rounded-lg shadow-2xl font-semibold text-sm z-80 flex items-center gap-3 transition-all duration-300 opacity-0 pointer-events-none transform -translate-y-4">
      <i class="fa-solid fa-triangle-exclamation text-lg"></i>
      <span id="toast-message">Your cart is empty!</span>
    </div>
  `;

  //for bank selection and e wallet radio button
  const bankSelect = document.querySelector('#cust-bank');
  const radioButtons = document.querySelectorAll('.payment-radio');
  const mobileWrapper = document.querySelector('#cust-mobile-wallet-wrapper');
  const mobileLabel = document.querySelector('#mobile-wallet-label');
  const mobileInput = document.querySelector('#cust-mobile-wallet');
  const cardWrapper = document.querySelector('#card-number-wrapper');
  const cardInput = document.querySelector('#cust-card');

  if (bankSelect) {
    bankSelect.addEventListener('change', function() {
      if (this.value !== "") {
        mobileWrapper.classList.add('hidden');
        mobileInput.removeAttribute('required');
        mobileInput.value = ""; 

        cardWrapper.classList.remove('hidden');
        cardInput.setAttribute('required', 'true');

        radioButtons.forEach(radio => {
          radio.checked = false;
          radio.parentElement.classList.remove('border-blue-600', 'border-green-600', 'border-primary', 'bg-zinc-800');
          radio.parentElement.classList.add('border-zinc-800', 'bg-zinc-900');
        });
      }
    });
  }

  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        bankSelect.value = ""; 
        cardWrapper.classList.add('hidden');
        cardInput.removeAttribute('required');
        cardInput.value = "";

        mobileWrapper.classList.remove('hidden');
        mobileInput.setAttribute('required', 'true');
        
        mobileLabel.innerText = `${this.value} Mobile Number`;

        radioButtons.forEach(r => {
          r.parentElement.classList.remove('border-blue-600', 'border-green-600', 'border-primary', 'bg-zinc-800');
          r.parentElement.classList.add('border-zinc-800', 'bg-zinc-900');
        });

        if (this.value === 'GCash') this.parentElement.classList.add('border-blue-600', 'bg-zinc-800');
        if (this.value === 'PayMaya') this.parentElement.classList.add('border-green-600', 'bg-zinc-800');
        if (this.value === 'PayPal') this.parentElement.classList.add('border-primary', 'bg-zinc-800');
      }
    });
  });
}


// Global Toggle Function (Para sa Push Effect)
window.toggleCart = function() {
  const cart = document.querySelector('#shopping-cart');
  const mainLayout = document.querySelector('#main-layout');
  const isMobile = window.innerWidth < 768;

  if (cart.classList.contains('translate-x-full')) {
    cart.classList.remove('translate-x-full');
  if (!isMobile) {
      mainLayout.style.transform = "translateX(-200px)";
    } else {
      document.body.style.overflow = 'hidden'; 
    }
  } else {
    cart.classList.add('translate-x-full');
    mainLayout.style.transform = "translateX(0)";
    document.body.style.overflow = ''; 
  }
};


window.openCheckoutFlow = function() {
const totalPriceElement = document.querySelector('#cart-total-price');
if (!totalPriceElement || totalPriceElement.innerText.trim() === "₱0.00") {
    showToast("Your cart is empty. Please choose a desired item to proceed to checkout.");
    return; 
  }
window.toggleCart(); 
  document.querySelector('#checkout-modal').classList.remove('hidden'); 
};

const checkoutItemsList = document.querySelector('#checkout-items-list');
  const checkoutSummaryTotal = document.querySelector('#checkout-summary-total');

  if (checkoutItemsList) {
    // Kopyahin natin kung ano ang kasalukuyang nakasulat sa innerHTML ng active cart display mo
    // O di kaya ay basahin natin ang array mula sa LocalStorage mo kung doon nakatago.
    // Gagawa tayo rito ng pansamantalang simulation gamit ang nakasulat sa UI mo ngayon:
    checkoutSummaryTotal.innerText = totalPriceElement.innerText;

    // Basahin ang active items sa #cart-list para i-mirror sa modal sidebar
    const activeCartItems = document.querySelectorAll('#cart-list > .cart-item-row'); // Palitan mo ang class name depende kung ano ang wrapper ng item rows mo sa cart list
    
    if (activeCartItems.length > 0) {
      checkoutItemsList.innerHTML = ""; // Linisin ang temporary static state
      activeCartItems.forEach(item => {
        checkoutItemsList.appendChild(item.cloneNode(true)); // I-clone ang nodes para malinis silang kokopyahin papunta sa kaliwang view block
      });
    } else {
      // Kung gumagamit ka ng template arrays para mag render ng card, pwede rin nating gamitin ang mapping loop mo rito!
      checkoutItemsList.innerHTML = `<p class="text-sm text-gray-500">Reviewing current items...</p>`;
    }
  }
  
window.closeCheckoutFlow = function() {
  document.querySelector('#checkout-modal').classList.add('hidden');
};function showToast(message) {
  const toast = document.querySelector('#toast-notification');
  const toastMsg = document.querySelector('#toast-message');
    if (!toast || !toastMsg) return;

  toastMsg.innerText = message;  toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
  }, 4000);
}
