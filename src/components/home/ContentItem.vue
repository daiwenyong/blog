<template>
    <div class="contentItem">
      <homeHeader></homeHeader>
      <div class="article-title">
        <h3>{{content.title}}</h3>
        <p>
          <span style="color:#777">Davion</span>
          <!--<span style="color:#777">{{content.author}}</span>-->
          发表于：
          <span style="color:#777">{{content.time|timer()}}</span>
        </p>
      </div>
      <div class="article-body">
        <div class="article-img"><img :src="content.url" alt="图片还在骑马路上" ></div>
        <blockquote>
          简介 <i class="iconfont icon-web"></i>
        </blockquote>
        <p style="text-indent: 2em">{{content.description}}</p>
        <p class="article-content" v-html="content.content"></p>

        <p class="good" @click="clickGood">
          <i class="iconfont icon-good" style="font-size:25px" ref="good"></i> {{goodNum}}
        </p>

        <div class="form-group">
          <input type="text" v-model="comment" class="form-control" placeholder="请输入评论">
          <div class="btn btn-success" @click="submitComment">提交</div>
        </div>
        <div class="commentList">
          <ul>
            <li v-for="(item,index) in comments">
              <p>
                <span class="username">{{item.username}}</span>
                发表于：
                <span class="username">{{new Date(item.time).toLocaleString()}}</span>
              </p>
              {{item.comment}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              content:{},
              comment:'',//一条评论
              comments:[],//所有的评论
              goodNum:0,//点赞数
              clickNum:false,//是否点击
              username:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):''
            }
        },
        created(){
          this.getContents();
        },
        methods:{
          async getContents(){
            let where = {};
            where._id = this.$route.query.id;
            let content = await this.$axios.post('/admin/getcontent',where);
            this.goodNum = content.data.views;
            this.content = content.data
          },
          async submitComment(){
            if(!this.username){
              this.$message.warning('还没有登陆，请先登陆哦');
              return
            }
            if(!this.comment){
              this.$message.warning('评论不能为空');
              return
            }
            let comments = await this.$axios.post('/admin/getcomment',{
              comment:this.comment,
              _id:this.content._id,
              username:this.username.username
            });
            this.comments= comments.data
          },
          clickGood(){
            if(this.clickNum == true){
              this.$message.warning('已经点过赞了');
              return;
            }
            this.goodNum++;
            this.clickNum = true;
            this.$refs.good.style.color = 'pink';
            this.$axios.post('/admin/goodnum',{
              goodNum:this.goodNum,
              _id:this.content._id
            })
          }
        },
        filters:{
          timer(value){
            return new Date(value).toLocaleString().replace(/\//g,'-')
          },
        }
    }
</script>

<style scoped lang="less">
  @keyframes article-up
  {
    from {top:0px;}
    to {top:-100px;}
  }

  .contentItem {
    width: 50%;
    border: 1px solid #ccc;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    p{
      line-height: 1.5;
      padding:0 5%;
    }
    .article-title{
      padding:20px;
      text-align:center;
      border-bottom:1px solid #ccc;
      h3{
        font-size:1.5em;
        padding-bottom:10px;
      }
    }
    .article-body {
      margin-top:130px;
      position: relative;
     // top:150px;
      animation: article-up 1s;
      animation-fill-mode: forwards;
      .article-img{
        width:35%;
        height:160px;
        margin:auto;
        overflow: hidden;
        img {
          border-radius: 5px;
          display: block;
          width: 100%;
          height:100%;
          cursor: pointer;
        }
      }
      .good{
        width:200px;
        cursor: pointer;
        //font-size:25px;
      }
      blockquote{
        padding:5px 10px;
        border-radius: 0 05px 5px 0;
        line-height:1.4;
        margin:10px 0;
        border-left:8px solid #25a4bb;
        background-color: #aed9f3;
      }
      .article-content{
        padding-top:1em;
        line-height:2;
      }
    }
    .form-group{
      display:flex;
      padding:5% 5% 0;
    }
    .commentList{
      padding:2% 5% 0;
      li:before{
        content: '';
        display: block;
        width: 5px;
        height:20px;
        background-color:#83e1f7;
        position: relative;
        top: 25px;
        left: -16px;
        border-radius: 0 10px 10px 0;
      }
      li{
        line-height:1.5;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        border-radius: 15px;
        padding: 6px 15px;
        .username{
          color:rgb(119,119,119)
        }
        p{
          padding: 0;
        }
      }
    }
  }
  @rem:75rem;
  @media screen and (max-width: 1100px){
    .contentItem {
      width: 100%;
      border:none;
      .article-body{
        .article-img{
          padding-bottom:0.5rem;
        }
      }
      .article-content{
        width: 90%;
        padding-left:5%;
      }
    }
    h3{
      font-size:1em;
    }
  }
</style>
