var webpack = require('webpack')

export default {
    env: {
        baseUrl: process.env.NODE_ENV !== "production" ?
            "http://localhost:7000" : "https://ujiaja.com",
        apiUrl: process.env.NODE_ENV !== "production" ?
            "http://localhost:8000" : "https://api.ujiaja.com"
    },

    dev: process.env.NODE_ENV !== "production",

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Ujiaja.com',
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
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
            },
            {
                rel: "stylesheet",
                href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            }
        ],
        script: [{
                src: 'https://apis.google.com/js/platform.js',
            },
            {
                src: "https://accounts.google.com/gsi/client"
            }
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@/assets/main.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "~/plugins/vue-tiny-slider.js", mode: "client" },
        { src: "~/plugins/axios.js", mode: "client" },
        { src: "~/plugins/custom-mixins.js", mode: "client" },
        { src: "~/plugins/star-rating.js", mode: "client" },
        { src: "~/plugins/editor.js", mode: "client" },
        { src: "~/plugins/vue-select.js", mode: "client" },
        { src: "~/plugins/fb-sdk.js", mode: "client" },

    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/auth-next'
    ],

    auth: {
        strategies: {
          google: {
            clientId: '563050428836-bvbrqscdcd756mkj15jr8vf765gngtie.apps.googleusercontent.com',
            redirectUri: 'http://localhost:7000/auth/google-callback',
            scope: ['openid', 'profile', 'email'],
            codeChallengeMethod: '',
            responseType: 'token id_token',
            // endpoints: {
            //   token: 'http://localhost:8000/api/user/google/', // your backend url to resolve your auth with google and give you the token back
            //   userInfo: 'http://localhost:8000/users/' // your endpoint to get the user info after you received the token
            // },
          },
          facebook: {
            endpoints: {
              userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
            },
            clientId: '1092346238057732',
            scope: ['public_profile', 'email']
          },
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        "bootstrap-vue/nuxt",
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",

        // cookie
        ["cookie-universal-nuxt", { alias: "cookiz" }],

        // vue2-editor
        // "vue2-editor/nuxt",

        "nuxt-highcharts"
    ],

    highcharts: {
        /* module options */
    },

    bootstrapVue: {
        icons: true
    },

    axios: {
        // proxy: true,
        baseURL: process.env.NODE_ENV !== "production" ?
            "http://localhost:8000" : "https://api.ujiaja.com" // Used as fallback if no runtime config is provided
    },

    // proxy: {
    //   '/api/': { target: 'https://api.example.com/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
    // },

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
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            })
        ]
    }
};
