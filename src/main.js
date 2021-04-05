import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import './bus'
import jquery from 'jquery'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { required, email } from 'vee-validate/dist/rules'
import i18n from './i18n/i18n-lang.js'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
import VCharts from 'v-charts'
import currencyfilter from './filters/currency'
import dateString from './filters/date'
import Floor from './filters/floor'
import focus from './filters/V-focus'
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.use(VueAxios, axios)
Vue.use(VCharts)
Vue.component('Loading', Loading)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
localize('zh_TW', zhTW)
Vue.filter('currency', currencyfilter)
Vue.filter('date', dateString)
Vue.filter('floor', Floor)
Vue.directive('focus', focus)
AOS.init()

Vue.config.productionTip = false
axios.defaults.withCredentials = true
window.$ = jquery

for (const rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhTW.messages[rule] // add its message
  })
};

configure({
  classes: {
    valid: 'valid',
    invalid: 'invalid'
  }
})
extend('required', {
  ...required,
  message: '此欄位不可為空'
})
extend('email', {
  ...email,
  message: '郵件地址不正確'
})
extend('phone', {
  validate: value => {
    const reg = /^09[0-9]{8}$/
    return reg.test(value)
  },
  message: '請輸入正確號碼'
})
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
