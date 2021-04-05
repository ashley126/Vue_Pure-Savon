<template>
  <div>
    <loading :active.sync="isLoading" >
    </loading>
    <Bannerimg>
      <ProgressStep :current="step"></ProgressStep>
    </Bannerimg>
      <div class="container orders_check">
        <h3>{{ $t("Checkorder.step_title") }}</h3>
          <ul class="order">
            <li v-for="item in cart" :key="item.id" class="pb-3 orderList">
              <div class="row">
                <div class="col-3 p-0">
                  <div class="pro-img">
                    <img :src="item.imageUrl" :alt="item.title">
                  </div>
                </div>
                <div class="col-6 p-0">
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <div class="pro-name">{{ item.title }}</div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="numControl">
                        <button type="button" class="btn-minus" @click.prevent="changeNum(item,-1)">
                          <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                        <input class="amount" type="number" max="10" min='1' v-model="item.qty" @change="changeAmount(item,item.qty)">
                        <button type="button" class="btn-plus" @click.prevent="changeNum(item,1)">
                          <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-2 p-0">
                  <div class="pro_price">NT{{ item.origin_price|currency }}</div>
                </div>
                <div class="col-1 p-0">
                  <div class="pro_del" @click.prevent="removeCart(item)"><i class="fas fa-trash-alt"></i></div>
                </div>
              </div>
            </li>
            <li class="pt-4">
              <div class="row summary">
                <div class="col-7 p-0">共{{ cartitemqty }}件</div>
                <div class="col-2 p-0">{{ $t("Checkorder.summary") }}</div>
                <div class="col-2 p-0">NT{{ total|currency }}</div>
                <div class="col-1 p-0"></div>
              </div>
            </li>
          </ul>
          <div class="gocheck">
            <button type="button" class="btn-back" @click.prevent="$router.push('/productlist')"><i>{{ $t("Checkorder.back_btn") }}</i></button>
            <button type="button" class="btn-check" v-if="clicked===true" @click.prevent="goNextPage"><i></i>{{ $t("Checkorder.next") }}</button>
            <button type="button" class="btn-check btn_confirmcart" v-else @click.prevent="confirmCart" :class="{'doubleclick':preventDClicked === true}"><i></i>{{ $t("Checkorder.next_btn") }}</button>
          </div>
          <div class="declare">
            <div class="declare_left">{{ $t("Checkorder.warning_title") }}</div>
            <h5><i class="fas fa-exclamation-circle"></i>{{ $t("Checkorder.notice_title") }}</h5>
            <ul>
              <li>{{ $t("Checkorder.notice1") }}</li>
              <li>{{ $t("Checkorder.notice2") }}</li>
              <li>{{ $t("Checkorder.notice3") }}</li>
              <li>{{ $t("Checkorder.notice4") }}</li>
              <li>{{ $t("Checkorder.notice5") }}</li>
              <li>{{ $t("Checkorder.notice6") }}</li>
            </ul>
          </div>
      </div>
      <div class="modal fade" id="leaveWarn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-light" id="exampleModalLabel">PURE SAVON</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><i class="fas fa-exclamation-circle"></i>{{ $t("Leavemodal.notice_txt") }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-stay" data-dismiss="modal">{{ $t("Leavemodal.cancel") }}</button>
              <button type="button" class="btn btn-leave" data-dismiss="modal">{{ $t("Leavemodal.leave") }}</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
/* global $ */
import Bannerimg from '@/components/Bannerimg'
import ProgressStep from '@/components/ProgressStep'

export default {
  name: 'CheckOrders',
  components: {
    ProgressStep,
    Bannerimg
  },
  data () {
    return {
      step: 1,
      cart: [],
      cartLength: 0,
      total: 0,
      goNext: false,
      clicked: false,
      cartitemqty: 0,
      isLoading: false,
      preventDClicked: false
    }
  },
  methods: {
    getCart () {
      const vm = this
      vm.cart = JSON.parse(localStorage.getItem('cart')) || []
      vm.cartLength = vm.cart.length
      vm.total = 0
      vm.cartitemqty = 0
      vm.cart.forEach(item => {
        vm.total += item.total
        vm.cartitemqty += item.qty
      })
      if (vm.cartLength === 0) {
        vm.goNext = true
        vm.$router.push('/productlist')
      }
    },
    changeNum (product, num) {
      const qty = parseInt((product.qty + num), 10)
      this.changeAmount(product, qty)
    },
    changeAmount (product, num) {
      const vm = this
      let productIndex = -1
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === product.id) {
            productIndex = index
          }
        })
      }
      if (num >= 10) {
        vm.cart[productIndex].qty = 10
      } else if (num <= 1) {
        vm.cart[productIndex].qty = 1
      } else {
        vm.cart[productIndex].qty = num
      }
      const total = parseInt((vm.cart[productIndex].origin_price * vm.cart[productIndex].qty), 10)
      vm.cart[productIndex].total = total
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.$bus.$emit('cart:get')
      vm.getCart()
    },
    removeCart (pro) {
      const vm = this
      const index = vm.cart.indexOf(pro)
      vm.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.$bus.$emit('cart:get')
      vm.$bus.$emit('message:push', '已刪除購物車商品', 'success')
      vm.getCart()
    },
    confirmCart () { // 利用api加入後台購物車中
      const vm = this
      vm.preventDClicked = true
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.cart = JSON.parse(localStorage.getItem('cart')) || []
      vm.cart.forEach((item) => {
        const cartinfo = {
          product_id: item.id,
          qty: item.qty,
          price: item.total
        }
        vm.$http.post(api, { data: cartinfo }).then((response) => {
          if (!response.data.success) {
            vm.$bus.$emit('message:push', response.data.message, 'danger')
          }
        })
      })
      setTimeout(() => {
        vm.isLoading = false
        vm.clicked = true
      }, 1000)
    },
    goNextPage () {
      this.goNext = true
      this.$router.push('/billinginfo')
      console.log('push')
    }
  },
  beforeRouteLeave (to, from, next) {
    const vm = this
    if (vm.goNext) {
      next()
    } else {
      $('#leaveWarn').modal('show')
      $('.btn-stay').on('click', () => {
        next(false)
      })
      $('.btn-leave').on('click', () => {
        next()
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
