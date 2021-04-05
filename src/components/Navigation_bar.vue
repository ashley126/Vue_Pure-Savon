<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-total fixed-top">
      <div class="container-fluid">
        <nav class="navbar">
          <router-link class="nav-title" to="/"><i class="fas fa-praying-hands"></i>Pure Savon</router-link>
        </nav>
        <div class="d-flex justify-content-end navContent">
          <div class="dropdown">
            <button type="button" class="btn-store" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <router-link to="/productlist"><i class="fas fa-store"></i><span class="d-none d-md-inline-block" style="font-size:1.1rem align-self-center">{{ $t("Navigation_bar.goshop") }}</span></router-link>
            </button>
          </div>
          <div class="dropdown ml-md-5 ml-1">
            <button type="button" :class="{'disabled':avoidClick}" class="btn-heart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="wishList">
              <i class="fas fa-heart"></i>
              <span class="badge" v-if="wishlength||wishlength!==0">{{ wishlength }}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-width p-2" aria-labelledby="wishList">
              <h4 class="mb-2" v-if="wishlength||wishlength!==0">{{ $t("Navigation_bar.wishlist") }}</h4>
              <h4 v-else>{{ $t("Navigation_bar.wish_notice") }}</h4>
              <table class="table-cart table">
                <tbody>
                  <tr class="pb-0" v-for="item in wish" :key="item.id">
                    <td width="10%"><i class="fas fa-shopping-cart" @click.prevent="addTocart(item)"></i></td>
                    <td><div style="width:3rem;height:3rem"><img  class="img-fluid" :src="item.imageUrl" :alt="item.title"></div></td>
                    <td width="50%" @click.prevent='$router.push(`/product_detail/${item.id}`)' class="wish_title">{{ item.title }}</td>
                    <td width="10%"><span class="close" @click.prevent="removeWish(item)">X</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="dropdown ml-md-5">
            <button type="button" :class="{'disabled':avoidClick}" class="btn-cart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="cartList">
              <i class="fas fa-shopping-cart"></i><span class="badge" v-if="cartLength || cartLength !== 0">{{ cartLength }}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-width p-2" aria-labelledby="cartList">
              <h4 class="mb-2">{{ $t("Navigation_bar.cart") }}</h4>
              <p v-if="!cartLength || cartLength === 0">{{ $t("Navigation_bar.cart_notice") }}</p>
              <table class="table-cart table">
                <tbody>
                  <tr class='pb-0' v-for='item in cart' :key='item.id'>
                    <td><div style="width:3rem;height:3rem"><img  class="img-fluid" :src="item.imageUrl" :alt="item.title"></div></td>
                    <td @click.prevent='$router.push(`/product_detail/${item.id}`)' class='wish_title'>{{ item.title }}</td>
                    <td>x{{ item.qty }}</td>
                    <td>{{ item.origin_price | currency }}</td>
                    <td><span class='close' @click.prevent='removeCart(item.id)'>X</span></td>
                  </tr>
                </tbody>
              </table>
              <div class="totalinfo">
                <div style="display:inline-block" class="px-4" v-if="cartLength || cartLength !== 0">{{ $t("Navigation_bar.total") }}</div>
                <div class="totalnum" style="display:inline-block" v-if="cartLength || cartLength !== 0">{{ total | currency }}</div>
                <div class="btn btn-goCart" v-if="!cartLength || cartLength === 0" @click.prevent="$router.push('/productlist')">{{ $t("Navigation_bar.gotoshop") }}</div>
                <div class="btn btn-goCart" v-else @click.prevent="$router.push('/checkorders')">{{ $t("Navigation_bar.gocheck") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Navigation_bar',
  data () {
    return {
      isClose: false,
      cartLength: 0,
      cart: [],
      total: 0,
      wish: [],
      wishlength: 0
    }
  },
  methods: {
    getCart () {
      const vm = this
      vm.cart = JSON.parse(localStorage.getItem('cart')) || []
      vm.total = 0
      vm.cartLength = 0
      vm.cart.forEach((item) => {
        vm.total += item.total
        vm.cartLength += item.qty
      })
    },
    getWish () {
      const vm = this
      vm.wish = JSON.parse(localStorage.getItem('wish')) || []
      vm.wishlength = vm.wish.length
    },
    addTocart (product, qty = 1) {
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
        vm.$set(product, 'qty', qty)
        vm.$set(product, 'total', total)
        vm.cart.push(product)
      } else {
        const tempProduct = { ...vm.cart[productIndex] }
        tempProduct.qty += qty
        const total = parseInt((product.origin_price * tempProduct.qty), 10)
        tempProduct.total = total
        vm.cart.splice(productIndex, 1)
        vm.cart.push(tempProduct)
      }
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.getCart()
      vm.$bus.$emit('message:push', '商品已加入購物車', 'success')
    },
    removeCart (id) {
      const vm = this
      let removingIndex = -1
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === id) {
            removingIndex = index
          }
        })
      }
      vm.cart.splice(removingIndex, 1)
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.getCart()
    },
    removeWish (want) {
      const index = this.wish.indexOf(want)
      this.wish.splice(index, 1)
      localStorage.setItem('wish', JSON.stringify(this.wish))
      this.getWish()
    }
  },
  computed: {
    avoidClick () {
      if (this.$route.path === '/checkorders' || this.$route.path === '/billinginfo') {
        $('#wishList').dropdown('hide')
        $('#cartList').dropdown('hide')
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.getCart()
    this.$bus.$on('cart:get', () => this.getCart())
    this.getWish()
    this.$bus.$on('wish:get', () => this.getWish())
  }
}
</script>
