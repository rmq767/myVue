<template>
    <div>
        <!-- 轮播图区域 -->
        <swiper :swipeList="swipeList" :isfull="true"></swiper>

        <!-- 九宫格到六宫格的改造 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
		                    <img src="../../img/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>   <!-- 改造成路由，需将a改为router-link，href改为to -->
	 	            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../img/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../img/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return{
            swipeList:[]//保存轮播图的数组
        }
    },
    methods: {
        getSwipe(){//获取轮播图数据的方法
            this.$http.get("api/getlunbo").then(result => {
                // console.log(result.body)
                if(result.body.status === 0){//成功的
                    this.swipeList = result.body.message;

                }else{//失败的
                    Toast("加载轮播图失败。。。")
                }
            })
        }
    },
    created() {
        this.getSwipe();
    },
    components:{
        swiper
    }
}
</script>

<style scoped>
.mint-swipe{
    height:200px;
}
.mint-swipe-item:nth-child(1){
    background-color: yellowgreen;
}
.mint-swipe-item:nth-child(2){
    background-color: orange;
}
.mint-swipe-item:nth-child(3){
    background-color: greenyellow;
}
.mint-swipe-item img{
    width: 100%;
    height: 100%;
}
.mui-table-view{
    background-color: white;
    border: none;
}
.mui-table-view img{
    width: 60px;
    height: 60px;
}
.mui-table-view .mui-media-body{
    font-size: 12px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
</style>
