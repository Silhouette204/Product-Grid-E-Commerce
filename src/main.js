import './style.css'

//account handler 
import './password-logic.js';
import './auth-system.js';

//contact
import './contact.js';

//*
import { renderNavigation } from './nav.js';
import { renderFooter } from './footer.js';

//add to cart every product
import { renderCartUI } from './cart-ui.js';
import { updateCartUI, addToCart } from './cart-logic.js';

//index.html
import { renderHighlightData } from './main-highlight.js';
import { renderSupportData } from './feature.js';
import { renderDeliverData } from './feature.js';
import { renderFaqData } from './faq.js';

//about.html
import { renderAboutBannerData } from './about.js';
import { renderInfoAbout } from './about.js';
import {renderShowcaseData} from './about.js';

//article.html
import { renderArticle } from './articles.js';

//product.html
//header
import {productCarousel} from './carousell.js';
import { renderNavProductItem } from './product-nav-item.js';
import {initProductNavItemCarousel} from'./product-nav-item.js';

//products
//basic pattern
import { renderSysUnit } from './product-render-SysUnit.js';
import {renderLaptop} from './product-render-laptop.js';
import { renderMonitor } from './product-render-monitor.js';
import { renderKeyboard } from './product-render-keyboard.js';
import { renderMouse } from './product-render-mouse.js';
import { renderMotherboard } from './product-render-motherboard.js';

import { renderProductHighlights, renderTopSellers, renderNewArrivals } from './product-render-highlights.js';

//advance pattern
//import yung function na yun sa product-render-universal.js
import { renderMoreData } from './product-render-more.js';//import yung function na yun sa product-render-universal.js

//import data
import { ramData } from './product-datas.js'; //kunin yung data na yun sa product-datas.js
import { psuData } from './product-datas.js';
import { cpuData } from './product-datas.js';  
import { gpuData } from './product-datas.js';  
import { coolerData } from './product-datas.js';
import { storageData } from './product-datas.js';
import { fanData } from './product-datas.js';
import { caseData } from './product-datas.js';

window.removeFromCart = removeFromCart;
/*reusable code pattern
yung mga function na renderMoreData na yun ay pwede mo gamitin sa lahat ng product category mo, kasi ginawa mo sya para maging reusable, so pag nagawa mo na tong function na to, pwede mo na sya gamitin sa lahat ng products mo basta match lang yung properties ng data mo sa logic ng search function mo, gets mo na? XD

//SEARCH FUNCTION
//search function global usefull to kasi pwede mo gamitin to sa lahat ng products mo basta match lang yung properties ng data mo sa logic ng search function mo, so pag nagawa mo na tong search function na to, pwede mo na sya gamitin sa lahat ng products mo, hindi mo na kailangan gumawa ng panibagong search function para sa bawat product category mo, gets mo na? XD
if(document.getElementById("storage-product")){
const searchInput = document.getElementById('searchInput'); //select the search input field, galing to sa ID ng input fields mo try mo tignan sa html mo, kung anong ID ng search input field mo, yun yung kukunin mong ID dito sa javascript

const storageContainer = "#storage-container"; //select the container where the products are rendered, galing to sa ID ng container kung saan mo nirender yung mga products mo, try mo tignan sa html mo, kung anong ID ng container mo, yun yung kukunin mong ID dito sa javascript, kasi pag nag search ka, yung mga products na lalabas ay yung mga products na nasa loob ng container na yun, kaya mahalaga na tama yung pag select mo sa container

 //condition ito para ma check kung yung product page na yun ay may search function, kasi pag nagkaroon ka ng multi product page, hindi lahat ng product page mo ay may search function, kaya kailangan mo lagyan ng condition para ma check kung saan product page mo lalabas yung search function mo, gets mo na? XD
searchInput.addEventListener('input', (e) => {
   const term = e.target.value.toLowerCase(); //get the search term and convert it to lowercase for case-insensitive search

   const filteredData = storageData.filter(item => { 
      return item.brand.toLowerCase().includes(term) || //filter the data based on the brand property ng mga products mo, kung ang brand ng product ay naglalaman ng search term, isasama sya sa filteredData
              item.model.toLowerCase().includes(term); //filter the data based on the model property ng mga products mo, kung ang model ng product ay naglalaman ng search term, isasama sya sa filteredData
});

renderMoreData(filteredData, storageContainer, ramContainer);
});

*/
// Generic search function

function initSearch(inputID, data, containerID, renderFunc) {
    const searchInput = document.getElementById(inputID);
    
    // Safety check: kung wala ang input sa page, huwag ituloy ang code
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        const filteredData = data.filter(item => {
            return item.brand.toLowerCase().includes(term) || 
                   item.model.toLowerCase().includes(term);
        });

        // Tatawagin nito ang render function na ipapasa mo (hal. renderMoreData)
        renderFunc(filteredData, containerID);
    });
}


//FILTER FUNCTION BUTTONS
//filter function phase 3 ito kaya kailangan maintindihan mo para maapply mo sa ibang filter mo in the future
const filterButtons = document.querySelectorAll('#storage-container-list .storage-list a[data-filter]'); //select all the filter buttons

filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); //prevent default link behavior

    const filterValue = button.getAttribute('data-filter'); //get the filter value from data-filter attribute sa especific achor tag mo makikita ang data-filter attribute na yun

    if (filterValue === 'ALL') {
      renderMoreData(storageData, "#storage-container"); //if ALL is clicked, render all products PS: Yung storageData galing yan don sa mga data ng mga products mo (kung storageData nasa ./product-datas.js) at #storage-container naman galing sa id ng container kung saan mo gustong i-render yung mga products mo
    } else {
      const filteredData = storageData.filter(item => {
       return item.type.includes(filterValue); //filter the data based on the type property ng mga products mo, kung ang type ng product ay tugma sa filter value (SSD, HDD, NVMe), isasama sya sa filteredData
      });
      renderMoreData(filteredData, "#storage-container");// dito na lalabas kung ano ang magiging output base sa filter na pinili mo, kung SSD filter ang pinili mo, yung mga products na may type na SSD lang ang lalabas, kung HDD filter ang pinili mo, yung mga products na may type na HDD lang ang lalabas, at ganun din sa NVMe filter
    }
});
});

document.addEventListener('DOMContentLoaded', () => {
renderNavigation();
renderCartUI();
updateCartUI();
renderFooter();

// Event Delegation para sa Add to Cart
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    
    if (btn) {
      // Imbes na mag-search sa array (caseData), 
      // kunin natin diretso sa dataset ng button ang info.
      const product = {
        id: parseInt(btn.dataset.id),
        brand: btn.dataset.brand,
        model: btn.dataset.model,
        price: btn.dataset.price,
        productImage: btn.dataset.image // Siguraduhin na 'image' ang tawag mo sa attribute
      };

      // Ngayon, kahit anong product (Fan, CPU, Case), papasok na rito
      addToCart(product);
    }
});

//for index.html
if(document.getElementById("highlight-build")){ // yung mga condition na ito mahalaga ito para ma check kung yung isang html page ay may content na ganito, kasi pag  gumagamit na tayo ng ibang html or multi-web page na kailangan bukod bukod na ang kino call nating function kung saan lang itong function na nag eexist sa isang html file, doon lang sya lalabas for example pag index.html meron syang #highlight-build id section lalabas yung function nayan sa javascript, pero pag about.html na and di tinawag yang #highlight-build id section nayan, hindi sya lalabas sa logic ng about.html gets mo na? now yo know XD
  renderHighlightData();
}

if(document.getElementById("support")){
  renderSupportData();
}

if(document.getElementById("deliver")){
renderDeliverData();
}

if(document.getElementById("FAQ")){
renderFaqData();
}


//for about.html
if(document.getElementById("banner-about")){
renderAboutBannerData();
}

if(document.getElementById("info-about")){
renderInfoAbout();
}

if(document.getElementById("showcase")){
renderShowcaseData();
}


//for article.html
if(document.getElementById("article")){
  renderArticle();
}

//for product.html
if(document.getElementById("banner-carousell")){
  productCarousel();
}

if(document.getElementById("product-item-navigation")){
  renderNavProductItem();
  initProductNavItemCarousel();
}


//basic pattern ng pag render ng products
if(document.getElementById("sysUnit-product")){
 renderSysUnit();
}

if(document.getElementById("laptop-product")){
 renderLaptop();
}

if(document.getElementById("monitor-product")){
  renderMonitor();
}

if(document.getElementById("keyboard-product")){
  renderKeyboard();
}

if(document.getElementById("mouse-product")){
  renderMouse();
}

if(document.getElementById("motherboard-product")){
  renderMotherboard();
}

if(document.getElementById("new-arrival-container")){
 renderNewArrivals();
}

if(document.getElementById("top-seller-container")){
  renderTopSellers();
}


//advance pattern ng pag render ng products
if(document.getElementById("ram-product")){
    renderMoreData(ramData, "#ram-container"); //ito para pag pumunta ka sa page na yun, may mga products na agad na lalabas, hindi mo na kailangan mag search agad para may lumabas sa page mo, so pag nag load yung page, yung mga products na yun ay lalabas agad, at saka pag nag search ka, yung mga products na lalabas ay yung mga products na match sa search term mo, gets mo na? XD
    initSearch('searchInput', ramData, "#ram-container", renderMoreData); //pasa mo yung renderMoreData function sa argument ng renderMoreData function, para magamit mo sya sa loob ng search function mo, gets mo na? XD
  }

if(document.getElementById("psu-product")){
  renderMoreData(psuData, "#psu-container");
  initSearch('searchInput', psuData, "#psu-container", renderMoreData);
}

if(document.getElementById("cpu-product")){
  renderMoreData(cpuData, "#cpu-container");
  initSearch('searchInput', cpuData, "#cpu-container", renderMoreData);
}

if(document.getElementById("gpu-product")){
   renderMoreData(gpuData, "#gpu-container");
  initSearch('searchInput', gpuData, "#gpu-container", renderMoreData );
}

if(document.getElementById("cooler-product")){
  renderMoreData(coolerData, "#cooler-container");
  initSearch('searchInput', coolerData, "#cooler-container", renderMoreData);
}

if(document.getElementById("storage-product")){
  renderMoreData(storageData, "#storage-container");
  initSearch('searchInput', storageData, "#storage-container", renderMoreData);
}

if(document.getElementById("fan-product")){
  renderMoreData(fanData, "#fan-container");
  initSearch('searchInput', fanData, "#fan-container", renderMoreData);
}

if(document.getElementById("case-product")){
  renderMoreData(caseData, "#case-container");
  initSearch('searchInput', caseData, "#case-container", renderMoreData);
}

if(document.getElementById("product-highlights-container")){
  renderProductHighlights();
}

});

