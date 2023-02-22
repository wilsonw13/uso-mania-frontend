export default {
  ssr: false,
  components: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
      {
        src: '/lib/progressbar.min.js',
      },
    ],
    title: '!uso mania',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/jpg', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/global.css', '~/assets/loading-bar.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/inject.js', mode: 'client', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        icons: {
          solid: true,
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  auth: {
    redirect: {
      login: '/login', // redirect user when not connected
      callback: '/beatmaps',
    },
    strategies: {
      auth0: {
        domain: 'dev-2szf794g.us.auth0.com',
        clientId: '0oJ0TBUYNgtTWAvBOxvxEW955Xy99Ld1',
        logoutRedirectUri: 'http://localhost:8080/home',
        redirect_uri: 'http://localhost:8080/home',
        audience: 'http://localhost:6000',
        scope: ['openid', 'profile', 'email', 'offline_access'],
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: 'S256',
      },
    },
  },

  serverMiddleware: ['~/api/index.ts'],

  router: {
    middleware: ['auth'],
  },

  server: {
    // host: '0.0.0.0',
    port: 8080,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
