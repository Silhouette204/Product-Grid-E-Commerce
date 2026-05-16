export function renderFooter (){
 const footerContainer = document.querySelector("#footer");

 if(!footerContainer){
  return;
 }

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
            <li class="footer-links"><a href="./services.html" class="text-primary hover:text-dark">Services</a></li>
             <li class="footer-links"><a href="./contact.html" class="text-primary hover:text-dark">Contact</a></li>
          </ul>
       </div>

      <div>
          <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Navlinks</h3>
          <ul class="flex flex-col gap-3 my-5">
            <li class="footer-links"> <a href="#" class="text-primary hover:text-dark">Home</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">About</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Products</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Services</a></li>
             <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Contact</a></li>
          </ul>
       </div>

           <div>
          <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Others</h3>
          <ul class="flex flex-col gap-3 my-5">
            <li class="footer-links"> <a href="#" class="text-primary hover:text-dark">Home</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">About</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Products</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Services</a></li>
             <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Contact</a></li>
          </ul>
       </div>

           <div>
          <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Navlinks</h3>
          <ul class="flex flex-col gap-3 my-5">
            <li class="footer-links"> <a href="#" class="text-primary hover:text-dark">Home</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">About</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Products</a></li>
            <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Services</a></li>
             <li class="footer-links"><a href="#" class="text-primary hover:text-dark">Contact</a></li>
          </ul>
       </div>

           <div>
          <h3 class="text-xl text-primary font-semibold mt-5 mb-2 md:text-2xl">Socials</h3>
          <ul class="flex flex-row gap-3 my-5">
            <li class="social-links"> <a href="#" class="text-primary hover:text-dark"><i class="fa-brands fa-github"></i></a></li>
            <li class="social-links"><a href="#" class="text-primary hover:text-dark"><i class="fa-brands fa-facebook"></i></a></li>
            <li class="social-links"><a href="#" class="text-primary hover:text-dark"><i class="fa-brands fa-square-instagram"></i></a></li>
            <li class="social-links"><a href="#" class="text-primary hover:text-dark"><i class="fa-brands fa-square-x-twitter"></i></a></li>
             <li class="social-links"><a href="#" class="text-primary hover:text-dark"><i class="fa-brands fa-youtube"></i></a></li>
          </ul>
       </div>

      </div>

          <div class="my-5 flex justify-between items-center gap-10">
        <p class="text-primary text-sm text-center">© 2026 Computer Grid. All rights reserved.</p>

        <p class="text-primary text-sm">Redefining performance. Computer Grid provides premium computer hardware and custom PC builds designed for all users.
      </div>
    </div>
 </div>
 `
}