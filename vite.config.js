import {defineConfig} from "vite";
import tailwindcss from "@tailwindcss/vite";

//pag meron ka ng mga subfolders at mahirap na kasi malayo sya sa main folder so hindi connected ang design at logic so need natin magkaroon ng tulad sa main at subfolder para magamit padin
//or pwede din ito for modern path finding so kailangan masanay ka dito
import { resolve } from "path"; // <--- DAGDAGAN ITO
import { fileURLToPath } from "url"; // <--- PARA SA MODERN JS

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig ({

   base: "./",

  plugins: [
    tailwindcss()
  ],

  build:{
   rollupOptions:{
    input:{
      //Navigations
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        article: resolve(__dirname, "article.html"),
        product: resolve(__dirname, "product.html"),
        contact: resolve(__dirname, "contact.html"),
        order: resolve(__dirname, "order.html"),
        archive: resolve(__dirname, "archive.html"),
        signIn: resolve(__dirname, "sign-in.html"),
        signUp: resolve(__dirname, "sign-up.html"),
        forgotPassword: resolve(__dirname, "forgot-password.html"),
        profile: resolve(__dirname, "profile.html"),

        // PRODUCT-ITEMS
        sysUnit: resolve(__dirname, "product-sysUnit.html"),
        laptop: resolve(__dirname, "product-laptop.html"),
        keyboard: resolve(__dirname, "product-keyboard.html"),
        mouse: resolve(__dirname, "product-mouse.html"),
        motherboard: resolve(__dirname, "product-motherboard.html"),
        ram: resolve(__dirname, "product-ram.html"),
        psu: resolve(__dirname, "product-psu.html"),
        cpu: resolve(__dirname, "product-cpu.html"),
        gpu: resolve(__dirname, "product-gpu.html"),
        cooler: resolve(__dirname, "product-cooler.html"),
        storage: resolve(__dirname, "product-storage.html"),
        fan: resolve(__dirname, "product-fan.html"),
        "case": resolve(__dirname, "product-case.html")
    }
   }
  }
})
