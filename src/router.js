import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShoppingContainer from './components/tabbar/ShoppingContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsdesc from './components/goods/goodsdesc.vue'
import goodscomment from './components/goods/goodscomment.vue'

// 3.创建路由对象
var router = new VueRouter({
    routes: [ //配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopping', component: ShoppingContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/news', component: newsList },
        { path: '/home/newsInfo/:id', component: newsInfo },
        { path: '/home/photolist', component: photoList },
        { path: '/home/photoInfo/:id', component: photoInfo },
        { path: '/home/goodslist', component: goodslist },
        { path: '/home/goodsinfo/:id', component: goodsinfo, name: 'goodsinfo' },
        { path: '/home/goodsdesc/:id', component: goodsdesc, name: 'goodsdesc' },
        { path: '/home/goodscomment/:id', component: goodscomment, name: 'goodscomment' },
    ],
    linkActiveClass: 'mui-active' //覆盖默认高亮的类，默认的类叫做router-link-active
})

export default router //把路由对象暴露出去