<template>
  <div>
    <loading :active.sync="isLoading" >
    </loading>
    <Bannerimg>
      <Series :serieslist="serieslist" :currentChoice="currentChoice" @getSeries="changeCat"></Series>
    </Bannerimg>
    <div class="container-fluid productContent">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-sm-6 col-xs-12 " v-for="item in filterData" :key="item.id">
          <div class="productCard" :class="{ 'disabled':!item.is_enabled }" @click="$router.push(`/product_detail/${item.id}`)">
            <div class="soldOut" v-if="!item.is_enabled">
              <h5>售完</h5>
            </div>
            <div class="top">
              <img :src="item.imageUrl" :alt="item.title">
              <div class="tag" v-if="item.price">特價中</div>
              <i class="fas fa-heart liked" v-if="isliked(item)" @click.stop="addTowish(item)"></i>
              <i class="far fa-heart" v-else @click.stop="addTowish(item)"></i>
            </div>
            <div class="bottom">
              <h3>{{ item.title }}</h3>
              <div>
                <div class="price">NT{{ item.origin_price | currency }}</div>
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                <i class="fas fa-shopping-cart" @click.stop="addTocart(item)" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination" @switchpage="getPagination"></Pagination>
  </div>
</template>

<script>
import Bannerimg from '@/components/Bannerimg'
import Series from '@/components/Series'
import Pagination from '@/components/Pagination'

export default {
  name: 'Productlist',
  components: {
    Bannerimg,
    Series,
    Pagination
  },
  data () {
    return {
      porducts: [],
      serieslist: [],
      currentChoice: '全部商品',
      isLoading: false,
      cart: [],
      wish: [],
      status: {
        loadingItem: ''
      },
      pagination: {
        total_pages: '',
        current_page: '',
        has_pre: false,
        has_next: true
      },
      currentPagenum: 1,
      pageSum: ''
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        } else {
          vm.porducts = response.data.products
          vm.renderSerieslist()
        }
        vm.isLoading = false
      })
    },
    renderSerieslist () {
      const vm = this
      const allseries = []
      // 把所有商品列表中的類別都取出來形成一陣列，再過濾出不重複的
      vm.porducts.forEach(item => allseries.push(item.category))
      vm.serieslist = allseries.filter((element, index, arr) => arr.indexOf(element) === index)
      vm.serieslist.unshift('全部商品')
    },
    changeCat (option = '全部商品') {
      this.currentChoice = option
      this.currentPagenum = 1
    },
    addTocart (product, qty = 1) {
      const vm = this
      let productindex = -1
      vm.getCart()
      vm.status.loadingItem = product.id
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === product.id) {
            productindex = index
          }
        })
      }
      if (productindex === -1) {
        const total = parseInt((product.origin_price * qty), 10)
        vm.$set(product, 'qty', qty)
        vm.$set(product, 'total', total)
        vm.cart.push(product)
      } else {
        const tempProduct = { ...vm.cart[productindex] }
        tempProduct.qty += qty
        tempProduct.total = parseInt((product.origin_price * tempProduct.qty), 10)
        vm.cart.splice(productindex, 1)
        vm.cart.push(tempProduct)
      }
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.getCart()
      vm.$bus.$emit('message:push', '商品已加入購物車', 'success')
      vm.$bus.$emit('cart:get')// 更新導覽列上購物車清單
      vm.status.loadingItem = ''
    },
    getCart () {
      this.cart = JSON.parse(localStorage.getItem('cart')) || []
    },
    addTowish (want) {
      const vm = this
      let wishIndex = -1
      vm.getWish()
      vm.wish.forEach((item, index) => {
        if (item.id === want.id) {
          wishIndex = index
        }
      })
      if (wishIndex === -1) {
        vm.wish.push(want)
      } else {
        vm.wish.splice(wishIndex, 1)
      }
      localStorage.setItem('wish', JSON.stringify(vm.wish))
      vm.getWish()
      vm.$bus.$emit('wish:get')
    },
    getWish () {
      this.wish = JSON.parse(localStorage.getItem('wish')) || []
    },
    isliked (want) {
      const liked = this.wish.filter(item => item.id === want.id)
      if (liked.length > 0) {
        return true
      } else {
        return false
      }
    },
    getPagination (page) {
      this.currentPagenum = page
      this.pagination.current_page = this.currentPagenum
      this.pagination.total_pages = this.pageSum
      if (this.currentPagenum <= 1) {
        this.pagination.has_pre = false
      } else {
        this.pagination.has_pre = true
      }
      if (this.currentPagenum >= this.pagination.total_pages) {
        this.pagination.has_next = false
      } else {
        this.pagination.has_next = true
      }
    },
    setShows (datas) {
      const pages = Math.ceil(datas.length / 8)
      this.pageSum = pages
      this.getPagination(this.currentPagenum)
      const startNum = (parseInt(this.currentPagenum, 10) - 1) * 8
      const endNum = ((parseInt(this.currentPagenum, 10) - 1) * 8 + 8)
      return datas.slice(startNum, endNum)
    }
  },
  computed: {
    filterData () {
      let tempPro = this.porducts
      if (this.currentChoice === '全部商品') {
        tempPro = this.porducts
      } else {
        tempPro = this.porducts.filter(item => item.category === this.currentChoice)
      }
      return this.setShows(tempPro)
    }
  },
  created () {
    const vm = this
    if (vm.$route.params.series) {
      vm.currentChoice = vm.$route.params.series
    }
    // 若是上一路徑元件push此元件有參數時，參數帶著類別，則接住此參數，把該類別賦予到當前呈現類別，進而將商品列表進行過濾，呈現出對應類別的結果
    this.getProducts()
    this.getCart()
    this.getWish()
    // vm.$bus.$on('productFavor:get', () => vm.getWish());每次於導覽列中刪除慾望清單，就會重新從localstorage中取得新的慾望清單
  }
}
</script>
