// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import VueScrollTo from 'vue-scrollto'
import VueClipboard from 'vue-clipboard2'
import DefaultLayout from '~/layouts/Default.vue'
import { i18nOptions } from './i18n'

// import vuetify styles
import 'vuetify/dist/vuetify.min.css'

export default async function(Vue, { appOptions, router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })

  const vuetifyOptions = {
    lang: {
      t: (key, ...params) => i18n.t(key, params)
    },
    theme: {
      primary: '#10182F',
      secondary: '#182445',
      accent: '#A8E5A3',
      error: '#DD543B',
      info: '#70B4DF',
      success: '#4CAE79',
      warning: '#FFC533'
    }
  }

  Vue.config.productionTip = false

  // register plug-ins
  Vue.use(VueI18n)
  Vue.use(VueScrollTo)
  Vue.use(VueClipboard)
  Vue.use(Vuetify)

  appOptions.i18n = new VueI18n(i18nOptions)

  appOptions.vuetify = new Vuetify(vuetifyOptions)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
