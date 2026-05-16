export const navData = [
  {
   productSection: "/product-sysUnit.html",
   icon: "fa-computer",
   productName: "SYSTEM UNIT"
  },

    {
   productSection: "/product-laptop.html",
   icon: "fa-laptop",
   productName: "LAPTOP"
  },

    {
   productSection: "/product-monitor.html",
   icon: "fa-desktop",
   productName: "MONITOR"
  },

    {
   productSection: "/product-keyboard.html",
   icon: "fa-keyboard",
   productName: "KEYBOARD"
  },

    {
   productSection: "/product-mouse.html",
   icon: "fa-mouse",
   productName: "MOUSE"
  },


 //add-navigation
   {
  productSection: "/product-motherboard.html",
   icon: "fa-chess-board",
   productName: "MOTHERBOARD"
  },

  {
    productSection: "/product-ram.html", 
    icon: "fa-memory",
    productName: "RAM"
  },

  {
    productSection: "/product-psu.html", 
    icon: "fa-bolt",
    productName: "PSU"
  },

  {
    productSection: "/product-cpu.html", 
    icon: "fa-microchip",
    productName: "CPU"
  },

  {
    productSection: "/product-gpu.html", 
    icon: "fa-video",
    productName: "GPU"
  },

{
    productSection: "/product-cooler.html", 
    icon: "fa-snowflake",
    productName: "COOLER"
  },


  {
    productSection: "/product-storage.html", 
    icon: "fa-hard-drive",
    productName: "STORAGES"
  },
  {
    productSection: "/product-fan.html",
    icon: "fa-fan",
    productName: "FAN"
  },
  {
    productSection: "/product-case.html", 
    icon: "fa-power-off",
    productName: "CASE"
  }
]

let visibleCount = 5;

export function rendernavData(){
   const productNavList = document.querySelector("#product-nav");
   const navLoadMoreBtn = document.querySelector("#nav-load-more");

   if(!productNavList){
    return;
   }

   const navShow = navData.slice(0, visibleCount);

   productNavList.innerHTML = navShow.map(({productSection, icon, productName}) => `
    
   <a href="${productSection}">
     <li class="product-nav">
      <i class="fa-solid ${icon} mr-2"></i>${productName}
     </li>
   </a>
   
   `).join('');

  if(navLoadMoreBtn){
   if(visibleCount >= navData.length){
     navLoadMoreBtn.innerHTML = `Show Less <i class="fa-solid fa-chevron-up ml-2"></i> `;
     
   } else {
     navLoadMoreBtn.innerHTML = `Show More <i class="fa-solid fa-chevron-down ml-2"></i>`;
   }
  }

}

export function exportNavLoadMore(){

const showSwitchBtn = document.querySelector("#nav-load-more"); //redeclare dito para pag pinindot ang less mawawala yung mga sobrang item sa default number of navigation items.

showSwitchBtn?.addEventListener("click", () => {
  if(visibleCount >= navData.length){
  visibleCount = 5;
  }else{
    visibleCount += 4;
  }


  rendernavData();// kailangan I-re-render para makita ang dagdag na rows at connected sa main.js
});
}
