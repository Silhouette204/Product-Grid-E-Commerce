import { laptopData } from './product-datas.js';

export function renderLaptop(){

  const laptopContainer = document.querySelector("#laptop-container");

  if(!laptopContainer){
    return;
  }

  laptopContainer.innerHTML = laptopData.map(({id, productImage, brand, cpu, gpu, ram, storage, price}) => {

    const displayModel = cpu;

    return `
    <div class="sys-unit-card hover:scale-105 transition-transform duration-300 ">
 <div class="aspect-square overflow-hidden m-3 md:m-5">
   <img src="${productImage}" class="w-full h-full object-cover" alt="System Unit">
    </div>
   <div id="specs">
   <div class="flex flex-col items-center md:items-start">
      <h3 class="text-secondary font-semibold text-lg text-start bg-dark py-1 px-5 w-fit rounded-xl">Specs:</h3>
      </div>
      <ul class="text-start flex flex-col gap-2 my-5 specs-desc">
         <li>Brand: ${brand}</li>
         <li>CPU: ${cpu}</li>
         <li>GPU: ${gpu}</li>
         <li>RAM: ${ram}</li>
         <li>Storage: ${storage}</li>
         <li>Price: <span class="text-red-700 ml-2">${price}</span></li>
      </ul>

     <div class="flex mt-5 items-center gap-2">
               <a href="#" class="flex-1 text-center text-sm p-2 rounded-lg bg-secondary text-primary  hover:bg-dark duration-300 ease-out hover:text-secondary lg:font-semibold ">BUY NOW</a>
        <button 
             data-id="${id}" 
             data-brand="${brand}" 
             data-model="${displayModel}" 
             data-price="${price}" 
             data-image="${productImage}"
             class="add-to-cart-btn py-2 px-3 text-primary bg-secondary rounded-lg hover:bg-dark duration-300 ease-out hover:text-secondary cursor-pointer"
           >
             <i class="flex item-center fa-solid fa-cart-arrow-down"></i>
           </button>
               </div>       
   </div>
 </div>
  `;
  }).join('');
}
  
 
  
   