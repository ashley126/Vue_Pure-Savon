import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './lang/en.json'
import tw from './lang/tw.json'
Vue.use(VueI18n)
const messages = {
  en, tw
}
const i18n = new VueI18n({
  locale: 'tw',
  messages
  // this.$i18n.locale // 通過切換locale的值來實現語言切換
})
export default i18n
