export function renderMoreData (data, containerId) {
  const container = document.querySelector(containerId);

  if (!container){
    return;
  }

  container.innerHTML = data.map((item) => {

        // 2. Speed Warning (High RPM)
        const isHighSpeed = parseInt(item.speed) >= 2000;
        const speedStyle = isHighSpeed ? 'text-red-600 font-extrabold' : 'text-gray-500';

        return `<div class="product-card group hover:-translate-y-2 transition duration-300 border p-4 rounded-xl shadow-sm bg-white">
    
     <div class="aspect-square overflow-hidden m-3 md:m-5 relative rounded-lg">
         <img src="${item.productImage}" 
              class="w-full h-full object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0" 
              alt="${item.model}">

         <img src="${item.productHoverImage ? item.productHoverImage : item.productImage}" 
              class="absolute top-0 left-0 w-full h-full object-contain opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-110" 
              alt="${item.model} (back view)">
      </div>

      <div class="description py-4">
        
        <ul class="text-sm text-gray-600 mt-2 space-y-1 text-start">
        
         ${/* GENERAL specs meron nito */ ''}
        <li><strong>Brand:</strong> ${item.brand}</li>
         <li><strong>Model:</strong> ${item.model}</li>
         <li><strong>Category:</strong> ${item.category}</li>

         ${/* FAN specs kung meron nito */ ''}
         ${item.isPack ? `
                    <div class="absolute -top-2 -left-2 bg-linear-to-rfrom-orange-500 to-red-600 text-text text-[10px] px-3 py-1 rounded-lg font-black shadow-lg z-20">
                        ${item.quantity} PACK
                    </div>
                ` : ''}

                <div class="space-y-1">
                    
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex flex-col">
                        
                            ${item.speed ?  `
                                    <span class="text-[9px] uppercase text-gray-400 font-bold">Max Speed</span>

                                <span class="text-xs ${speedStyle}">${item.speed}</span>` : ""}
                        </div>
                      
                    </div>
                </div>

         ${/* CPU specs kung meron nito */ ''}
         ${item.cores ? `<li><strong>Cores:</strong> ${item.cores}</li>` : ""}
         ${item.baseClock ? `<li><strong>Base Clock:</strong> ${item.baseClock}</li>` : ""}
         ${item.socket ? `<li><strong>Socket:</strong> ${item.socket}</li>` : ""}

        ${/* RAM specs kung meron nito */ ''}
         ${item.capacity ? `<li><strong>Capacity:</strong> ${item.capacity}</li>` : ""}
         ${item.speed ? `<li><strong>Speed:</strong> ${item.speed}</li>` : ""}  
         ${item.type ? `<li><strong>Type:</strong> ${item.type}</li>` : ""}
          
          ${/* MONITOR specs kung meron nito */ ''}
          ${item.size ? `<li><strong>Size:</strong> ${item.size}</li>` : ""}
          ${item.resolution ? `<li><strong>Res:</strong> ${item.resolution}</li>` : ""}

          ${/* KEYBOARD specs kung meron nito */ ''}
          ${item.switches ? `<li><strong>Switches:</strong> ${item.switches}</li>` : ""}

          ${/* MOUSE specs kung meron nito */ ''}
          ${item.sensor ? `<li><strong>Sensor:</strong> ${item.sensor}</li>` : ""}
          ${item.features ? `<li class="italic text-xs mt-2 font-light"> <strong>Features:</strong> "${item.features}"</li>` : ""}

          ${/* GENERAL specs meron nito */ ''}
           <li><strong>Price:</strong> <span class="text-red-700 ml-2">${item.price}</span></li>
        </ul>
        
      </div>

      <div class="flex mt-5 items-center gap-2">
         <a href="#" class="flex-1 whitespace-nowrap text-center text-sm p-2 rounded-lg bg-secondary text-primary hover:bg-dark duration-300 ease-out hover:text-secondary lg:font-semibold">
            BUY NOW
          </a>
                <button 
    data-id="${item.id}" 
    data-brand="${item.brand}"
    data-model="${item.model}"
    data-price="${item.price}"
    data-image="${item.productImage}"
    class="add-to-cart-btn py-2 px-3 text-primary bg-secondary rounded-lg hover:bg-dark duration-300 ease-out hover:text-secondary cursor-pointer">
    <i class="fa-solid fa-cart-arrow-down"></i>
  </button>
               </div>
    </div>
`}).join('');
  };
