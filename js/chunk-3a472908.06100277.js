(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a472908"],{"0d5f":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.orders,(function(a){return e("tr",{key:a.id},[e("td",[t._v(t._s(t._f("date")(a.create_at)))]),e("td",[t._v(t._s(a.user.name))]),e("td",[e("ul",t._l(a.products,(function(a,s){return e("li",{key:s},[t._v(" "+t._s(a.product.title)+" 數量："+t._s(a.qty)+t._s(a.product.unit)+" ")])})),0)]),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("currency")(a.total)))]),e("td",[a.is_paid?e("span",{staticClass:"ispaid"},[t._v("已付款")]):e("span",{staticClass:"unpaid"},[t._v("未付款")])]),e("td",[e("button",{staticClass:"btn btn-open btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openModal(a)}}},[t._v("查看")])])])})),0)]),e("Pagination",{attrs:{pages:t.pagination},on:{switchpage:t.getOrders}}),e("div",{staticClass:"modal fade",attrs:{id:"openOrModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(1),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"my-2"},[t._v("訂購人姓名："+t._s(t.tempOrder.user.name))]),e("div",{staticClass:"my-2"},[t._v("訂單編號："+t._s(t.tempOrder.id))]),e("div",{staticClass:"my-2"},[t._v("訂購日期："+t._s(t.tempOrder.create_at))]),t.tempOrder.is_paid?e("div",{staticClass:"my-2"},[t._v("付款狀態：已付款")]):e("div",{staticClass:"my-2"},[t._v("付款狀態：未付款")]),e("div",{staticClass:"my-2"},[t._v("Email："+t._s(t.tempOrder.user.email))]),e("div",{staticClass:"my-2"},[t._v("手機號碼："+t._s(t.tempOrder.user.tel))]),e("div",{staticClass:"my-2"},[t._v("收件地址："+t._s(t.tempOrder.user.address))]),e("table",{staticClass:"table mt-4"},[t._m(2),e("tbody",[t._l(t.tempOrder.products,(function(a){return e("tr",{key:a.id},[e("td",[t._v(t._s(a.product.title))]),e("td",[t._v(t._s(a.qty))]),e("td",[t._v("NT"+t._s(t._f("currency")(a.product.price)))]),e("td",[t._v("NT"+t._s(t._f("currency")(a.total)))]),a.hasOwnProperty("coupon")?e("td",[t._v(t._s(a.coupon.percent)+"%")]):e("td",[t._v("未使用")])])})),e("tr",[e("td",{attrs:{colspan:"5"}},[t._v("應付金額")]),e("td",[t._v("NT"+t._s(t._f("currency")(t.tempOrder.total)))])])],2)])]),t._m(3)])])])],1)},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{width:"130"}},[t._v("購買時間")]),e("th",[t._v("姓名")]),e("th",[t._v("購買款項")]),e("th",{attrs:{width:"120"}},[t._v("應付金額")]),e("th",{attrs:{width:"120"}},[t._v("是否付款")]),e("th",{attrs:{width:"130"}},[t._v("詳細資訊")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",{staticClass:"text-light"},[t._v("訂單資訊")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{width:"130"}},[t._v("品項")]),e("th",{attrs:{width:"80"}},[t._v("數量")]),e("th",{attrs:{width:"100"}},[t._v("單價")]),e("th",{attrs:{width:"110"}},[t._v("小計")]),e("th",{attrs:{width:"110"}},[t._v("優惠")]),e("th",{attrs:{width:"110"}},[t._v("總計")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-close",attrs:{type:"button","data-dismiss":"modal"}},[t._v("關閉")])])}],i=(e("99af"),e("5530")),n=e("1799"),d={data:function(){return{pagination:{},isLoading:!1,orders:[],tempOrder:{user:{},products:{}}}},components:{Pagination:n["a"]},methods:{getOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("ashley0126","/admin/orders?page=").concat(t);a.isLoading=!0,a.$http.get(e).then((function(t){a.orders=t.data.orders,a.pagination=t.data.pagination,a.isLoading=!1}))},openModal:function(t){this.tempOrder=Object(i["a"])({},t),$("#openOrModal").modal("show")}},created:function(){this.getOrders()}},c=d,o=e("2877"),l=Object(o["a"])(c,s,r,!1,null,null,null);a["default"]=l.exports},1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"d-flex justify-content-center align-items-center"},[e("ul",{staticClass:"pages"},[e("li",{staticClass:"page",class:{disabled:!t.pages.has_pre}},[e("a",{staticClass:"pageNum",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.changepage(t.pages.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("<")])])]),t._l(t.pages.total_pages,(function(a){return e("li",{key:a,staticClass:"page",class:{active:t.pages.current_page===a}},[e("a",{staticClass:"pageNum",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changepage(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page",class:{disabled:!t.pages.has_next}},[e("a",{staticClass:"pageNum",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.changepage(t.pages.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v(">")])])])],2)])},r=[],i={name:"Pagination",props:["pages"],methods:{changepage:function(t){this.$emit("switchpage",t)}}},n=i,d=e("2877"),c=Object(d["a"])(n,s,r,!1,null,null,null);a["a"]=c.exports},"99af":function(t,a,e){"use strict";var s=e("23e7"),r=e("d039"),i=e("e8b5"),n=e("861d"),d=e("7b0b"),c=e("50c4"),o=e("8418"),l=e("65f0"),u=e("1dde"),p=e("b622"),_=e("2d00"),v=p("isConcatSpreadable"),h=9007199254740991,m="Maximum allowed index exceeded",f=_>=51||!r((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),g=u("concat"),b=function(t){if(!n(t))return!1;var a=t[v];return void 0!==a?!!a:i(t)},C=!f||!g;s({target:"Array",proto:!0,forced:C},{concat:function(t){var a,e,s,r,i,n=d(this),u=l(n,0),p=0;for(a=-1,s=arguments.length;a<s;a++)if(i=-1===a?n:arguments[a],b(i)){if(r=c(i.length),p+r>h)throw TypeError(m);for(e=0;e<r;e++,p++)e in i&&o(u,p,i[e])}else{if(p>=h)throw TypeError(m);o(u,p++,i)}return u.length=p,u}})}}]);
//# sourceMappingURL=chunk-3a472908.06100277.js.map