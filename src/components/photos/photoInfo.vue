<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
            <span>点击次数：{{photoinfo.click}}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
// 导入子组件
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            id:this.$route.params.id,//从路由中获取的图片id
            photoinfo:{},//图片详情
            list:[]//缩略图数组
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo(){
            //获取图片的详情
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0];
                }else{
                    Toast('获取数据失败!')
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    //循环每个图片的数据，补全图片的宽和高
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 600;
                        item.msrc = item.src;
                        this.list = result.body.message;
                    });
                }else{
                    Toast('获取数据失败!')
                }
            });
        }
    },
    components:{
        'cmt-box':comment,//注册评论子组件
    }
}
</script>
<style scoped>
.photoinfo-container{
    padding: 3px;
}
.photoinfo-container h3{
    color: #26a2ff;
    font-size: 18px;
    text-align: center;
    margin: 15px 0px;
}
.photoinfo-container .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}
.photoinfo-container .content{
    font-size: 14px;
    line-height: 30px;
}
</style>
