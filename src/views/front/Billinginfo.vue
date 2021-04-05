<template>
  <div class="billinginfo">
    <Bannerimg>
      <ProgressStep :current="step"></ProgressStep>
    </Bannerimg>
    <div class="container_fix">
      <h3>{{ $t("Billinginfo.step_title") }}</h3>
        <div class="row mb-4">
          <div class="col-12 col-md-5">
            <ul class="order">
              <li v-for="item in carts.carts" :key="item.id" class="pb-3 orderList">
                <div class="row">
                  <div class="col-3 p-0">
                    <div class="pro-img">
                      <img :src="item.product.imageUrl" :alt="item.product.title">
                    </div>
                  </div>
                  <div class="col-7 p-0">
                    <div class="row m-0 w-100">
                      <div class="col-12 col-md-8">
                        <div class="pro-name">{{ item.product.title }}</div>
                      </div>
                      <div class="col-12 col-md-4">
                        <div class="pro_qty">x{{ item.qty }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-2 p-0">
                    <div class="pro_price" v-if="!item.price">NT{{ item.product.origin_price|currency }}</div>
                    <div class="pro_price" v-else>NT{{ item.product.price|currency }}</div>
                  </div>
                </div>
              </li>
              <li class="pt-4">
                <div class="row summary">
                  <div class="col-6 p-0">共{{ cartLength }}項</div>
                  <div class="col-2 p-0">{{ $t("Billinginfo.summary") }}</div>
                  <div class="col-3 p-0">NT{{ carts.final_total | floor |currency }}</div>
                  <div class="col-1 p-0"></div>
                </div>
              </li>
            </ul>
            <div class="my-4 coupon">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="請輸入優惠代碼" v-model="coupon_num">
                <div class="input-group-append">
                  <span class="input-group-text coupon-send" @click.prevent="addCouponCode">{{ $t("Billinginfo.coupon_sub") }}</span>
                </div>
              </div>
              <div v-if="!coupon_success"><p class="text-danger">{{ $t("Billinginfo.coupon_failed") }}</p></div>
              </div>
          </div>
          <div class="col-12 col-md-7">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form class="buyer_infos" @submit.prevent="handleSubmit(createOrder)">
                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label for="buyer-name">
                      {{ $t("Billinginfo.form_name") }}<span class="marker">*</span>
                    </label>
                    <ValidationProvider rules="required" v-slot="{ errors , classes }">
                      <div :class="classes">
                        <input type="text" id="buyer-name" class="form-control" placeholder="請輸入姓名" v-model="form.user.name">
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-sm-6">
                    <label for="buyer-tel">
                      {{ $t("Billinginfo.form_tel") }}<span class="marker">*</span>
                    </label>
                    <ValidationProvider rules="required|phone" v-slot="{ errors , classes }">
                      <div :class="classes">
                        <input type="text" id="buyer-tel" class="form-control" placeholder="請輸入電話號碼" v-model="form.user.tel">
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label for="buyer-email">Email<span class="marker">*</span>
                    </label>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors , classes }">
                      <div :class="classes">
                        <input type="email" class="form-control" name="email" id="buyer-email" placeholder="請輸入 Email" v-model="form.user.email">
                          <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-sm-6">
                    <div>
                      <label for="buyer-pay">{{ $t("Billinginfo.form_pay") }}</label>
                        <select name="payment" id="buyer-pay" class="form-control" v-model="form.user.payment">
                          <option value="CVS">{{ $t("Billinginfo.pay_op1") }}</option>
                          <option value="CTP">{{ $t("Billinginfo.pay_op2") }}</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="buyeraddress">{{ $t("Billinginfo.form_adr") }}<span class="marker">*</span>
                  </label>
                  <ValidationProvider rules="required" v-slot="{ errors , classes }">
                    <div :class="classes">
                      <input type="text" class="form-control" name="address" id="buyeraddress" placeholder="請輸入地址" v-model="form.user.address">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="comment">{{ $t("Billinginfo.form_comment") }}</label>
                  <textarea name="" id="comment" class="form-control" cols="10" rows="3" v-model="form.message" placeholder="歡迎輸入想對我們說的話"></textarea>
                </div>
                <div class="sub_order">
                  <button class="btn-order" type="submit" :class="{'disabled': clicked===true}">{{ $t("Billinginfo.next_btn") }}</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
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
  name: 'Billinginfo',
  data () {
    return {
      step: 2,
      carts: [],
      cartactual: [],
      cartLength: 0,
      coupon_num: '',
      coupon_success: true,
      clicked: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: 'CVS'
        },
        message: ''
      },
      goNext: false
    }
  },
  components: {
    Bannerimg,
    ProgressStep
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.carts = response.data.data
          vm.cartactual = response.data.data.carts
          vm.cartLength = 0
          vm.cartactual.forEach(item => {
            vm.cartLength += item.qty
          })
        }
      })
    },
    addCouponCode () {
      const vm = this
      const coupon = { code: vm.coupon_num }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.coupon_success = true
          vm.$bus.$emit('message:push', '成功套用2020週年慶優惠券', 'success')
        } else {
          vm.coupon_success = false
        }
      })
      vm.getCart()
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.clicked = true
      vm.$http.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          vm.goNext = true
          vm.$router.push(`/checkout/${response.data.orderId}`)
          localStorage.removeItem('cart')
          vm.$bus.$emit('cart:get')
        }
      })
    },
    removeCart () {
      const vm = this
      vm.getCart()
      vm.carts.carts.forEach((item) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
        vm.$http.delete(api).then((response) => {
          vm.$bus.$emit('message:push', response.data.message, 'success')
        })
      })
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
        vm.removeCart()
        next()
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
<style scoped>
.invalid input, .invalid textarea{
   border: 1px #EB0600 solid;
}
.valid input, .valid textarea{
    border: 1px #34495E solid;
}
</style>
