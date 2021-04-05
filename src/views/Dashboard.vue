<template>
  <div>
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Alert from '@/components/AlertMessage'
// 以上三個元件是dashboard組成子元件，而router-view則是會動態根據sidebar的link切換的子元件之呈現處

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)pureSavonToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
  }
}
</script>
