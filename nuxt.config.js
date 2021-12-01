export default {
  env: {
    baseUrl:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : "http://54.254.180.229",
    apiUrl:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:8000"
        : "http://54.251.180.39"
  },

  dev: process.env.NODE_ENV !== "production",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "UjiAja NuxtJs",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-tiny-slider.js", mode: "client" },
    { src: "~/plugins/axios.js", mode: "client" },
    { src: "~/plugins/custom-mixins.js", mode: "client" },
    { src: "~/plugins/star-rating.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",

    // cookie
    ["cookie-universal-nuxt", { alias: "cookiz" }],

    // vue2-editor
    "vue2-editor/nuxt"
  ],

  bootstrapVue: {
    icons: true
  },

  axios: {
    baseURL:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:8000"
        : "http://54.251.180.39" // Used as fallback if no runtime config is provided
  },

  // server
  server: {
    port: 7000, // default : 3000
    host: "0.0.0.0"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layouts: true
    },
    // babel: {
    //   compact: true
    // }
  }
};
