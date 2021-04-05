<template>
  <div>
    <div class="toTop" @click="scrollTop">
      <i class="fas fa-angle-double-up"></i>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Totop',
  methods: {
    scrollTop () {
      $('html,body').animate({ scrollTop: 0 }, 555)
    },
    autoTop () {
      if ($(window).scrollTop() > 300) {
        $('.toTop').fadeIn(222)
      } else {
        $('.toTop').stop().fadeOut(222)
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.autoTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.autoTop)
  }
}
</script>
