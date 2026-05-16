//product.html
import {rendernavData, exportNavLoadMore} from './nav-product.js';

export function renderNavigation(){

  const navContainer = document.querySelector('#nav-container');
  
  if(!navContainer) {
    return;
  }

  navContainer.innerHTML = `
      <div class="flex flex-row justify-between items-center p-5 lg:px-20 bg-secondary fixed w-full top-0 z-50 shadow-md">

      <div class="flex items-center gap-2">
     <button id="nav-bar" class="p-2 text-primary rounded-xl text-2xl cursor-pointer hover:bg-primary hover:text-secondary transition duration-300">
      <i class="fa-solid fa-bars"></i>
    </button> 
        <h1 class="text-xl md:text-2xl font-semibold text-primary">Computer Grid</h1>
        </div>

        <div class="flex flex-row md:gap-5"> 

        <button onclick="toggleCart()" class="relative p-2 text-primary text-2xl cursor-pointer group">
            <i class="fa-solid fa-cart-shopping transition-transform  text-2xl hover:text-dark hover:transition"></i>
            <span id="cart-count" class="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-secondary ">
              0
            </span>
          </button>

<a href="#" class="text-lg font-semibold mr-2  text-primary hover:bg-primary py-2 px-4 hover:rounded-4xl hover:text-secondary duration-300 ease-in-out">
  Sign In
</a>
 </div>
     </div>

        <div id="backdrop" class="fixed inset-0 bg-backdrop/50 opacity-1 pointer-events-none transition-opacity duration-300 z-50"></div>

<aside id="side-nav" 
  class="fixed top-0 left-0 w-65 h-full bg-white/70 backdrop-blur-md border-r border-primary shadow-xl transform transition-transform duration-300 ease-in-out z-50 -translate-x-full overflow-auto">

  <div class="flex items-center justify-baseline py-5 gap-2 mx-2  border-b border-primary">
      <i id="exit-nav" class="fa-solid fa-xmark text-2xl cursor-pointer hover:bg-secondary px-3 py-2 hover:text-primary  hover:duration-300 ease-in-out rounded-4xl"></i>
      <a href="#" class="text-2xl font-bold  text-secondary">Computer Grid</a>
</div >

    <div class="p-4">
    <nav class="border-b-2">
    <ul class="flex flex-col gap-3">
      <li class="link-nav"><i class="fa-solid fa-house mx-2"></i><a href="/index.html">Home</a></li>

      <li class="link-nav"><i class="fa-solid fa-user mx-2"></i><a href="/about.html">About</a></li>

       <li class="link-nav"><i class="fa-solid fa-newspaper mx-2"></i><a href="/article.html">Article</a></li>
     
       <li class="link-nav"><i class="fa-solid fa-truck-fast mx-2"></i><a href="/product.html">Products</a></li>
              
       <li class="link-nav"><i class="fa-solid fa-address-card mx-2"></i><a href="">Contact</a></li>
    </ul>


    <a href="#" class="inline-flex mx-3 my-10 py-3 px-10 bg-secondary text-primary text-base font-semibold rounded-2xl hover:bg-primary hover:text-secondary transition duration-300 ease-in-out">Sign Up</a>
</nav>

<div class="my-5">
<h3 class="my-3 text-xl font-semibold">Product List</h3>

<ul id="product-nav" class="flex flex-col gap-2 my-4">
 <!-- product-nav will be dynamically inserted here (product-nav.js)-->  
</ul>


<div class="flex justify-center mt-6">
 <button id="nav-load-more" class="text-lg font-base hover:text-dark duration-300 cursor-pointer"> <!-- nasa product-nav.js ang switch word--> </button>
 </div>
</div>

</div>

  </aside>
  </div>
  `
  setUpNav();
  rendernavData();
  exportNavLoadMore();
}

function setUpNav(){
const navBar = document.querySelector('#nav-bar');
const sideNav = document.querySelector('#side-nav');
const exitNav = document.querySelector('#exit-nav');
const backdrop = document.querySelector('#backdrop');

navBar.addEventListener('click', () => {
  sideNav.classList.remove('-translate-x-full');

  backdrop.classList.remove('opacity-0', 'pointer-events-none');  
  backdrop.classList.add('opacity-100', 'pointer-events-auto'); 

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // I-lock ang scroll at lagyan ng padding para hindi tumalon ang layout
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
});

function closeSideNav() {
  sideNav.classList.add('-translate-x-full');

  backdrop.classList.add('opacity-0', 'pointer-events-none'); 
  backdrop.classList.remove('opacity-100', 'pointer-events-auto');  

  // Ibalik ang scroll
document.body.style.overflow = '';
  document.body.style.paddingRight = '0px';
}

exitNav.addEventListener('click', closeSideNav);
backdrop.addEventListener('click', closeSideNav);
}