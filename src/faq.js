export const faqData = [ 
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. Please check our payment page for more details."
  },

  {
    question: "How long does shipping usually take?",
    answer: "For Metro Manila orders, expect delivery within 1-3 business days. For provincial orders, it typically takes 5-7 business days depending on your location."
  },

  {
    question: "Do your computer builds come with a warranty?",
    answer: "Yes, all our computer builds come with a standard 1-year warranty covering manufacturing defects. For more details, please refer to our warranty policy."
  },

  {
    question: "Can I customize the specs of a pre-built PC?",
    answer: "Yes, we offer customization options for our pre-built PCs. You can choose from a range of components and configurations to suit your specific needs. Please contact our support team for more information."
  },

  {
    question: "What is your return policy?",
    answer: "We offer a 7-day replacement policy for factory defects. Items must be returned in their original packaging and condition to be eligible for a refund or swap."
  },

  {
    question:"Are the software and Windows OS already activated?",
    answer: "Yes, all our computer builds come with pre-installed and activated software, including the Windows operating system."
  },

  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within the Philippines. We are working on expanding our reach to serve the international computing community soon!"
  }
]

export function renderFaqData(){ 

  const faqContainer = document.querySelector('.accordion-container');

if(!faqContainer){ 
  return;
}

  faqContainer.innerHTML = faqData.map(({question, answer}) => `
  
  <div class="accordion-items">
        <button class="accordion-question flex flex-row justify-between items-center accordion-header p-4 rounded-lg cursor-pointer w-full bg-dark text-secondary font-semibold hover:bg-dark/50 hover:text-secondary transition duration-300 ease-in-out">
          <span class="text-base font-semibold">${question}</span>
          <i class="dropdown fa-solid fa-chevron-down transition-transform duration-300 ease-in-out"></i>
        </button>


        <div class="accordion-answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
          <p class="text-base font-normal text-secondary p-5">${answer}</p>
      </div>
      </div>
  `
).join('');

insertFaqData(faqContainer);
}

function insertFaqData(container){
  const question = container.querySelectorAll('.accordion-question');

  question.forEach(btn => { 

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const answer = btn.nextElementSibling;
      const dropdownIcon = btn.querySelector('.dropdown');
      const isOpen = answer.style.maxHeight;

       container.querySelectorAll('.accordion-answer').forEach(el => el.style.maxHeight = null);

       container.querySelectorAll('.dropdown').forEach(icon => icon.style.transform = 'rotate(0deg)');

      if(!isOpen){
        answer.style.maxHeight = answer.scrollHeight + "px";
        dropdownIcon.style.transform = 'rotate(180deg)';
      }
    });
  });

//for window function
window.addEventListener('click', (e) => {

  if(!e.target.closest('.accordion-items')){
  question.forEach(btn => {
    btn.nextElementSibling.style.maxHeight = null;
    btn.querySelector('.dropdown').style.transform = 'rotate(0deg)';
    });
   }
  });

  }