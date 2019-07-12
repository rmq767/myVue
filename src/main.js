//入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
    //1.3导入自己的router.js模块
import router from './router.js'


//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中把购物车的数据先拿出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: { //this.$store.state.***
        car: car //将购物车中的商品数量，用一个数组存储起来，在car数组中，存储商品对象{id:商品的id，count:要购买的数量，price:商品的价格，selected:商品是否选中}
    },
    mutations: { //this.$store.commit('方法名称'，'按需传递唯一参数')
        addToCar(state, goodsinfo) { //点击加入购物车，把商品信息添加到state中的car上
            //分析：1.如果购物车中之前就有这个对应的商品，只需要更新数量
            // 2、如果没有直接把商品数据push到car中

            //假设购物车中，没有找到对应的商品
            var flag = false;
            state.car.some(item => {
                    if (item.id == goodsinfo.id) { //some不能有else
                        item.count += parseInt(goodsinfo.count);
                        flag = true;
                        return true;
                    }
                })
                //如果循环完毕，还是没有找到对应的商品，就添加到car中
            if (!flag) {
                state.car.push(goodsinfo);
            }

            //当更新car之后，把car数组，存储到localStorage中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updataGoodsinfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            // 分析：
            state.car.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count = parseInt(goodsinfo.count);
                        return true;
                    }
                })
                //当更新car之后，把car数组，存储到localStorage中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                    if (item.id == id) {
                        state.car.splice(i, 1);
                        return true;
                    }
                })
                //当更新car之后，把car数组，存储到localStorage中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateSelected(state, info) {
            state.car.some(item => {
                    if (item.id == info.id) {
                        item.selected = info.selected;
                    }
                })
                //当更新car之后，把car数组，存储到localStorage中
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: { //this.$store.getters.***
        // 相当于计算属性，也相当于filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            };
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            })
            return o;
        }
    }
})


// 导入格式化时间插件
import moment from 'moment'
//设置全局的过滤器，用来过滤时间
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD hh-mm-ss") {
    return moment(dataStr).format(pattern)
})


//2.1导入vue-resource.
// 引入vue-resource后，可以基于全局的Vue对象使用http，也可以基于某个Vue实例使用http。
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
    //设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
    //全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true


//导入mui样式
import './lib/mui/css/mui.min.css'
//导入mui图标扩展的css文件
import './lib/mui/css/icons-extra.css'
//导入mui图标扩展的ttf文件
import './lib/mui/fonts/mui-icons-extra.ttf'

//按需导入mint-ui组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

//全部导入mint-ui组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//带入App组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    data: {

    },
    methods: {

    },
    render: c => c(app),
    router, //1.4挂载路由对象到vue实例
    store, //挂载store状态管理对象
})