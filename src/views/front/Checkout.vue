<template>
  <div>
    <loading :active.sync="isLoading" >
    </loading>
    <Bannerimg>
      <ProgressStep :current="step"></ProgressStep>
    </Bannerimg>
    <div class="container checkOut">
      <h3>{{ $t("Checkout.orderInfo") }}</h3>
      <div class="row listRow">
        <div class="col-md-6 col-12">
          <ul class="order">
            <li><p>{{ $t("Checkout.orderDate") }} - {{ order.create_at | date }}</p></li>
            <li class="orderList" v-for='item in order.products' :key='item.id'>
              <div class="row">
                <div class="col-6 p-0">
                  <div class="pro-title" @click.prevent="$router.push(`/product_detail/${item.product.id}`)">{{ item.product.title }}</div>
                </div>
                <div class="col-2 p-0">
                  <div class="pro-qty">x{{ item.qty }}</div>
                </div>
                <div class="col-4 p-0">
                  <div class="pro-price">NT{{ item.final_total / item.qty | floor | currency }}</div>
                </div>
              </div>
            </li>
            <li class="pt-2 summaryBlock">
              <div class="row summaryList">
                <div class="col-8 p-0 summary">{{ $t("Checkout.summary") }}</div>
                <div class="col-4 p-0 summary">NT{{ order.total | currency }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-6 col-12">
          <div class="order_info">
            <table class="table">
              <tr>
                <td class="title">{{ $t("Checkout.name") }}</td>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <td class="title">{{ $t("Checkout.telephone") }}</td>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <td class="title">Email</td>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <td class="title">{{ $t("Checkout.address") }}</td>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <td class="title">{{ $t("Checkout.order_pay") }}</td>
                <td v-if='order.user.payment==="CVS"'>{{ $t("Checkout.order_op1") }}</td>
                <td v-if='order.user.payment==="CTP"'>{{ $t("Checkout.order_op2") }}</td>
              </tr>
              <tr>
                <td class="title">{{ $t("Checkout.paid_condition") }}</td>
                <td v-if='!order.is_paid' class="incomplete">{{ $t("Checkout.not_paid") }}</td>
                <td v-else class="complete">{{ $t("Checkout.paid") }}</td>
              </tr>
            </table>
            <div class="endpay">
              <button type="button" v-if="!order.is_paid" @click.prevent="completePay">{{ $t("Checkout.go_paid") }}</button>
              <button type="button" v-else @click.prevent="$router.push('/productlist')">{{ $t("Checkout.backtoshop") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="endPayModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" >
            <h5 class="modal-title">PURE SAVON</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-3 d-flex align-items-center justify-content-center">
            <i class="fas fa-clipboard-check"></i>
            <h3 class='ml-2'>{{ $t("Checkout.checkoutModal1") }}<br>{{ $t("Checkout.checkoutModal2") }}</h3>
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
  name: 'Checkout',
  components: {
    Bannerimg,
    ProgressStep
  },
  data () {
    return {
      step: 3,
      isLoading: false,
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.order = response.data.order
        }
        vm.isLoading = false
      })
    },
    completePay () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder()
          $('#endPayModal').modal('show')
        } else {
          vm.$bus.$emit('message:push', '付款失敗', 'danger')
        }
        vm.isLoading = false
      })
    }
  },
  created () {
    this.orderId = this.$route.params.order_id
    this.getOrder()
  }
}
</script>
