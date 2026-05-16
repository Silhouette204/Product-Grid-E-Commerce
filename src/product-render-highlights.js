import {NEW_ARRIVAL_DATA} from "./product-highlights.js";

export function renderNewArrivals() {
  const newArrivalContainer = document.querySelector("#new-arrival-container");
  if (!newArrivalContainer) return;

  newArrivalContainer.innerHTML = NEW_ARRIVAL_DATA.map(({id, name, category, price, image, specs}) => `
    <div class="new-arrival-card hover:-translate-y-2 transition duration-300 ease-out hover:cursor-pointer active:scale-95">
      <div class="w-full h-48 rounded-t-lg overflow-hidden flex items-center justify-center">
        <img src="${image}" class="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110" alt="${name}">
      </div>

      <div class="description text-secondary text-start py-5 flex flex-col gap-1 ">
        <h1 class="font-semibold text-sm hover:text-dark transition hover:cursor-pointer">${name}</h1>
        <h3>${category}</h3>
        <h3>Price: ${price}</h3>
        <h3 class="text-sm text-muted-foreground">Specs: ${specs}</h3>
      </div>

      <div class="flex items-center gap-2">
        <a href="#" class="flex-1 text-center text-sm p-2 rounded-lg bg-secondary text-primary hover:bg-dark duration-300 ease-out hover:text-secondary lg:font-semibold">BUY NOW</a>
        
        <button 
          data-id="${id}" 
          data-brand="${category}" 
          data-model="${name}" 
          data-price="${price}" 
          data-image="${image}"
          class="add-to-cart-btn py-2 px-3 text-primary bg-secondary rounded-lg hover:bg-dark duration-300 ease-out hover:text-secondary cursor-pointer"
        >
          <i class="flex item-center fa-solid fa-cart-arrow-down"></i>
        </button>
      </div>
      <span class="text-[10px] text-muted-foreground">(124 reviews)</span>
    </div>
  `).join('');
}

import {TOP_SELLER_DATA} from "./product-highlights.js";

export function renderTopSellers() {
  const topSellerContainer = document.querySelector("#top-seller-container");

  if (!topSellerContainer){
   return;
  }

  topSellerContainer.innerHTML = TOP_SELLER_DATA.map(({id, name, category, price, image, specs, review}) => `
       <div class="top-seller-card hover:-translate-y-2 transition duration-300 ease-out hover:cursor-pointer active:scale-95">

 <div class="w-full h-48  rounded-t-lg overflow-hidden flex items-center justify-center">

   <img src="${image}" class="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110" alt="">
  </div>

<div class="description text-secondary text-start py-5 flex flex-col gap-1 ">
    <h1 class="font-semibold text-sm hover:text-dark transition hover:cursor-pointer">${name}</h1>
    <h3>${category}</h3>
    <h3>Price: ${price}</h3>
    <h3 class="text-sm text-muted-foreground">
      Specs: ${specs}
    </h3>
</div>

 <div class="flex items-center gap-2">
               <a href="#" class="flex-1 text-center text-sm p-2 rounded-lg bg-secondary text-primary  hover:bg-dark duration-300 ease-out hover:text-secondary lg:font-semibold ">BUY NOW</a>
              
               <button 
    data-id="${id}" 
    data-brand="${category}"
    data-model="${name}"
    data-price="${price}"
    data-image="${image}"
    class="add-to-cart-btn py-2 px-3 text-primary bg-secondary rounded-lg hover:bg-dark duration-300 ease-out hover:text-secondary cursor-pointer">
    <i class="fa-solid fa-cart-arrow-down"></i>
  </button>
               </div>

               <div class="flex items-center justify-between gap-2 mb-2 mt-3">
    <div class="flex text-yellow-300 gap-1 ">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
         </div>
         

          <div class="text-secondary text-xs text-muted-foreground">Review: ${review}</div>
</div> 
</div> `
  ).join('');
}

import {PRODUCT_HIGHLIGHTS_DATA} from "./product-highlights.js";

export function renderProductHighlights() {
  const productHighlightsContainer = document.querySelector("#product-highlights-container");

  if (!productHighlightsContainer) {
    return;
  }

  productHighlightsContainer.innerHTML = PRODUCT_HIGHLIGHTS_DATA.map(({id, name, category, price, image, specs}) => `
       <div class="new-arrival-card hover:-translate-y-2 transition duration-300 ease-out hover:cursor-pointer active:scale-95">
 <div class="w-full h-48  rounded-t-lg overflow-hidden flex items-center justify-center">
   <img src="${image}" class="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110" alt="">
  </div>

<div class="description text-secondary text-start py-5 flex flex-col gap-1 ">
    <h1 class="font-semibold text-sm hover:text-dark transition hover:cursor-pointer">${name}</h1>
    <h3>${category}</h3>
    <h3>Price: ${price}</h3>
    <h3 class="text-sm text-muted-foreground">
      Specs: ${specs}
    </h3>
</div>

 <div class="flex items-center gap-2">
               <a href="#" class="flex-1 text-center text-sm p-2 rounded-lg bg-secondary text-primary  hover:bg-dark duration-300 ease-out hover:text-secondary lg:font-semibold ">BUY NOW</a>
              <button 
    data-id="${id}" 
    data-brand="${category}"
    data-model="${name}"
    data-price="${price}"
    data-image="${image}"
    class="add-to-cart-btn py-2 px-3 text-primary bg-secondary rounded-lg hover:bg-dark duration-300 ease-out hover:text-secondary cursor-pointer">
    <i class="fa-solid fa-cart-arrow-down"></i>
  </button>
               </div>
</div>
</div> `
  ).join('');
}
