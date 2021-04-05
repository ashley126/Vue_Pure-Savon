<template>
  <div class='home'>
    <header class="container-fluid px-0">
        <div class="carousel slide carousel-fade" data-ride="carousel" data-pause="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../../assets/images/thanos-pal-v_Cc1qxKuBsmin.jpg" alt="純粹，從未改變的初衷，獻給渴望簡單的你">
              <div class="slide-box"></div>
              <h2>{{ $t("Carousel.slogan1") }}·Pure Savon</h2>
              <h3>{{ $t("Carousel.detail1") }}
              </h3>
              <p>{{ $t("Carousel.subscribe") }}</p>
              <button type="button" class="carousel-btn" @click.prevent='$router.push("/productlist")'>{{ $t("Carousel.goshopping") }}</button>
            </div>
            <div class="carousel-item">
              <img src="../../assets/images/duncan-kidd-uwFjCwhXMhE-compress.jpg" alt="天然，一口芳香氣息，致大地最原始的氣息">
              <div class="slide-box"></div>
              <h2>{{ $t("Carousel.slogan2") }}·Pure Savon</h2>
              <h3>{{ $t("Carousel.detail2") }}
              </h3>
              <p>{{ $t("Carousel.subscribe") }}</p>
              <button type="button" class="carousel-btn" @click.prevent='$router.push("/productlist")'>{{ $t("Carousel.goshopping") }}</button>
            </div>
            <div class="carousel-item">
              <img src="../../assets/images/thanos-pal-8PWY6aTanhQ-unsplash.jpg" alt="獨特，與肌膚調和，只屬於你的專有香味">
              <div class="slide-box"></div>
              <h2>{{ $t("Carousel.slogan3") }}·Pure Savon</h2>
              <h3>{{ $t("Carousel.detail3") }}
              </h3>
              <p>{{ $t("Carousel.subscribe") }}</p>
              <button type="button" class="carousel-btn" @click.prevent='$router.push("/productlist")'>{{ $t("Carousel.goshopping") }}</button>
            </div>
          </div>
        </div>
        <div class="scrolldown">
          <a href="#series" @click.prevent="scrollIntoView('#series')"><i class="fas fa-angle-double-down"></i></a>
        </div>
    </header>
    <section class="allseries" id="series">
      <div class="container-fluid px-0 mx-0">
        <div class="seriestop">
          <h3>全系列
            <span>All Series</span>
          </h3>
          <div class="row d-flex justify-content-center align-items-center series-group">
            <div class="col-12 col-md-6 p-0">
              <div class="seriesItem" @click.prevent="$router.push({name:'Productlist',params:{series:'草本系列'}})">
                <img src="../../assets/images/nipanan-lifestyle-pV2xU2rP580-unsplash.jpg" alt="草本系列">
                <p>{{ $t("Series.series1") }}</p>
              </div>
            </div>
            <div class="col-12 col-md-6 p-0">
              <div class="seriesItem" @click.prevent="$router.push({name:'Productlist',params:{series:'甜蜜系列'}})">
                <img src="../../assets/images/vera-cho-10SLUJj6G6w-unsplash.jpg" alt="甜蜜系列">
                <p>{{ $t("Series.series2") }}</p>
              </div>
            </div>
            <div class="col-12 col-md-6 p-0">
              <div class="seriesItem" @click.prevent="$router.push({name:'Productlist',params:{series:'果香系列'}})">
                <img src="../../assets/images/dose-juice-j_YWoV_uzRw-unsplash.jpg" alt="果香系列">
                <p>{{ $t("Series.series3") }}</p>
              </div>
            </div>
            <div class="col-12 col-md-6 p-0">
              <div class="seriesItem" @click.prevent="$router.push({name:'Productlist',params:{series:'經典系列'}})">
                <img src="../../assets/images/kelly-sikkema-hUuGUG9gdRg-unsplash.jpg" alt="經典系列">
                <p>{{ $t("Series.series4") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container features">
      <div class="story row no-gutters">
        <div class="col-7">
          <div class="bg-cover features_img"></div>
        </div>
        <div class="col-5 feature_txt">
          <div class="feature_slogan">
            <h4 class="mb-4">{{ $t("Home.feature1") }}</h4>
            <h4 class="mb-4">{{ $t("Home.feature2") }}</h4>
            <h4>{{ $t("Home.feature3") }}</h4>
          </div>
        </div>
      </div>
    </section>
    <section class="hotSales">
      <div class="containerfixed d-flex align-items-center justify-content-center flex-column">
        <div class="hotSalesTop mb-5">
          <h2>熱銷商品
            <span>TOP SALES</span>
          </h2>
        </div>
        <div class="sec d-flex" data-aos="fade-right" data-aos-delay="100" data-aos-once="true" data-aos-easing="ease-in">
          <div class="secImg"><img src="../../assets/images/paul-gaudriault-QeIUZMA2mdU-unsplash.jpg" alt="研磨金盞花之皂"></div>
          <div class="secContent">
            <h3>{{ $t("Home.topsale1_title") }}</h3>
            <p>{{ $t("Home.topsale1_con") }}</p>
            <button type="button" @click.prevent="$router.push('/product_detail/-MJkRV4R-jT-kd_2sU-4')">{{ $t("Home.topsale_goto") }}</button>
          </div>
        </div>
        <div class="sec d-flex" data-aos="fade-left" data-aos-delay="100" data-aos-once="true" data-aos-easing="ease-in">
          <div class="secImg"><img src="../../assets/images/paul-gaudriault-TVxI-vkmTLI-unsplash.jpg" alt="普羅旺斯草本之皂"></div>
          <div class="secContent">
            <h3>{{ $t("Home.topsale2_title") }}</h3>
            <p>{{ $t("Home.topsale2_con") }}</p>
            <button type="button" @click.prevent="$router.push('/product_detail/-MJkH4FoS31jCGQ32--c')">{{ $t("Home.topsale_goto") }}</button>
          </div>
        </div>
      </div>
    </section>
    <section class="consults">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="left col-md-6">
            <div class="backimg"></div>
            <div class="consulttxt">
              <h3>聯絡我們<span>CONTACT US</span></h3>
              <p>{{ $t("Home.contacts") }}</p>
            </div>
          </div>
          <div class="right col-md-6">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form class="contact" @submit.prevent="handleSubmit(sendConsult)">
                <span class="bordercorner"></span>
                <span class="bordercorner"></span>
                <span class="bordercorner"></span>
                <span class="bordercorner"></span>
                <div class="form-group">
                  <ValidationProvider rules="required" v-slot="{ errors , classes }">
                    <div :class="classes">
                      <input type="text" name="name" placeholder="您的姓名或稱呼" v-model="name">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required|email" v-slot="{ errors , classes }">
                    <div :class="classes">
                      <input type="email" name="email" placeholder="您的電子信箱" v-model="eamil">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required" v-slot="{ errors , classes }">
                    <div :class="classes">
                      <textarea name="message" placeholder="想對我們說的話" v-model="message"></textarea>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="formbtn">
                  <button class="btn" type="submit">{{ $t("Home.contactSub") }}</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </section>
    <div class="modal fade" id="sendOverModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-light" id="exampleModalLabel">Pure Savon</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ $t("Home.contactModal") }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="couponModal" tabindex='-1' role='dialog' aria-hidden='true' data-backdrop='static'>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-light" id="exampleModalLabel">Pure Savon</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class='modalContent' v-if="!subscribed">
              <p>2020週年慶！立即輸入Email，訂閱電子報，即可獲取購物優惠折扣碼喔！</p>
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(getCoupon)">
                    <div class="form-group">
                      <ValidationProvider rules="required|email" v-slot="{ errors , classes }">
                        <div :class="classes">
                          <input type="email" name="c_email" placeholder="您的電子信箱" v-model="c_email" class="form-control" v-focus>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <button type="submit" class="btn btn-secondary">訂閱</button>
                  </form>
                </ValidationObserver>
            </div>
            <div class="modalContent" v-if="subscribed">
              <p>訂閱成功!! 結帳時，請別忘記輸入下方優惠代碼以取得折扣~!</p>
              <div class="coupon">
                <div class="backimg"></div>
                <h3>輸入優惠代碼：<strong>PURE2020</strong><br>即享8折優惠</h3>
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
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      eamil: '',
      message: '',
      subscribed: false,
      c_email: ''
    }
  },
  methods: {
    sendConsult () {
      $('#sendOverModal').modal('show')
    },
    scrollIntoView (viewId) {
      $(viewId)[0].scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
      $('html, body').animate({ scrollTop: $(viewId).offset().top }, 800)
    },
    showCouponmodal () {
      window.setTimeout(() => {
        $('#couponModal').modal('show')
      }, 2000)
    },
    getCoupon () {
      this.subscribed = true
    },
    scrollAni () {
      if ($(window).scrollTop() < $('.features').offset().top - 100) {
        $('.feature_slogan').addClass('fadeIn')
      } else {
        $('.feature_slogan').removeClass('fadeIn')
      }
    }
  },
  mounted () {
    this.showCouponmodal()
    window.addEventListener('scroll', this.scrollAni)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollAni)
  }
}
</script>
<style scoped>
.invalid input, .invalid textarea{
   border-bottom: 1px #EB0600 solid;
}
.valid input, .valid textarea{
    border-bottom: 1px #34495E solid;
}
</style>
