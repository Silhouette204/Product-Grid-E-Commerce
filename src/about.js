export const aboutBannerData = [ 
  {
  title: "Gaming",
  rate: "(4.9)",
  description: "Optimized builds that actually deliver. We tested the streaming set and got consistent 144+ FPS on triple-A titles without thermal throttling."
},

 {
  title: "Price-to-Performance",
  rate: "(4.8)",
  description: "Computer Grid manages to source high-quality components at prices that beat most retail outlets. Definitely the best bang-for-your-buck in the local market."
},

 {
  title: "Design & Component",
  rate: "(4.7)",
  description: "Modern, sleek, and well-managed. The cable management in their pre-built sets is top-tier, and the aesthetics fit any minimalist or RGB-heavy setup."
},

 {
  title: "Customer Support",
  rate: "(5.0)",
  description: "Their 24-hour support team is actual tech experts, not just bots. They helped me troubleshoot my BIOS settings at 3 AM. Truly reliable."
}
]

export function renderAboutBannerData(){
   const aboutBannerContainer = document.querySelector("#banner-content");

   if(!aboutBannerContainer){
    return;
   }

   aboutBannerContainer.innerHTML = aboutBannerData.map(({title, rate, description}) => 
    `
     <div class="banner-about">
                <h1 class="text-center text-xl font-semibold">${title}</h1>
                 <h3 class="my-1 text-center text-lg font-semibold">${rate}</h3>
                 <p class="text-center text-base">${description}</p>
            </div>
   `
  ).join(''); 
   
}

export const infoAboutData = [
  {
    icon: "fa-toolbox",
    title: "Engineered for Peak Performance",
    description: "We don't just sell parts; we provide optimized configurations. Our system uses a performance-first algorithm to match CPUs and GPUs that minimize bottlenecking, giving you the highest FPS for every Peso spent. By bypassing standard retail markups and sourcing directly, we integrate premium cooling and power solutions into every build."
  },

  {
    icon: "fa-users-line",
    title: "The Eco-System Integration",
    description: "Owning a Computer Grid system means being part of an integrated ecosystem. Our service doesn't end at delivery; your build is logged into our 24-hour support grid for easy troubleshooting. If you ever need an upgrade, our modular designs allow for future-proofing—meaning you can swap out components easily."
  },

  {
    icon: "fa-gamepad",
    title: "Order-to-Play",
    description: "Our system is designed to remove the guesswork from PC building. First, we curate high-performance component grids that are guaranteed to be compatible. Once you select your build—whether it's for 4K gaming or professional streaming—our engineers hand-assemble the unit with precision cable management."
  },
]

export function renderInfoAbout() {
  const infoAboutContainer = document.querySelector("#info-about-container");

  if(!infoAboutContainer){
    return;
  }

  infoAboutContainer.innerHTML = infoAboutData.map(({icon, title, description}) => `
   <div class="about-card flex flex-col items-center gap-4">
        <i class="fa-solid ${icon} bg-secondary p-4 text-3xl rounded-4xl w-fit"></i>
        <h3 class="text-secondary font-semibold text-xl">${title}</h3>
        <p class="text-secondary/70">${description}</p>
    </div>
  `).join(' ');
}

export const showcaseData = [
  {
    spanTitle: "Ready",
    title: "Prebuilt Computer",
    description : "Our Ready Prebuilt systems are expertly assembled and stress-tested to ensure peak performance straight out of the box.",
    image: "image/about/showcase-1.png"
  },

  {
    spanTitle: "Ease",
    title: "Builder",
    description : "Other Easy Builder system simplifies the PC-building process by offering curated, compatible component grids tailored to your specific budget and needs.",
    image: "image/about/showcase-2.png"
  },

   {
    spanTitle: "Custom",
    title: "Gaming PC's",
    description : "Our Custom Gaming PCs are the pinnacle of personalization, built from the ground up to match your exact aesthetic and performance specifications.",
    image: "image/about/showcase-3.png"
  },

]

export function renderShowcaseData(){
  const aboutshowcaseContainer = document.querySelector("#showcase-about");

  if(!aboutshowcaseContainer){
  return;
  }

  aboutshowcaseContainer.innerHTML = showcaseData.map(({spanTitle, title, description, image}) => `
  
    <div class="support-card flex flex-col items-center gap-5">
        <div class="flex flex-col gap-5 items-center">
           <h3 class="text-secondary text-2xl font-semibold"><span class="text-red-700">${spanTitle}</span>${title}</h3>
           <p class="text-secondary/70 mx-5">${description}</p>

           <a href="#" class="bg-secondary py-3 px-5 text-base w-fit font-semibold rounded-3xl hover:bg-dark duration-300 ease-out hover:text-secondary">See More</a>
 </div>

    <div class="mt-6 w-70 h-70 overflow-hidden">
             <img src="${image}" class="w-full h-full object-cover" alt="">
             </div>
      </div>

  `).join('');

}
