export const articleData = [
  {
    img: "image/article/1.png",
    title:"The ROG Strix Helios II is the gaming PC case for ambitious DIY builders and hardcore gamers alike",
    description: "The ROG Strix Helios II is the ultimate desktop PC case for gamers who want a wealth of features and style."
  },

  {
    img: "image/article/2.png",
    title:"Building a PC vs prebuilt: What kind of gaming desktop is right for you?",
    description: "One of the biggest debates among gamers is building a PC vs prebuilt. While some prefer the convenience and reliability of prebuilt gaming PCs, others enjoy the freedom and customization."
  },

  {
    img: "image/article/3.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

   {
    img: "image/article/4.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

   {
    img: "image/article/5.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/6.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/7.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/8.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/9.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  //added row button kapag ayaw mo ng sobrng haba na content para sa user
  {
    img: "image/article/10.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/10.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/10.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/10.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },

  {
    img: "image/article/10.png",
    title:"Gaming laptop vs desktop: Which kind of gaming PC is right for you?",
    description: "Understand the key differences between gaming laptop vs desktop, such as portability and performance, and decide which is better for your gaming needs."
  },
]

let visibleCount = 9; //kinukuha per item sa article data ibig sabihin hanggang 9 lang kukunin nya

export function renderArticle(){
   const articleContainer = document.querySelector("#article-container");

   const loadMoreBtn = document.querySelector("#load-more-btn");
   //kukunin yung id ng moreBtn anchor tag

   if(!articleContainer){
     return;
   }

   // Kunin lang ang articles base sa visibleCount, slice meaning tatanggalin nya yung mga sobra base sa info na binigay sa variable. 0 meaning start from 0 value sa array
   const itemShow = articleData.slice(0, visibleCount);

   articleContainer.innerHTML = itemShow.map(({img, title, description}) => `
   
    <div class="article-card cursor-pointer hover:-translate-y-2 duration-300">
          <div class="text-secondary">
          <img src="${img}" alt="">
          </div>

          <div class="flex flex-col gap-3 text-secondary mt-5">
          <h3 class="text-secondary font-semibold">//PC GRID</h3>
          <h1 class="text-xl font-semibold">${title}</h1>
          <p class="text-base">${description}</p>
        </div>
</div>
   `
  ).join('');

  //mag poprocess lang ito pag may button, pero pag wala, kailangan ididisplay nya lahat
  if(loadMoreBtn){
  //itatago ang button pag wala ng item na lumabas
  if(visibleCount >= articleData.length){
    loadMoreBtn.style.display = "none";
  }else{
     loadMoreBtn.style.display = "block";
  }
}
}

//event listener pag kinclick na nasasayo kung ilang card ang ilalabas mo
document.querySelector("#load-more-btn")?.addEventListener("click", () => {
  visibleCount += 9;
  renderArticle();// kailangan I-re-render para makita ang dagdag na rows at connected sa main.js
});
