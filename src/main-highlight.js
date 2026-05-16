export const highlightData = [
  {
    id: 1,
    name:"ETHUSIAST AMD GAMING/STREAMING BUILD",
    rate:"1.2k",
    image:"/image/main-h/1.png",
    specs:[ //ganito dapat ang format pag gamit mo ay li gagamit ka ng array
      "Intel Core i7-12700K",
      "32GB DDR5 RAM",
      "NVIDIA RTX 4080 Graphics",
      "1TB NVMe SSD",
      "750W Gold PSU"
    ],
    price:"30,000.00"
  },

  {
    id: 2,
    name:"GREAT AMD GAMING BUILD",
    rate:"2.2k",
    image:"/image/main-h/2.png",
    specs:[ //ganito dapat ang format pag gamit mo ay li gagamit ka ng array
      "AMD Ryzen 5 5600X",
      "32GB DDR5 RAM",
      "AMD RX 6600XT",
      "1TB NVMe SSD",
      "750W Gold PSU"
    ],
    price:"30,000.00"
  },

  {
    id: 3,
    name:"INTEL BEST AMD GAMING BUILD",
    rate:"1.5k",
    image:"/image/main-h/3.png",
    specs:[ //ganito dapat ang format pag gamit mo ay li gagamit ka ng array
      "Intel Core i7-13700K",
      "32GB DDR5 RAM",
      "GeForce RTX 5070",
      "1TB NVMe SSD",
      "750W Gold PSU"
    ],
    price:"30,000.00"
  },
  
];

export function renderHighlightData(){

  const highlightContainer = document.querySelector('#highlight-card-container');

  if(!highlightContainer) return;

  highlightContainer.innerHTML = highlightData.map(({name, rate, image, specs, price}) => `
    <div class="card-highlight-build">
        <div class="flex flex-row justify-between items-center gap-2">
         
        <div>
        <h3 class="font-semibold">${name}</h3>
       </div>
        

        <div class="flex flex-row gap-1 bg-dark/30 px-2 py-1 rounded-md">
         <i class="fa-solid fa-star"></i>
        <p>${rate}</p>
         </div>
     </div>
     
        <div class="">
          <img src="${image}" alt="${name}">
        </div>

        <ul class="text-secondary mt-10 flex flex-col gap-1 list-inside list-none">
          ${specs.map(spec => `<li>${spec}</li>`).join('')}          
        </ul>
       
       <h3 class="text-secondary text-xl font-bold mt-5">₱ ${price}</h3>

        <a href="#" class="mt-5 inline-block bg-secondary text-primary font-semibold py-2 px-6 rounded-lg hover:bg-dark transition duration-300 hover:text-secondary">Start Build Now!</a>
      </div>
` 
).join('');
}