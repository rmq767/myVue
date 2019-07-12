<template>
    <div class="goodsinfo">
        <div class="mui-numbox" data-numbox-min='1'>
            <!-- 问题：我们不知道什么时候能够拿到max的值，但是，总归有一刻，会得到一个真正的max值 -->
            <!-- 我们可以使用watch属性操作，来监听父组件传过来的max值，不管watch会被触发几次，但是最后一次肯定是合法的max值 -->
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="number"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>

    <!-- 分析：子组件什么时候把数据传递给父组件 -->

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
            // 每当文本框的数据被修改时，立即把 最新的数据，通过事件传递给父组件
            // console.log(this.$refs.number.value)
            this.$emit('getcount', parseInt(this.$refs.number.value));//传值给父组件
        }
    },
    props:["max"],//接收父组件传来的最大库存数量
    watch: {
        //属性监听
        'max':function(newVal, oldVal){
            // 使用JS API设置numbox的最大值
            mui(".mui-numbox").numbox().setOption('max',newVal);
        }
    },
}
</script>
<style scoped>
.goodsinfo{
    display: inline-block;
}
</style>
