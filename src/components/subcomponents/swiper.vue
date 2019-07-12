<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环数组，一定要使用:key -->
            <!-- 将来，谁用这个组件，谁就为其传递swipeList -->
            <!-- 此时，swipeList应该是父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.img" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析：为什么商品评论中的轮播图这么丑？ -->
    <!-- 1、首页中的图片，它的宽和高，都是使用了100%的宽度 -->
    <!-- 2、在商品详情页面中，轮播图的图片如果也使用宽高100%的话，页面就不好看 -->
    <!-- 3、所以应设置为高度100%，宽度自适应 -->
    <!-- 4、首页中的轮播图  和  商品详情中的轮播图  分歧点是宽度到底是100%还是自适应 -->
    <!-- 5、2个轮播图其它方面都没有冲突，只是宽度有分歧，那么我们可以定义一个属性，让轮播图的调用者，手动指定是否为100%宽度 -->
</template>
<script>
export default {
    props:['swipeList','isfull']
}
</script>
<style scoped>
.mint-swipe{
    height:200px;
}
.mint-swipe-item{
    text-align: center
}
.mint-swipe-item img{
    /* width: 100%; */
    height: 100%;
}
.full{
    width: 100%;
}
</style>
