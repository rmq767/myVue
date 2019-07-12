<template>
    <div class="newsInfo-container">
        <!-- 大标题 -->
        <h1 class="title">{{newsInfo.title}}</h1>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsInfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="content" v-html="newsInfo.content">

        </div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
//1.导入评论子组件comment.vue
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,//将url地址中传过来的id值，挂载到data上，方便以后调用
            newsInfo:{}//新闻对象
        }
    },
    created() {
        this.getnewsInfo();
    },
    methods: {
        getnewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.newsInfo = result.body.message[0];
                }else{
                    Toast('获取新闻详情失败！')
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>
<style>
.newsInfo-container{
    padding: 0 5px;
}
.newsInfo-container .title{
    color: red;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
}
.newsInfo-container .subtitle{
    font-size: 14px;
    color: rgb(0, 225, 255);
    display: flex;
    justify-content: space-between;
}
.newsInfo-container .content img{
    width: 100%;
}
</style>
