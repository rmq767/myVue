<template>
    <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多输入120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in commentList" :key="item.add_time">
            <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
            </div>
            <div class="cmt-com">
                {{item.content === 'undefined'? '该用户没有发表评论':item.content}}
            </div>
        </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多...</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex:1,//默认展示第一页
            commentList:[],//所有评论数据
            msg:""//评论内容
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(result => {
                if(result.body.status === 0){
                    // this.commentList = result.body.message;
                    this.commentList = this.commentList.concat(result.body.message);//数据拼接，将后面的数组拼接到前面去
                }else{
                    Toast('评论加载失败！')
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getComments();
        },
        postComment(){
            //评论为空，校验
            if(this.msg.trim().length == 0){
                Toast("评论为空！")
            }else{
            //发表评论
            //参数一：请求的url地址。参数二：提交给服务器的数据对象{content:this.msg}。参数三：定义提交时，表单数据格式{emulateJSON:true}
            this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg.trim()}).then(result => {
                if(result.body.status === 0){
                    //1.拼接出一个评论对象
                    var cmt = {user_name:"匿名用户",add_time:Date.now(),content:this.msg.trim()}
                    this.commentList.unshift(cmt)
                    this.msg = ''
                }else{
                    Toast("提交失败！")
                }
            })
            }
        }
    },
    props:['id']
}
</script>
<style scoped>
.cmt-container h3{
    font-size: 18px;
}
.cmt-container textarea{
    font-size: 14px;
    height: 80px;
    margin-bottom: 0px;
}
.cmt-list .cmt-item{
    margin-top: 10px;
    border-bottom: 1px solid black;
}
.cmt-container .cmt-list .cmt-title{
    background-color: #ccc;
    font-size: 13px;
    line-height: 30px;
}
.cmt-container .cmt-list .cmt-com{
    font-size: 13px;
    line-height: 35px;
    text-indent: 2em; /* 缩进2个字符 */
}
</style>
