<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button type="button" class="btn btn-primary mb-3" @click.prevent="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="150">折扣百分比</th>
          <th width="140">到期日</th>
          <th width="120">是否啟用</th>
          <th width="140">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button type="button" class="btn btn-open btn-sm" @click.prevent="openCouponModal(false,item)">編輯</button>
            <button type="button" class="btn btn-delete btn-sm" @click.prevent="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @switchpage="getCoupon"></Pagination>
    <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code" v-model="tempCoupon.code" placeholder="請輸入優惠碼編號">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="tempCoupon.due_date">
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input type="number" class="form-control" id="percent" v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                      是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-open" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click.prevent="del">確認刪除</button>
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
      coupons: [],
      isLoading: false,
      pagination: {},
      isNew: false,
      tempCoupon: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getCoupon (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    openDelModal (item) {
      this.tempCoupon = item
      $('#delCouponModal').modal('show')
    },
    del () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.delete(api).then((response) => {
        $('#delCouponModal').modal('hide')
        vm.getCoupon()
      })
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupon()
        } else {
          $('#couponModal').modal('hide')
        }
      })
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
