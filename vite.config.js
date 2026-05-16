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
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        article: resolve(__dirname, "article.html"),
        product: resolve(__dirname, "product.html"),
        contact: resolve(__dirname, "contact.html"),

        // PRODUCT-ITEMS
        sysUnit: resolve(__dirname, "product-sysUnit.html"),
        laptop: resolve(__dirname, "product-laptop.html")
    }
   }
  }
})
