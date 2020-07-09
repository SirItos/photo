export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - Место твоих свиданий',
    title: 'BazaBab',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' }],
    script: [
      {
        src: '/js/pixel.js'
      },
      {
        src: '/js/yandex.js'
      }
    ]
  },
  router: {},

  loading: { color: '#FF473A' },
  /*
   ** Global CSS
   */
  css: ['~/assets/app.scss', 'swiper/dist/css/swiper.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/cluster.js', mode: 'client' },
    { src: '~/plugins/swiper.js', mode: 'client' },
    { src: '~/plugins/clientInit.js', mode: 'client' },
    { src: '~/plugins/axios.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-leaflet',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: false,
        language: 'ru-Ru',
        siteKey: '6LeFF-MUAAAAAOOm_u2BLz2V90S0WNor7SmFc0iR', // Site key for requests
        version: 3 // Version
        // size: 'compact' // Size: 'compact', 'normal', 'invisible' (v2)
      }
    ]
  ],
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://photo/api'
        : 'https://back.bazabab.ru/api',
    progress: false
  },
  //http://photo/api
  //https://back.bazabab.ru/api
  generate: {
    // routes: ['/detail/1']
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]]
      }
    }
  },
  pwa: {
    manifest: {
      name: 'Место твоих свиданий',
      short_name: 'Место свиданий',
      description: 'nuxt project not for free',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#FF473A',
      required_features: ['geolocation']
    }
  }
}
