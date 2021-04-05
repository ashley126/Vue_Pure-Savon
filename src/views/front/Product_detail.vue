<template>
  <div class="product_detail">
    <loading :active.sync="isLoading" >
    </loading>
    <Bannerimg>
      <nav aria-label="breadcrumb" class='breadmark'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#" @click.prevent="$router.push('/')">{{ $t("Product_detail.bread_home") }}</a></li>
          <li class="breadcrumb-item"><a href="#" @click.prevent="$router.push('/productlist')">{{ $t("Product_detail.bread_store") }}</a></li>
          <li class="breadcrumb-item"><a href="#" @click.prevent="$router.push({ name:'Productlist',params:{ series:product.category } })">{{ $t("Product_detail.series") }}</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
    </Bannerimg>
    <div class="container">
      <div class="row product_info">
        <div class="col-lg-6 col-md-7">
          <div class="product_pic">
            <img :src="product.imageUrl" :alt="product.title">
          </div>
        </div>
        <div class="col-lg-6 col-md-5">
          <ul class="product_meta">
            <li>
              <h3>{{ product.title }}</h3>
            </li>
            <li>
              <p class="origin_pricesolo" v-if="!product.price">NT{{ product.origin_price | currency }}</p>
              <del class="origin_price" v-if="product.price">NT{{ product.origin_price|currency }}</del>
            </li>
            <li>
              <p class="salesprice" v-if="product.price">NT{{ product.price | currency }}</p>
            </li>
            <li>
              <div class="numControl">
                <button type="button" class="btn-minus" data-quantity="minus" data-field="quantity" @click.prevent="changeNum(-1)">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                <input class="amount" type="number" max="10" min="1" v-model="productnum" @change="changeAmount(productnum)">
                <button type="button" class="btn-plus" data-quantity="plus" data-field="quantity" @click.prevent="changeNum(1)">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
              <button type="button" class="btn-cart" @click.prevent="addToCart(product,productnum)"><i class="fas fa-shopping-cart"></i>加入購物車</button>
            </li>
            <li>
              <p class="product_des">{{ product.description }}</p>
            </li>
            <li>
              <p class="product_con">{{ product.content }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="product_intro">
        <h4 class="mb-4 h4">{{ $t("Product_detail.howtouse_title") }}</h4>
        <p>{{ $t("Product_detail.howtouse") }}</p>
        <h4 class="mb-4 h4">{{ $t("Product_detail.warning_title") }}</h4>
        <p>{{ $t("Product_detail.warning") }}</p>
        <h4 class="mb-4 h4">{{ $t("Product_detail.notice_title") }}</h4>
        <div class="notice">
          <div class="return">
            <h4 class="notice_title"><i class="fas fa-exclamation-triangle"></i>{{ $t("Product_detail.noticesub1") }}<i class="fas fa-exclamation-triangle"></i></h4>
            <p class="notice_txt">{{ $t("Product_detail.noticesub1_con") }}</p>
          </div>
          <div class="aware">
            <h4 class="notice_title"><i class="fas fa-exclamation-triangle"></i>{{ $t("Product_detail.noticesub2") }}<i class="fas fa-exclamation-triangle"></i></h4>
            <p class="notice_txt">{{ $t("Product_detail.noticesub2_con") }}</p>
          </div>
          <div class="ship">
            <h4 class="notice_title"><i class="fas fa-exclamation-triangle"></i>{{ $t("Product_detail.noticesub3") }}<i class="fas fa-exclamation-triangle"></i></h4>
            <p class="notice_txt">{{ $t("Product_detail.noticesub3_con") }}</p>
          </div>
        </div>
      </div>
      <div class="related">
        <h3>{{ $t("Product_detail.related") }}</h3>
        <hr>
        <div class="related_content row">
          <div class="col-md-4 col-sm-6 col-12 d-flex justify-content-start align-item-center"  v-for="item in filterSimilars" :key="item.id">
            <div class="productCard" @click.prevent="goRelated(item.id)">
              <div class="top">
                <img :src="item.imageUrl" :alt="item.title">
                <div class="tag">特價中</div>
              </div>
              <div class="bottom">
                <h3>{{ item.title }}</h3>
                <div class="price">NT${{ item.origin_price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Bannerimg from '@/components/Bannerimg'

export default {
  name: 'Product_detail',
  components: {
    Bannerimg
  },
  data () {
    return {
      product: [],
      productId: '',
      similarproducts: [],
      productnum: 1,
      cart: [],
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      const vm = this
      vm.productId = vm.$route.params.product_id
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product
        vm.productnum = 1
        vm.isLoading = false
      })
    },
    getSimilarproducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((response) => {
        vm.similarproducts = response.data.products
      })
    },
    getCart () {
      const vm = this
      vm.cart = JSON.parse(localStorage.getItem('cart')) || []
    },
    addToCart (product, qty = 1) {
      const vm = this
      let productIndex = -1
      vm.getCart()
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === product.id) {
            productIndex = index
          }
        })
      }
      if (productIndex === -1) {
        const total = parseInt((product.origin_price * qty), 10)
        vm.$set(product, 'total', total)
        vm.$set(product, 'qty', qty)
        vm.cart.push(product)
      } else {
        const tempProduct = { ...vm.cart[productIndex] }
        tempProduct.qty += qty
        const total = parseInt((tempProduct.origin_price * tempProduct.qty), 10)
        tempProduct.total = total
        vm.cart.splice(productIndex, 1)
        vm.cart.push(tempProduct)
      }
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.$bus.$emit('message:push', '商品已加入購物車', 'success')
      vm.$bus.$emit('cart:get')
      vm.getCart()
    },
    changeNum (qty) {
      const amount = this.productnum + qty
      this.changeAmount(amount)
    },
    changeAmount (num) {
      const qty = num
      if (qty >= 10) {
        this.productnum = 10
      } else if (qty <= 1) {
        this.productnum = 1
      } else {
        this.productnum = qty
      }
    },
    goRelated (id) {
      this.$router.push(`/product_detail/${id}`)
      this.getProduct()// 轉換至對應商品的路徑，並且接住商品id參數，從api取得該商品資料，呈現於畫面上
    },
    accordion (e) {
      const { currentTarget } = e
      $(currentTarget).toggleClass('active')
      $(currentTarget).parent().find('.notice_txt').slideToggle()
      $(currentTarget).parent().siblings().find('.notice_txt').slideUp()
      $(currentTarget).parent().siblings().find('.notice_title').removeClass('active')
    }
  },
  computed: {
    filterSimilars () {
      const vm = this
      return vm.similarproducts.filter(item => (item.id !== vm.productId) && (item.category === vm.product.category) && (item.is_enabled))
    }
  },
  created () {
    this.getProduct()
    this.getSimilarproducts()
    this.getCart()
  }
}
</script>
