import { monitorData } from './product-datas.js';

export function renderMonitor(){

  const monitorContainer = document.querySelector("#monitor-container");

  if(!monitorContainer){
    return;
  }

  monitorContainer.innerHTML = monitorData.map(({id, productImage, brand, model, size, resolution, refreshRate, price}) => `
  
   <div class="sys-unit-card hover:scale-105 transition-transform duration-300 even:mt-2 lg:even:mt-0 odd:mb-2 lg:odd:mb-0">
      <div class="aspect-square overflow-hidden m-3 md:m-5">
         <img src="${productImage}" class="w-full h-full object-cover" alt="Monitor">
      </div>
     
   <div id="specs">
      <ul class="text-start flex flex-col gap-2 my-5 specs-desc">
         <li class="font-semibold">Brand: ${brand}</li>
         <li>Model: ${model}</li>
         <li>Size: ${size}</li>
         <li>Resolution: ${resolution}</li>
         <li>Refresh Rate: ${refreshRate}</li>
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