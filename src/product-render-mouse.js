import { mouseData } from './product-datas.js';

export function renderMouse(){

  const mouseContainer = document.querySelector("#mouse-container");

  if(!mouseContainer){
    return;
  }

  mouseContainer.innerHTML = mouseData.map(({id, productImage, brand, model, type, sensor, features, price}) => `
  
   <div class="sys-unit-card hover:scale-105 transition-transform duration-300 ">
 <div class="aspect-square overflow-hidden mx-3 mb-5 md:m-5">
   <img src="${productImage}" class="w-full h-full object-cover" alt="System Unit">
    </div>
   <div id="specs">
      <ul class="text-start flex flex-col gap-2 mb-5 specs-desc">
         <li class="font-semibold">Brand: ${brand}</li>
         <li>Model: ${model}</li>
         <li>Type: ${type}</li>
         <li>Sensor: ${sensor}</li>
         <li>Features: ${features}</li>
         <li>Price: <span class="text-red-700 ml-2">${price}</span></li>
      </ul>

     <div class="flex mt-5 items-center gap-2">
               <a href="#" class="flex-1 text-center text-sm p-2 rounded-lg bg-secondary text-primary  hover:bg-dark duration-300 ease-out hover:text-secondary lg:font-semibold ">BUY NOW</a>
               
               <button 
             data-id="${id}" 
             data-brand="${brand}" 
             data-model="${model}" 
             data-price="${price}" 
             data-image="${productImage}"
             class="add-to-cart-btn py-2 px-3 text-primary bg-secondary rounded-lg hover:bg-dark duration-300 ease-out hover:text-secondary cursor-pointer"
           >
             <i class="flex item-center fa-solid fa-cart-arrow-down"></i>
           </button>
               </div>
               
   </div>
 </div>
  
  `).join('');
}