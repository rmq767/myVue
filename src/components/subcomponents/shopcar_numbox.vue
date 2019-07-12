<template>
    <div class="shopcar">
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="number" readonly/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js';
export default {
    data() {
        return {

        }
    },
    mounted() {
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChange(){
            //每当数量值改变，则立即把最新的数量同步到 购物车 的store中，覆盖之前的数量值
            this.$store.commit('updataGoodsinfo',{
                id:this.goodsid,
                count:this.$refs.number.value
            })
        }
    },
    props:['initcount','goodsid'],
}
</script>
<style scoped>
.shopcar{
    display: inline-block;
}
.mui-numbox{
    width:110px;
    height: 25px;
}
</style>
