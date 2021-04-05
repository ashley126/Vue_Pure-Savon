<template>
  <div>
    <footer>
      <div class="container-fixed">
        <div class="row d-flex align-items-center">
          <div class="col-xs-12 contacts">
            <span class="tel">TEL:(02)2495-0933<br>service@puresavon.com.tw</span>
          </div>
          <div class="col-xs-12 socials">
            <h6>PURE & SIMPLE</h6>
            <a href="#" class="socialLink apart">LINE</a>
            <a href="#" class="socialLink apart">FACEBOOK</a>
            <a href="#" class="socialLink">INSTAGRAM</a>
          </div>
          <div class="col-xs-12 language">語言：
            <select v-model="lang" @change.prevent="setlang(lang)" class="lang_select">
              <option value="tw" selected>繁體中文</option>
              <option value="en">English</option>
            </select>
            <!-- <span class='copyRight'>&#169;僅個人作品練習無商業用途</span> -->
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Footer',
  data () {
    return {
      lang: 'tw'
    }
  },
  methods: {
    setlang (lang) {
      this.$i18n.locale = lang
      if (lang === 'en') {
        $('html').attr('lang', 'en')
      } else {
        $('html').attr('lang', 'zh-Hant-TW')
      }
    }
  }
}
</script>
