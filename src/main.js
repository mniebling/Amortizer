import Vue from 'vue'
import App from './app.vue'

import 'normalize-css'

new Vue(
  { el: '#app'
  , render: function (createElement) {
      return createElement(App)
    }
  }
)
