 //pag maramihang item sa carousel syempre manual tayo gagamit hindi naman pwede automatic
 
 export const dataNavProductItem = [
  {
    link:"/product-sysUnit.html",
    image:"./image/product-navigation/1.png",
    name:"System Unit",
  },
 
   {
    link:"/product-laptop.html",
    image:"./image/product-navigation/2.png",
    name:"Laptop",
  },

  {
    link:"/product-monitor.html",
    image:"./image/product-navigation/3.png",
    name:"Monitor",
  },

  {
    link:"/product-keyboard.html",
    image:"./image/product-navigation/4.png",
    name:"Keyboard",
  },

  {
    link:"/product-mouse.html",
    image:"./image/product-navigation/5.png",
    name:"Mouse",
  },

  {
    link:"/product-motherboard.html",
    image:"./image/product-navigation/6.png",
    name:"Motherboard",
  },

  {
    link:"/product-ram.html",
    image:"./image/product-navigation/7.png",
    name:"RAM",
  },

  {
    link:"/product-psu.html",
    image:"./image/product-navigation/13.png",
    name:"PSU",
  },

  {
    link:"/product-cpu.html",
    image:"./image/product-navigation/8.png",
    name:"CPU",
  },

  {
    link:"/product-gpu.html",
    image:"./image/product-navigation/9.png",
    name:"GPU",
  },

  {
    link:"/product-cooler.html",
    image:"./image/product-navigation/14.png",
    name:"COOLER",
  },

  {
    link:"/product-storage.html",
    image:"./image/product-navigation/10.png",
    name:"Storage",
  },

  {
    link:"/product-fan.html",
    image:"./image/product-navigation/11.png",
    name:"Fan",
  },

  {
    link:"/product-case.html",
    image:"./image/product-navigation/12.png",
    name:"Case",
  },
  
 ]
 
 export function renderNavProductItem(){
    const NavProductItemContainer = document.querySelector("#product-nav-item");

    if(!NavProductItemContainer){
      return;
    }

NavProductItemContainer.innerHTML = dataNavProductItem.map(({link, image, name}) => `
<li class="shrink-0 w-40 product-nav-links hover:cursor-pointer list-none ">
<a href="${link}" class="flex flex-col items-center group text-primary hover:text-secondary">

              <div class="flex items-center justify-center w-30 h-30 overflow-hidden"> 
              <img src="${image}" class="max-w-full max-h-full object-contain transition-transform group-hover:scale-105 " alt="${name}">
              </div>

              <span class="mt-4 font-semibold text-lg">
              ${name}
              </span>

                  </a>
            </li>
`).join('');

 }


export function initProductNavItemCarousel(){
  const slides = document.querySelector("#product-nav-item");
  const nextBtn = document.querySelector(".prod-next");
  const prevBtn = document.querySelector(".prod-prev");

 if(!slides || !nextBtn || !prevBtn){
  return;
 }

 let currentTranslate = 0;

 // Mas maganda kung dynamic ang step: usog ng "kalahati" ang container width
 // Function para makuha ang width ng container (dynamic usog)
  const getStep = () => slides.parentElement.clientWidth / 2.5;

  //function para sa nextBtn
  // scrollWidth = total length ng lahat ng 12 items
    // clientWidth = yung laking nakikita lang sa screen
  nextBtn.addEventListener("click", () => {
   const maxScroll = slides.scrollWidth - slides.parentElement.clientWidth;

   currentTranslate -= getStep(); //getStep(); dito ididikta kung ano gagawin nya, Force sa sagad na dulo

   //check kung nasa dulo na ng slide
   if(Math.abs(currentTranslate) >= maxScroll){
     currentTranslate = -maxScroll; //getStep(); napalitan ng maxScroll meaning eto na yung  dulo ng slide hindi na dapat mag dadagdag ng slide
   }

   slides.style.transform = `translateX(${currentTranslate}px)`; //mag seset na sya or eto yung output na ipriprint sa html
  });

  // para naman sa previous function
  prevBtn.addEventListener("click", () =>{
   currentTranslate += getStep(); //getStep(); dito ididikta kung ano gagawin nya, Force sa zero

   if(currentTranslate > 0){
      currentTranslate = 0;
   } //pag nasa 0 slide na sya (if slide = 0 value)

    slides.style.transform = `translateX(${currentTranslate}px)`;//mag seset na sya or eto yung output na ipriprint sa html
  });

}
