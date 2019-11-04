import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - Место твоих свиданий',
    title: 'Место твоих свиданийы',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  router: {
    middleware: 'toolbar'
  },

  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/cluster.js', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-leaflet', '@nuxtjs/axios'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

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
    extend(config, ctx) {}
  }
}
