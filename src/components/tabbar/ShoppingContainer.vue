<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
                        @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <shopcarNumbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></shopcarNumbox>
                                <!-- 问题：如何从购物车里获取商品数量 -->
                                <!-- 1.我们可以先创建一个空对象，然后循环购物车里所有的商品数据，把当前循环的商品id作为对象的属性名，把数量作为值
                                这样就会得到一个对象{id:count   88:2,89:1,90:4} -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                                <!-- remove第一个参数删除store中的数据，第二个参数删除goodslist中的数据 -->
                            </p>
                        </div>
					</div>
				</div>
			</div>

            <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span>{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价：<span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <div class="right">
                            <mt-button type="danger">去结算</mt-button>
                        </div>
					</div>
				</div>
			</div>

            <p>{{$store.getters.getGoodsSelected}}</p>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import shopcarNumbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            goodslist:[]
        }
    },
    created() {
        this.getGooodsList();
    },
    methods: {
        getGooodsList(){
            //1.获取到store中所有的id,用逗号拼接的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => {
                idArr.push(item.id);
            });
            //如果购物车里没有数据就不请求数据，否则会报错
            if(idArr.length <= 0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message;
                }else{
                    Toast("获取数据失败！");
                }
            })
        },
        remove(id, index){
            //点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodslist中，对应要删除的那个商品，使用index来删除
            this.goodslist.splice(index, 1);
            this.$store.commit('removeFromCar',id);
        },
        selectedChange(id, sel){
            this.$store.commit('updateSelected',{id,selected:sel});
        }
    },
    components:{
        shopcarNumbox
    }
}
</script>

<style scoped>
.goods-list .mui-card-content-inner{
    display: flex;
    align-items: center;
}
.shopcar-container{
    background-color:#eee;
    overflow:hidden;
}
.goods-list img{
    width: 60xp;
    height: 60px;
}
.goods-list h1{
    font-size: 13px;
    margin-bottom: 20px;
}
.goods-list .info .price{
    font-weight: bold;
    color: orange;
}
.mui-card-content-inner .left{
    margin-right: 20px;
}
.mui-card-content-inner span{
    color: orange;
    font-weight: bold;
    padding: 0px 5px;
}
</style>