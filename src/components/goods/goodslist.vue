<template>
    <div class="goods-list">
        <!-- 页面跳转的方式 -->
        <!-- 1.使用a标签跳转的方式，叫做标签跳转 -->
        <!-- 2.使用window.loaction.href的形式，叫编程式导航 -->
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDateil(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多...</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex:1,//分页的页数
            goodslist:[],//商品列表
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            //获取商品列表
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result => {
                if(result.body.status === 0){
                    // this.goodslist = result.body.message;
                    this.goodslist = this.goodslist.concat(result.body.message);
                }else{
                    Toast('获取数据失败！')
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDateil(id){
            //使用js进行路由导航
            // 注意：一定要区分this.$route和this.$router这2个对象
            // this.$route是路由参数对象，所有路由中的参数，【params】【query】都属于它
            // this.$router是一个路由导航对象，用它可以方便的使用js代码，实现路由的前进、后退、跳转到新的url地址

            // 1.这是最简单的跳转
            // this.$router.push('/home/goodsinfo/:id');
            // 2.传递对象
            // this.$router.push({path: '/home/goodsinfo/:id'})
            // 3.传递一个命名的路由
            this.$router.push({name:'goodsinfo',params:{id:id}});
        }
    },
}
</script>
<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
}
.goods-item{
    width: 48%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0px;
    padding: 2px;
    display: flex;
    /* 改变主轴方向为y轴 */
    flex-direction: column;
    justify-content: space-between;
    min-height: 290px;
}
.goods-item .info{
    background-color: #ccc;
}
.goods-item img{
    width: 100%;
}
.goods-item .title{
    font-size: 14px;
}
.goods-item p{
    font-size: 12px;
    margin: 0px;
    padding: 5px;
}
.goods-item .now{
    color: orange;
    font-size: 14px;
    font-weight: bold;
}
.goods-item .old{
    text-decoration: line-through;
    font-size: 12px;
}
.goods-item .sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
</style>
