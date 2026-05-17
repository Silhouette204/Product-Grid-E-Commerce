// cart-logic.js
export let cart = JSON.parse(localStorage.getItem('pc_grid_cart')) || [];

export function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // I-spread natin yung product data at dagdagan ng default quantity
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  
  // Buksan ang cart sidebar para makita ni user na pumasok yung item
  if (typeof window.toggleCart === 'function') {
    const cartEl = document.querySelector('#shopping-cart');
    if (cartEl && cartEl.classList.contains('translate-x-full')) {
      window.toggleCart();
    }
  }
}

function saveCart() {
  localStorage.setItem('pc_grid_cart', JSON.stringify(cart));
}

export function updateCartUI() {
  const cartList = document.querySelector('#cart-list');
  const totalPriceEl = document.querySelector('#cart-total-price');
  const cartCountBadge = document.querySelector('#cart-count');

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cartCountBadge) {
    if (totalItems > 0) {
      cartCountBadge.innerText = totalItems;
      cartCountBadge.classList.remove('hidden'); // Ipakita kung may laman
    } else {
      cartCountBadge.classList.add('hidden'); // Itago kung zero
    }
  }

  //add value doon sa subtotal logic
const subtotal = cart.reduce((sum, item) => {
    // Alisin ang characters na hindi number o point (₱, comma, spaces)
    const cleanPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + (cleanPrice * item.quantity);
  }, 0);

//add value doon sa subtotal display
if (totalPriceEl) {
    // I-format uli pabalik sa Currency format (₱ with commas)
    totalPriceEl.innerText = `₱${subtotal.toLocaleString('en-PH', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = `<div class="flex flex-col gap-10 items-center text-center mt-20 text-gray-500">
    <h1 class="text-3xl font-semibold">Shopping Cart</h1>
     <h3>Your shopping cart is empty</h3>
     <a href="/product.html" class="bg-dark w-fit py-4 px-6 rounded-3xl font-semibold text-sm hover:bg-light duration-400 ease-in-out">Continue Shopping</a>
    </div>`; 
    if (totalPriceEl) totalPriceEl.innerText = "₱0.00";
    return;
  }

  cartList.innerHTML = cart.map(item => `
    <div class="flex items-center gap-3 p-3 bg-secondary/60 rounded-xl border border-white/10 group">
      <img src="${item.productImage}" class="w-16 h-16 object-contain bg-white rounded-lg p-1">
      <div class="flex-1 text-xs">
        <h4 class="font-bold text-white uppercase leading-tight">${item.brand} ${item.model}</h4>
        <p class="text-orange-400 font-semibold mt-1">${item.price}</p>
        <p class="text-[10px] text-gray-400">Qty: ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-primary hover:text-red-500 transition">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  // Optional: Simple Total Calculation (Kung pure numbers ang price sa data mo)
  // price example: "₱5,000" -> kailangan i-parse to number
}

window.removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('pc_grid_cart', JSON.stringify(cart));
  updateCartUI();
};