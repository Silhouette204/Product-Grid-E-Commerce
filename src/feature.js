export const supportData =[
  {
     icon: "fa-solid fa-headset",
      title: "Fast & Free Shipping",
      description: "Our dedicated support team is here to assist you with any questions or issues you may have. Whether you need help with product information, order status, or technical support, we're just a click away."
  },

  {
    icon: "fa-solid fa-award",
     title: "Easy Points, Get Rewards",
     description: "Earn points with every purchase and redeem them for exciting rewards."
  },

]

export function renderSupportData(){

  const featureContainer = document.querySelector('#support-card-container');

  if(!featureContainer) return;

  featureContainer.innerHTML = supportData.map(({icon, title, description}) => `
          <div class="support-card flex flex-col justify-center items-center text-center gap-5 my-10">
        <i class="${icon} text-6xl text-secondary"></i>
        <h2 class="text-xl font-bold text-secondary mb-2">${title}</h2>
        <p class="text-secondary mb-2 mx-5">${description}</p>
        <a href="#" class="inline-block bg-secondary text-primary font-semibold py-2 px-6 rounded-lg hover:bg-dark hover:text-secondary transition duration-300">Contact Support</a>
      </div>
  `).join('');
}

export const delivertData = [
  {
   icon: "fa-solid fa-truck-fast",
    title: "Fast & Free Shipping",
    description: "We offer fast and reliable delivery services to ensure your products reach you on time and in perfect condition. Enjoy hassle-free shipping with tracking options for your convenience."
  },

   {
   icon: "fa-solid fa-flag",
    title: "Authorized in the USA",
    description: "We are an authorized dealer in the USA, ensuring that all our products meet the highest standards of quality and authenticity. Shop with confidence knowing you're getting genuine products backed by official warranties."
  },

  {
   icon: "fa-solid fa-calendar-check",
    title: "Standard 1-Year Warranty",
    description: "All our products come with a standard 1-year warranty, providing you with peace of mind and protection against manufacturing defects. Our dedicated support team is here to assist you throughout the warranty period."
  },
  

]

export function renderDeliverData(){

  const deliverContainer = document.querySelector('#deliver-card-container');

  if(!deliverContainer) return;
  deliverContainer.innerHTML = delivertData.map(({icon, title, description}) => `
        <div class="support-card flex flex-col justify-center items-center text-center gap-5 my-10">
        <i class="${icon} text-4xl text-primary bg-secondary rounded-full p-4"></i>
        <h2 class="text-xl font-bold text-secondary mb-2">${title}</h2>
        <p class="text-secondary mb-2 mx-5">${description}</p>
      </div>
  `).join('');
}