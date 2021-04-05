<template>
  <div>
    <div class="container-fluid layout px-0">
      <Navbar/>
      <Alert/>
      <transition mode="out-in" name="fade">
        <router-view :key="$router.fullPath" class="content"></router-view>
      </transition>
      <Totop/>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navigation_bar'
import Footer from '@/components/Footer'
import Alert from '@/components/AlertMessage'
import Totop from '@/components/Totop'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Alert,
    Footer,
    Totop
  }
}
</script>
<style lang="scss" scoped>
.layout{
    min-width:320px;
    margin:0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
}
.layout .content{
  min-height: 100%;
}
.input{
    outline:0;
}
.fade-enter{
    opacity: 0;
}
.fade-enter-to{
    opacity: 1;
}
.fade-enter-active{
    transition:opacity 0.4s;
}
.fade-leave{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
}
.fade-leave-active{
    transition:opacity 0.4s;
}
</style>
