<template>
  <div>
    <div class="container analysis">
      <h2 class="h2 text-center mt-2">報表</h2>
      <hr class="my-5">
      <div class="row" v-if='allOrders'>
        <div class="col-lg-4 col-sm-6 col-12">
          <h3 class="h3 text-center">商品總計</h3>
          <ve-pie :data='chartData1' class="pie_chart"></ve-pie>
        </div>
        <div class="col-lg-4 col-sm-6 col-12">
          <h3 class="h3 text-center">訂單狀態</h3>
          <ve-histogram :data='chartData2'></ve-histogram>
        </div>
        <div class="col-lg-4 col-sm-6 col-12">
          <h3 class="h3 text-center">營收統計</h3>
          <ve-waterfall :data='chartData3' :settings="chartSettings"></ve-waterfall>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6 col-12">
          <h3 class="h3 text-center">超過500元訂單</h3>
          <ve-liquidfill :data='chartData4'></ve-liquidfill>
        </div>
         <div class="col-lg-4 col-sm-6 col-12">
          <h3 class="h3 text-center">完成付款比例</h3>
          <ve-liquidfill :data='chartData5' :settings="chartSettings"></ve-liquidfill>
         </div>
         <div class="col-lg-4 col-sm-6 col-12">
          <h3 class="h3 text-center">訂單金額分佈</h3>
          <ve-ring :data='chartData6' :settings="chartSettings"></ve-ring>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Analysis',
  data () {
    this.chartSettings = {
      totalName: '總計',
      seriesMap: {
        已付款: {
          color: ['orange'],
          outline: {
            color: 'orange'
          }
        }
      },
      roseType: 'radius'
    }
    return {
      chartData1: {
        columns: ['系列', '商品數'],
        rows: [
          { 系列: '草本系列', 商品數: 3 },
          { 系列: '甜蜜系列', 商品數: 3 },
          { 系列: '果香系列', 商品數: 3 },
          { 系列: '經典系列', 商品數: 3 }
        ]
      },
      chartData2: {
        columns: ['訂單', '數量'],
        rows: []
      },
      chartData3: {
        columns: ['訂單狀態', '金額'],
        rows: []
      },
      chartData4: {
        columns: ['訂單', 'percent'],
        rows: [{ 訂單: '500元以上', percent: 0 }]
      },
      chartData5: {
        columns: ['訂單', 'percent'],
        rows: [{ 訂單: '已付款', percent: 0 }]
      },
      chartData6: {
        columns: ['金額', '數量'],
        rows: []
      },
      allOrders: []
    }
  },
  methods: {
    getOrders () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${1}`
      vm.$http.get(api).then((response) => {
        const pages = response.data.pagination.total_pages
        for (let i = 0; i < pages; i++) {
          vm.getOrderEachPage(i)
        }
      })
    },
    getOrderEachPage (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$http.get(api).then((response) => {
        vm.allOrders.push(...response.data.orders)
        vm.Paid()
        vm.revenue()
        vm.over500()
        vm.totaldistribution()
      })
    },
    Paid () {
      const array = [
        { 訂單: '已付款', 數量: 0 },
        { 訂單: '未付款', 數量: 0 }
      ]
      let paid = 0
      let notPaid = 0
      this.allOrders.forEach((item) => {
        if (item.is_paid) {
          paid += 1
        } else {
          notPaid += 1
        }
      })
      array[0]['數量'] = paid
      array[1]['數量'] = notPaid
      this.chartData2.rows = [...array]
      this.chartData5.rows[0].percent = paid / (paid + notPaid)
    },
    revenue () {
      let paid = 0
      let notPaid = 0
      const array = [
        { 訂單狀態: '已付款', 金額: 0 },
        { 訂單狀態: '未付款', 金額: 0 }
      ]
      this.allOrders.forEach((item) => {
        if (item.is_paid) {
          paid += item.total
        } else {
          notPaid += item.total
        }
        array[0]['金額'] = paid
        array[1]['金額'] = notPaid
        this.chartData3.rows = [...array]
      })
    },
    over500 () {
      let over = 0
      let notyet = 0
      this.allOrders.forEach((item) => {
        if (item.total > 500) {
          over += 1
        } else {
          notyet += 1
        }
      })
      this.chartData4.rows[0].percent = over / (over + notyet)
    },
    totaldistribution () {
      let over500 = 0
      let over800 = 0
      let over1000 = 0
      const array = [
        { 金額: '500元以上', 數量: 0 },
        { 金額: '800元以上', 數量: 0 },
        { 金額: '1000元以上', 數量: 0 }
      ]
      this.allOrders.forEach((item) => {
        if (item.total > 1000) {
          over1000 += 1
        } else if (item.total > 800 && item.total < 1000) {
          over800 += 1
        } else {
          over500 += 1
        }
      })
      array[0]['數量'] = over500
      array[1]['數量'] = over800
      array[2]['數量'] = over1000
      this.chartData6.rows = [...array]
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
