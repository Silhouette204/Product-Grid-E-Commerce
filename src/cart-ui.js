// cart-ui.js
export function renderCartUI() {
  const container = document.querySelector('#cart-container');

  if (!container) return;

  container.innerHTML = `
    <div id="shopping-cart" class="fixed top-0 right-0 h-full w-full md:w-100 bg-primary text-white translate-x-full transition-transform duration-500 z-60 shadow-2xl flex flex-col border-l border-primary/20">
      
      <div class="p-5.5 border-b border-white/10 flex justify-between items-center bg-secondary">
          <h2 class="text-xl font-bold uppercase">Shopping Cart</h2>
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
      <div class="bg-text/90 border border-primary/80 p-6 md:p-8 rounded-xl max-w-md md:max-w-4xl w-full text-zinc-100 shadow-2xl mx-4 md:grid md:grid-cols-12 md:gap-6">
        
        <div class="hidden md:flex md:col-span-5 border-r border-white/10 pr-6 flex-col justify-between h-full">
          <div>
            <h3 class="text-lg font-bold uppercase tracking-wider text-primary mb-4">Order Summary</h3>
            <div id="checkout-items-list" class="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar"></div>
          </div>
          
          <div class="pt-4 border-t border-white/10 mt-4">
            <div class="flex justify-between items-center text-sm text-gray-400">
              <span>Items Subtotal:</span>
              <span id="checkout-summary-total" class="font-bold text-white text-base">₱0.00</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-between">
          <div class="flex flex-row justify-between items-center mb-4"> 
            <h2 class="text-2xl font-bold uppercase tracking-wide text-primary">Checkout Details</h2>
            <a href="/product.html" class="bg-dark w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-secondary transition">
              <i class="fa-solid fa-greater-than text-md font-semibold text-secondary hover:text-primary"></i>
            </a>
          </div>


          

         <form id="checkout-form" class="space-y-4">
  <div>
    <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
    <input type="text" id="cust-name" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none hover:border-light focus:border-light transition text-white">
  </div>
  <div>
    <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Delivery Address</label>
    <input type="text" id="cust-address" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none hover:border-light focus:border-light transition text-white">
  </div>
  <div class="grid grid-cols-2 gap-3">
    <div>
      <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Contact No.</label>
      <input type="tel" id="cust-phone" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none hover:border-light focus:border-light transition text-white">
    </div>
    <div>
      <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
      <input type="email" id="cust-email" required class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none hover:border-light focus:border-light transition text-white">
    </div>
  </div>

  <div>
    <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Select Bank Account</label>
    <select id="cust-bank" class="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-sm focus:outline-none hover:border-light focus:border-light transition text-white cursor-pointer appearance-none">
      <option value="" disabled selected hidden>Choose your bank...</option>
      <option value="BDO" class="bg-zinc-900">BDO (Banco de Oro)</option>
      <option value="Metrobank" class="bg-zinc-900">Metrobank</option>
      <option value="ChinaBank" class="bg-zinc-900">ChinaBank</option>
      <option value="BPO" class="bg-zinc-900">BPO Bank</option>
      <option value="BPI" class="bg-zinc-900">BPI (Bank of the Philippine Islands)</option>
    </select>
  </div>
            <div>  
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 text-center my-1 font-bold">— OR —</label>
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
                <input type="tel" id="cust-mobile-wallet" placeholder="9xxxxxxxxx" maxlength="10" class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 pl-12 text-sm focus:outline-none focus:border-primary text-white">
              </div>
            </div>

            <div id="card-number-wrapper" class="hidden transition-all duration-300"> 
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Card Number (Simulated)</label>
              <input type="text" id="cust-card" placeholder="xxxx-xxxx-xxxx-xxxx" class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm focus:outline-none focus:border-primary text-white">
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
    </div>

    <div id="toast-notification" class="fixed top-5 left-1/2 -translate-x-1/2 bg-red-800 text-white px-6 py-3 rounded-lg shadow-2xl font-semibold text-sm z-90 flex items-center gap-3 transition-all duration-300 opacity-0 pointer-events-none transform -translate-y-4">
      <i class="fa-solid fa-triangle-exclamation text-lg"></i>
      <span id="toast-message">Your cart is empty!</span>
    </div>

    <div id="verification-modal" class="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-80 hidden">
      <div class="bg-zinc-950 border border-zinc-800 p-6 rounded-xl max-w-sm w-full text-center shadow-2xl mx-4">
        <i class="fa-solid fa-shield-halved text-4xl text-primary mb-3"></i>
        <h3 class="text-xl font-bold uppercase tracking-wide text-white">Security Verification</h3>
        <p class="text-xs text-gray-400 mt-1 mb-4">Choose where to send your Security Verification Code (OTP):</p>
        
        <div class="grid grid-cols-2 gap-3 mb-5">
          <button id="verify-via-sms" class="p-3 bg-zinc-900 border border-zinc-800 hover:border-blue-600 rounded-lg flex flex-col items-center gap-1.5 group transition">
            <i class="fa-solid fa-comment-sms text-lg text-gray-500 group-hover:text-blue-400"></i>
            <span class="text-xs font-semibold text-gray-300">Via SMS</span>
          </button>
          <button id="verify-via-email" class="p-3 bg-zinc-900 border border-zinc-800 hover:border-green-600 rounded-lg flex flex-col items-center gap-1.5 group transition">
            <i class="fa-solid fa-envelope text-lg text-gray-500 group-hover:text-green-400"></i>
            <span class="text-xs font-semibold text-gray-300">Via Email</span>
          </button>
        </div>

        <div id="otp-input-wrapper" class="hidden space-y-3">
          <p id="otp-sent-message" class="text-[11px] text-orange-400 font-medium"></p>
          <input type="text" id="otp-code" maxlength="6" placeholder="Enter 6-Digit OTP (Simulated: 123456)" class="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-center text-base tracking-widest font-mono text-white focus:outline-none focus:border-red-600">
          <button id="confirm-otp-btn" class="w-full bg-red-600 hover:bg-red-700 font-bold py-2 rounded text-sm uppercase transition">Verify & Proceed</button>
        </div>
      </div>
    </div>

  `;

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
        // FIX #1: Alisin ang required sa mobile wallet kapag bank account ang pinili
        mobileWrapper.classList.add('hidden');
        mobileInput.removeAttribute('required');
        mobileInput.value = ""; 

        cardWrapper.classList.remove('hidden');
        cardInput.setAttribute('required', 'true');

        radioButtons.forEach(radio => {
          radio.checked = false;
          const parent = radio.parentElement;
          
          // Alisin ang active e-wallet designs kapag bumalik si user sa bank option
          parent.classList.remove(
            'border-blue-600', 'bg-blue-600/10', 'text-blue-400',
            'border-green-600', 'bg-green-600/10', 'text-green-400',
            'border-primary', 'bg-primary/10', 'text-primary'
          );
          parent.classList.add('border-zinc-800', 'bg-zinc-900');
          
          const labelSpan = parent.querySelector('span');
          if (labelSpan) {
            labelSpan.classList.remove('text-blue-400', 'text-green-400', 'text-primary');
            labelSpan.classList.add('text-gray-400');
          }
        });
      }
    });
  }

  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        bankSelect.value = ""; 
        // FIX #2: Siguraduhing tanggal ang required sa card field kapag e-wallet naman ang active
        cardWrapper.classList.add('hidden');
        cardInput.removeAttribute('required');
        cardInput.value = "";

        mobileWrapper.classList.remove('hidden');
        mobileInput.setAttribute('required', 'true');    
        mobileLabel.innerText = `${this.value} Mobile Number`;

        radioButtons.forEach(r => {
          const parent = r.parentElement;
          // Alisin ang lahat ng posibleng active active borders/backgrounds
          parent.classList.remove(
            'border-blue-600', 'bg-blue-600/10', 'text-blue-400',
            'border-green-600', 'bg-green-600/10', 'text-green-400',
            'border-primary', 'bg-primary/10', 'text-primary'
          );

          parent.classList.add('border-zinc-800', 'bg-zinc-900');

          const labelSpan = parent.querySelector('span');
          if (labelSpan) {
            labelSpan.classList.remove('text-blue-400', 'text-green-400', 'text-primary');
            labelSpan.classList.add('text-gray-400');
          }
  });

  //mag stay ang border base sa pipindutin ni user
  const currentParent = this.parentElement;
        const currentSpan = currentParent.querySelector('span');

        currentParent.classList.remove('border-zinc-800', 'bg-zinc-900');

        if (this.value === 'GCash') {
          currentParent.classList.add('border-blue-600', 'bg-blue-600/10');
          if (currentSpan) {
            currentSpan.classList.remove('text-gray-400');
            currentSpan.classList.add('text-blue-400');
          }
        }
        else if (this.value === 'PayMaya') {
          currentParent.classList.add('border-green-600', 'bg-green-600/10');
          if (currentSpan) {
            currentSpan.classList.remove('text-gray-400');
            currentSpan.classList.add('text-green-400');
          }
        }
        else if (this.value === 'PayPal') {
          currentParent.classList.add('border-primary', 'bg-primary/10');
          if (currentSpan) {
            currentSpan.classList.remove('text-gray-400');
            currentSpan.classList.add('text-primary');
          }
        }
      }
    });
  })

  const checkoutForm = document.querySelector('#checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();

    const selectedBank = document.querySelector('#cust-bank').value;
    const selectedRadio = document.querySelector('.payment-radio:checked');

    if (selectedBank === "" && !selectedRadio) {
      showToast("Please select a Bank Account or a Digital E-Wallet to proceed.", "error");
      return; // Ihinto ang form submission, huwag munang magpapakita ng OTP
    }

      // Isara ang Checkout form modal, tapos buksan ang Verification Gateway
      document.querySelector('#checkout-modal').classList.add('hidden');
      setupVerificationFlow();
    });
  }
}


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

  const savedCart = JSON.parse(localStorage.getItem('pc_grid_cart')) || [];
  const checkoutItemsList = document.querySelector('#checkout-items-list');
  const checkoutSummaryTotal = document.querySelector('#checkout-summary-total');

  if (checkoutItemsList && checkoutSummaryTotal) {
    checkoutSummaryTotal.innerText = totalPriceElement.innerText;

    if (savedCart.length > 0) {
      checkoutItemsList.innerHTML = savedCart.map(item => `
        <div class="flex items-center gap-3 p-2.5 bg-zinc-900/50 rounded-lg border border-white/5">
          <img src="${item.productImage}" class="w-12 h-12 object-contain bg-white rounded p-1 flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-white uppercase text-[11px] truncate leading-tight">${item.brand} ${item.model}</h4>
            <div class="flex justify-between items-center mt-1">
              <p class="text-orange-400 font-semibold text-[11px]">${item.price}</p>
              <p class="text-[10px] text-gray-400 font-medium bg-zinc-800 px-1.5 py-0.5 rounded">Qty: ${item.quantity}</p>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      checkoutItemsList.innerHTML = `<p class="text-sm text-gray-500 text-center py-4">No items to review.</p>`;
    }
  }
};

window.closeCheckoutFlow = function() {
  document.querySelector('#checkout-modal').classList.add('hidden');  
  const form = document.querySelector('#checkout-form');

  if (form) {
    form.reset();
    document.querySelector('#cust-mobile-wallet-wrapper').classList.add('hidden');
    document.querySelector('#card-number-wrapper').classList.add('hidden');
    document.querySelector('#cust-mobile-wallet').removeAttribute('required');
    document.querySelector('#cust-card').removeAttribute('required'); // FIXED #1 TYPO
    document.querySelectorAll('.payment-radio').forEach(r => {
      r.parentElement.classList.remove('border-blue-600', 'border-green-600', 'border-primary', 'bg-zinc-800');
      r.parentElement.classList.add('border-zinc-800', 'bg-zinc-900');
    });
  }
};

// Internal Handler: Verification Gateway Management Setup
// Sample code verification, wala pa tong send code through SMS and Email dahil kailgangan ng hosting at API

// global variable para may hawak sa generated OTP para sa simulation session
let currentSimulatedOTP = "";

function setupVerificationFlow() {
  const verificationModal = document.querySelector('#verification-modal');
  const smsBtn = document.querySelector('#verify-via-sms');
  const emailBtn = document.querySelector('#verify-via-email');
  const inputWrapper = document.querySelector('#otp-input-wrapper');
  const sentMsg = document.querySelector('#otp-sent-message');
  const confirmBtn = document.querySelector('#confirm-otp-btn');
  const otpInput = document.querySelector('#otp-code');

  verificationModal.classList.remove('hidden');
  inputWrapper.classList.add('hidden');
  otpInput.value = "";
  currentSimulatedOTP = ""; // Clear previous OTP

  //Ganito mag generate ng number
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  smsBtn.onclick = () => {
    const phone = document.querySelector('#cust-phone').value;
    currentSimulatedOTP = generateOTP();

    sentMsg.innerText = `OTP code sent to mobile number: +63 ${phone}`;
    inputWrapper.classList.remove('hidden');

    showToast(`[SIMULATION] SMS Received: Your OTP is ${currentSimulatedOTP}`, "success");
  };

  //GANITO NAMAN PAG EMAIL SENDING OTP
  emailBtn.onclick = () => {
    const email = document.querySelector('#cust-email').value;
    currentSimulatedOTP = generateOTP();

    sentMsg.innerText = `OTP security token sent to email: ${email}`;
    inputWrapper.classList.remove('hidden');

    showToast(`Email Sent: Your OTP is ${currentSimulatedOTP}`, "success");
  };

  confirmBtn.onclick = () => {

    const userEnteredOTP = otpInput.value.trim();

    if (userEnteredOTP === "") {
      showToast("Please enter the 6-digit OTP code.", "error");
      return;
    }

    if (userEnteredOTP === currentSimulatedOTP) {
      verificationModal.classList.add('hidden');

      // Mag-ge-generate ng random Reference Number para sa tagumpay na order
      const refNumber = "REF-" + Math.floor(10000000 + Math.random() * 90000000);
      const customerName = document.querySelector('#cust-name').value;

      showToast(`Thank you, ${customerName}! Successfully ordered. Ref: ${refNumber}`, "success")

    } else {
      showToast("Invalid OTP Code! Please check the message and try again.", "error");
    }
  };
}


// FIXED #2: Dynamic Toast Handler Module supporting multiple design states
function showToast(message, type = "error") {
  const toast = document.querySelector('#toast-notification');
  const toastMsg = document.querySelector('#toast-message');
  const toastIcon = toast ? toast.querySelector('i') : null;
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;  
  
  // Magpalit ng kulay at icon base sa uri ng feedback state
  if (type === "success") {
    toast.classList.remove('bg-red-800');
    toast.classList.add('bg-green-700');
    if (toastIcon) toastIcon.className = "fa-solid fa-circle-check text-lg";
  } else {
    toast.classList.remove('bg-green-700');
    toast.classList.add('bg-red-800');
    if (toastIcon) toastIcon.className = "fa-solid fa-triangle-exclamation text-lg";
  }
  
  toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
  }, 4000);
}