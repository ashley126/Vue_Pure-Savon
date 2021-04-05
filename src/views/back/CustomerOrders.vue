<template>
  <div>
    <loading :active.sync="isLoading" >
    </loading>
      <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
          <div class="card border-0 shadow-sm">
            <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{ backgroundImage:`url(${product.imageUrl})` }">
            </div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
              <h5 class="card-title">
                <a href="#" class="text-dark">{{ product.title }}</a>
              </h5>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!product.price">{{ product.origin_price }}元</div>
                <del class="h6" v-if="product.price">原價{{ product.origin_price }}元</del>
                <div class="h5" v-if="product.price">現在只要{{ product.price }}元</div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getSingleProduct(product.id)">
                <i class="fas fa-money-check" v-if="status.loadingItemsingle!==product.id"></i>
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItemsingle===product.id"></i>
                  查看更多
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addToCart(product.id)">
                <i class="fas fa-shopping-cart" v-if="status.loadingItem!==product.id"></i>
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===product.id"></i>
                  加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="singleProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ singleProduct.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="singleProduct.imageUrl" class="img-fluid" :alt="singleProduct.title">
              <blockquote class="blockquote mt-3">
                <p class="mb-0">{{ singleProduct.content }}</p>
                <footer class="blockquote-footer text-right">{{ singleProduct.description }}</footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h4" v-if="!singleProduct.price">{{ singleProduct.origin_price }} 元</div>
                <del class="h6" v-if="singleProduct.price">原價 {{ singleProduct.price }} 元</del>
                <div class="h4" v-if="singleProduct.price">現在只要 {{ singleProduct.price }} 元</div>
              </div>
              <select name="" class="form-control mt-3" v-model="singleProduct.num">
                <option :value="num" v-for="num in 10" :key="num">
                  選購 {{ num }} {{ singleProduct.unit }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <div class="text-muted text-nowrap mr-3">
                小計 <strong>{{ singleProduct.price*singleProduct.num }}</strong> 元
              </div>
              <button type="button" class="btn btn-primary" @click.prevent="addToCart(singleProduct.id,singleProduct.num)"
                >
                <i class="fas fa-shopping-cart" v-if="status.loadingItem!==singleProduct.id"></i>
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===singleProduct.id"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination :pages="pagination" @switchpage="getProducts"></Pagination>
      <hr>
      <!-- 購物清單列表 -->
      <div class="row justify-content-center mt-4" >
        <div class="col-auto">
          <table class="table table-responsive">
            <thead>
              <th></th>
              <th width="120">品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody v-if="cart.carts">
              <tr v-for="item in cart.carts" :key='item.id'>
                <td><button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="delCart(item.id)"><i class="fas fa-trash-alt"></i></button></td>
                <td >{{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                <td>{{ item.final_total | floor }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>總計</td>
                <td>{{ cart.total }}</td>
              </tr>
              <tr v-if="cart.total!==cart.final_total">
                <td class="text-success">折扣價</td>
                <td class="text-success">{{ cart.final_total | floor }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" placeholder="請輸入優惠碼" v-model="coupon_code" class="form-control">
            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary" @click.prevent="addCouponCode">套用優惠碼</button>
            </div>
          </div>
          <div v-if="coupon_success"><p class="text-danger">此優惠券無效</p></div>
        </div>
      </div>
        <!-- 訂購表單 -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="handleSubmit(createOrder)">
            <div class="form-group">
              <label for="useremail">Email</label>
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors, classes }">
                <div :class="classes">
                  <input type="email" class="form-control" name="email" id="useremail"
                            v-model="form.user.email" placeholder="請輸入 Email">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <ValidationProvider rules="required" v-slot="{ errors, classes }">
                <div :class="classes">
                  <input type="text" class="form-control" name="name" id="username"
                            v-model="form.user.name" placeholder="輸入姓名">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <ValidationProvider rules="required" v-slot="{ errors, classes }">
                <div :class="classes">
                  <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <ValidationProvider rules="required" v-slot="{ errors, classes }">
                <div :class="classes">
                  <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                            placeholder="請輸入地址">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </ValidationObserver>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      pagination: {},
      products: [],
      singleProduct: {},
      isLoading: false,
      status: {
        loadingItem: '',
        loadingItemsingle: ''
      },
      cart: [],
      coupon_code: '',
      coupon_success: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    getSingleProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItemsingle = id
      vm.$http.get(api).then((response) => {
        vm.singleProduct = response.data.product
        $('#singleProductModal').modal('show')
        vm.status.loadingItemsingle = ''
      })
    },
    addToCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      vm.status.loadingItem = id
      vm.$http.post(api, { data: cart }).then((response) => {
        $('#singleProductModal').modal('hide')
        vm.getCart()
        vm.status.loadingItem = ''
      })
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data
        vm.isLoading = false
      })
    },
    delCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.$http.delete(api).then((response) => {
        vm.getCart()
      })
    },
    addCouponCode () {
      const vm = this
      const codeUsed = {
        code: vm.coupon_code
      }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$http.post(api, { data: codeUsed }).then((response) => {
        if (!response.data.success) {
          vm.coupon_success = true
        } else {
          vm.coupon_success = false
        }
        vm.getCart()
      })
    },
    createOrder () {
      const vm = this
      const order = vm.form
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      vm.$http.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/back/customer_checkout/${response.data.orderId}`)
        }
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
<style scoped>
.invalid input{
   border: 1px #EB0600 solid;
}
.valid input{
     border: 1px solid green;
}
</style>
