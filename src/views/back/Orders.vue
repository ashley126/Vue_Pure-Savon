<template>
  <div>
    <loading :active.sync="isLoading" >
    </loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="130">購買時間</th>
          <th>姓名</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
          <th width="130">詳細資訊</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.name }}</td>
          <td>
            <ul>
              <li v-for="(product,i) in item.products" :key="i">
                {{ product.product.title }}
                數量：{{ product.qty }}{{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="ispaid">已付款</span>
            <span v-else class="unpaid">未付款</span>
          </td>
          <td>
            <button type="button" class="btn btn-open btn-sm" @click.prevent="openModal(item)">查看</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @switchpage="getOrders"></Pagination>
    <div class="modal fade" id="openOrModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span class="text-light">訂單資訊</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="my-2">訂購人姓名：{{ tempOrder.user.name }}</div>
            <div class="my-2">訂單編號：{{ tempOrder.id }}</div>
            <div class="my-2">訂購日期：{{ tempOrder.create_at }}</div>
            <div class="my-2" v-if="tempOrder.is_paid">付款狀態：已付款</div>
            <div class="my-2" v-else>付款狀態：未付款</div>
            <div class="my-2">Email：{{ tempOrder.user.email }}</div>
            <div class="my-2">手機號碼：{{ tempOrder.user.tel }}</div>
            <div class="my-2">收件地址：{{ tempOrder.user.address }}</div>
            <table class="table mt-4">
              <thead>
                <tr>
                  <th width="130">品項</th>
                  <th width="80">數量</th>
                  <th width="100">單價</th>
                  <th width="110">小計</th>
                  <th width="110">優惠</th>
                  <th width="110">總計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tempOrder.products" :key="item.id">
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.qty }}</td>
                  <td>NT{{ item.product.price | currency }}</td>
                  <td>NT{{ item.total | currency }}</td>
                  <td v-if="item.hasOwnProperty('coupon')">{{ item.coupon.percent }}%</td>
                  <td v-else>未使用</td>
                </tr>
                <tr>
                  <td colspan="5">應付金額</td>
                  <td>NT{{ tempOrder.total | currency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-close" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      pagination: {},
      isLoading: false,
      orders: [],
      tempOrder: {
        user: {},
        products: {}
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      $('#openOrModal').modal('show')
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
