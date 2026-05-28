export function renderFooter() {
   const footerContainer = document.querySelector("#footer");
 
   if (!footerContainer) {
     return;
   }
 
   // ==========================================
   // 🔒 GUEST MODE CHECKER LAYER
   // ==========================================
   // Hahatakin ang active session mula sa localStorage
   const isUserAuthenticated = localStorage.getItem("active_user_session") !== null;
 
   // Kung walang nakitang session (Guest Mode), itatago ang buong container at lalabas na sa function
   if (!isUserAuthenticated) {
     footerContainer.innerHTML = ""; // Siguraduhing malinis at walang tira
     footerContainer.style.display = "none"; // Itatago ang container element mismo
     return; 
   }
 
   // Kung authenticated ang user, ibabalik ang display sa normal at ire-render ang footer HTML
   footerContainer.style.display = "block";
 
   footerContainer.innerHTML = `
     <div class="mt-5 bg-secondary py-10 px-7 md:px-20 md:py-10">
       <h3 class="text-primary text-3xl font-semibold mb-5">Computer Grid</h3>
 
       <div id="footer-container">
         <div class="mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
           <div>
             <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Navlinks</h3>
             <ul class="flex flex-col gap-3 my-5">
               <li class="footer-links"> <a href="./index.html" class="text-primary hover:text-dark">Home</a></li>
               <li class="footer-links"><a href="./about.html" class="text-primary hover:text-dark">About</a></li>
               <li class="footer-links"><a href="./product.html" class="text-primary hover:text-dark">Products</a></li>
               <li class="footer-links"><a href="./articles.html" class="text-primary hover:text-dark">Articles</a></li>
               <li class="footer-links"><a href="./contact.html" class="text-primary hover:text-dark">Contact</a></li>
             </ul>
           </div>
 
           <div>
             <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Products</h3>
             <ul class="flex flex-col gap-3 my-5">
               <li class="footer-links"> <a href="#" class="text-primary hover:text-dark text-base">System Unit</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark text-base">Laptop</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark text-base">Monitor</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark text-base">Keyboard</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark text-base">Mouse</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark text-base">Motherboard</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark text-base">RAM</a></li>
             </ul>
           </div>
 
           <div>
             <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Products</h3>
             <ul class="flex flex-col gap-3 my-5">
               <li class="footer-links"> <a href="#" class="text-primary hover:text-dark">PSU</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark">CPU</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark">GPU</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Cooler</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Storage</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Fan</a></li>
               <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Case</a></li>
             </ul>
           </div>
 
           <div>
             <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Others Projects</h3>
             <ul class="flex flex-col gap-3 my-5">
               <li class="footer-links"> <a href="https://responsive-e-commerce-lemon.vercel.app/" class="text-primary hover:text-dark">Watch Commerce</a></li>
               <li class="footer-links"><a href="https://responsive-ecommerce-landing-page-pi.vercel.app/" class="text-primary hover:text-dark">Project 3</a></li>
               <li class="footer-links"><a href="https://phase1-data-and-toggle-ui.vercel.app/" class="text-primary hover:text-dark">Project 2</a></li>
               <li class="footer-links"><a href="https://responsive-landing-page-website.vercel.app/" class="text-primary hover:text-dark">Project 1</a></li>
               <li class="footer-links"><a href="https://multi-section-lime.vercel.app" class="text-primary hover:text-dark">Practice 2</a></li>
               <li class="footer-links"><a href="https://responsive-landing-page-psi-orcin.vercel.app/" class="text-primary hover:text-dark">Practice 1</a></li>
             </ul>
           </div>
 
           <div>
             <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Socials</h3>
             <ul class="flex flex-row flex-wrap gap-3 my-5">
               <li class="social-links"> <a href="https://github.com/Silhouette204" class="text-primary hover:text-dark"><i class="fa-brands fa-github"></i></a></li>
               <li class="social-links"><a href="https://www.facebook.com/johnlester.burce/" class="text-primary hover:text-dark"><i class="fa-brands fa-facebook"></i></a></li>
               <li class="social-links"><a href="https://x.com/JohnWhiff3419" class="text-primary hover:text-dark"><i class="fa-brands fa-square-x-twitter"></i></a></li>
               <li class="social-links"><a href="https://www.figma.com/files/team/1338002723000708316/all-projects?fuid=1338002720927057932" class="text-primary hover:text-dark"><i class="fa-brands fa-figma"></i></a></li>
               <li class="social-links"><a href="https://vercel.com/silhouette204s-projects" class="text-primary hover:text-dark text-sm">VERCEL</a></li>
               <li class="social-links"><a href="https://app.netlify.com/teams/silhouette204/projects" class="text-primary hover:text-dark text-sm">NETLIFY</a></li>
             </ul>
           </div>
         </div>
 
         <div class="my-5 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10">
           <p class="text-primary text-sm text-center md:text-left">© 2026 Computer Grid. All rights reserved.</p>
           <p class="text-primary text-sm text-center md:text-right max-w-xl">Redefining performance. Computer Grid provides premium computer hardware and custom PC builds designed for all users.</p>
         </div>
       </div>
     </div>
   `;
 }