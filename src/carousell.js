export function productCarousel(){

  //kukunin lahat ng laman ng mga bawat container class
  const carouselContainer = document.querySelectorAll('.carousell-container');

  carouselContainer.forEach((container) => {

  const slides = container.querySelector('.slides'); //pag querySelector gagamit ka ng class at id sign
  const nextBtn = container.querySelector('.next');//pag getElementById kahit wag na
  const prevBtn = container.querySelector('.prev');

if(!slides || !nextBtn || !prevBtn){
return;
}

let i = 0;//value para mag increment at decrement base sa slide value

const totalSlides = 3; //bilang ng slide ko
let autoplay;

//function paano mag iislide ang image or transition
function showSlide(n) {
  i = (n + totalSlides) % totalSlides; // Looping logic
  slides.style.transform = `translateX(-${i * 100}%)`;
}

//autoplay function, kusa lumilipat
function setAutoPlay(){
  autoplay = setInterval(() => {
 
    showSlide(i + 1);
 
  }, 3000); // 3000ms meaning 3second pwede mo palitan kung gaano talagal nag iistay yung image bago lumipat.
}

//reset timer (pag nag press ka ng next button mag rerest ng 3 second kada minamanual press slide mo yung image)
function resetTimer(){
clearInterval(autoplay);//titigil muna ang auto
setAutoPlay(); //mag rereset ule yung timer (which is balik sa 3 second)  
}

//Event Listener
nextBtn.addEventListener('click', () => {
  showSlide(i + 1);
  resetTimer(); //dito magagamit yung sinet natin na reset timer function (nasa taas lang naman neto class) kaya pag nag manual slide tayo tatawaging nya yung resetTimer function at doon na kikilos yung 3 second reset time
});


prevBtn.addEventListener('click', () => { //preivew, ganun din same lang sa nextBtn pero eto pabalik yun lang hehe
  showSlide(i - 1);
  resetTimer();
});

setAutoPlay(); //call lang natin yung main class para gumana na ito. :D
  });
}
