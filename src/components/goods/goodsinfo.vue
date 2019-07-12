<template>
    <div class="goods-container">

    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>


        <!-- 商品轮播图区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :swipeList="lunbo" :isfull="false"></swiper>
					</div>
				</div>
			</div>


        <!-- 商品购买区域 -->
            <div class="mui-card">
				<div class="mui-card-header">
                    <h1>{{goodsinfo.title}}</h1>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            市场价：<del>￥{{goodsinfo.market_price}}</del>
                            销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                            <!-- 分析：如何实现加入购物车，拿到选择的数量 -->
                            <!-- 1.按钮属于goodsinfo页面，数字属于goodsinfo-numbox组件 -->
                            <!-- 2.由于涉及到了父子组件，所有无法直接在goodsinfo页面拿到商品数量的值 -->
                            <!-- 3.怎么解决？（涉及到了子组件 向 父组件 传值【事件调用机制】） -->
                            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数，传递给这个方法 -->
                        </p>
					</div>
				</div>
			</div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
						<p>库存情况：{{goodsinfo.stock_quantity}}件</p>
						<p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>


    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'//导入轮播图子组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'//导入购买数量选择框
export default {
    data() {
        return {
           id:this.$route.params.id,//获取路由参数对象中的，id挂载到data
           lunbo:[],//轮播图的数据
           goodsinfo:{},//获取到的商品信息
           ballFlag:false,//控制小球隐藏和显示的标识符
           selectedCount:1,//保存用户选中的商品数量，默认为1
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result =>{
                if(result.body.status === 0){
                    // 先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img不认识item.src
                    result.body.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbo = result.body.message;
                }else{
                    Toast('获取数据失败！')
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0];
                }else{
                    Toast('获取数据失败！')
                }
            })
        },
        goDesc(id){
        // 点击使用编程式导航，跳转到图文介绍页面
        this.$router.push({name:'goodsdesc',params:{id}});
        },
        goComment(id){
        // 点击使用编程式导航，跳转到商品评论页面
        this.$router.push({name:'goodscomment',params:{id}});
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag;
            //存储商品对象{id:商品的id，count:要购买的数量，price:商品的价格，selected:商品是否选中}
            var goodsinfo = {
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true
                };
            //调用store中的mutation中得方法，将商品加入购物车
            this.$store.commit('addToCar',goodsinfo);
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el, done){
            el.offsetWidth;
            // 小球动画优化思路
            // 1.导致小球动画不准确的原因，是把位移写死了，一旦分辨率发生变化或者滚动，动画就会不准确
            // 2.解决问题（1）得到购物车的x，y，（2）得到购买数量的x，y，（3）相减的到位移量
            // 如何得到购物车与小球的位置？？domObject.getBoundingClientRect()

            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取购物车徽标在页面中的位置
            const badgePositon = document.getElementById("badge").getBoundingClientRect();
            const xDist = badgePositon.left - ballPosition.left;
            const yDist = badgePositon.top - ballPosition.top;
            el.style.transform = "translate("+xDist+"px,"+yDist+"px)";
            el.style.transition = "all 0.4s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            // 子组件把选择的数量值，传递给父组件，父组件拿到值，保存到data中
            this.selectedCount = count;
        }
    },
    components:{
        swiper,numbox
    }
}
</script>
<style scoped>
.goods-container{
    background-color: #ccc;
    overflow: hidden;
}
.goods-container h1{
    font-size: 18px;
}
.now_price{
    color: orange;
    font-weight: bold;
    font-size: 16px;
}
.mui-card-footer, .mui-card-header{
    display: block;
}
.mint-button{
    margin: 15px 0px;
}
.goods-container .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 415px;
    left: 78px;
}
</style>
