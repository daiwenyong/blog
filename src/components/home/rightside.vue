<template>
    <aside class="rightside clearfix">
      <div class="content-box aside-img">
        <div class="imgBox" ref='imgBox' draggable="true" v-if="hasUsername&&!topImg">
          <p>拖拽图片添加头像</p>
        </div>
        <img :src="topImg" alt="" v-if="topImg" width="100" height="100" class="img-circle">
        <img v-show="!hasUsername"
          src="http://www.teenshare.club/wp-content/uploads/2017/10/2017103011335463.jpg"
               alt="头像" width="100" height="100"  class="img-circle">
        <p v-if="hasUsername">{{hasUsername.username}}</p>
        <p v-show="!hasUsername">Davion</p>
        <p v-show="!hasUsername">
          <span class="label label-success"><a href="https://github.com/daiwenyong" target="_blank">关注</a></span>
          <span class="label label-danger">了解</span>
        </p>
      </div>
      <aside class="content-box">
        <p class="content-tag">博客公告: <i class="iconfont icon-inform" sytle="font-size:20px"></i> </p>
        <p>本博客采用:vue.js+node+mongoDB</p>
      </aside>
      <aside class="content-box">
        <p class="content-tag">最新文章<i class="iconfont icon-hot"></i></p>
        <ul>
          <router-link
            tag="li"
            class="aricle-item"
            v-for="(item,index) in contents"
            :key="index"
            :to="{name:'contentItem',query:{id:item._id}}">
              {{item.title}}
          </router-link>
        </ul>
      </aside>
    </aside>
</template>

<script>
    export default {
        props:['contents'],
        data(){
          return{
            hasUsername:'',
            topImg:'',
          }
        },
        created(){
          this.hasUsername =  localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):'';
          this.topImg =  localStorage.getItem('topImg')?JSON.parse(localStorage.getItem('topImg')):'';
          this.$nextTick(()=>{
            let imgBox = this.$refs.imgBox;
            if(imgBox){
              imgBox.ondragover = function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              };
              imgBox.ondrop = function (e) {
                let dt = e.dataTransfer;
                let file = dt.files[0];
                let reader = new FileReader();//读取文件对象信息的对象
                reader.readAsDataURL(file);//读取文件所在的URL
                reader.onload = function(e){
                  if(/image/.test(reader.result)){
                    let img = new Image();
                    img.style.cssText = 'width:100px;height:100px;border:5px solid #ccc;';
                    img.src = reader.result;
                    img.className = 'img-circle';
                    localStorage.setItem('topImg',JSON.stringify(img.src));
                    img.onload=function(){
                      imgBox.style.border = 'none';
                      imgBox.innerText = '';
                      imgBox.appendChild(img)
                    }

                  }
                }

                // if(/image/.test(file.type)){
                //     let blob = new Blob([file]);
                //     let url = window.URL.createObjectURL(blob);
                //     let img = new Image();
                //     img.style.cssText = 'width:100px;height:100px;border:5px solid #ccc;';
                //     img.src = url;
                //     img.className = 'img-circle';
                //     localStorage.setItem('topImg',JSON.stringify(url));
                //         img.onload = function(){
                //           imgBox.style.border = 'none';
                //           imgBox.innerText = '';
                //           imgBox.appendChild(img);
                //         }
                //   }else{
                //     this.$message.error('请拖入图片');
                //   }

                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }
          })
        }
    }
</script>

<style scoped lang="less">

 .rightside{
      width:25%;
      height:auto;
      float:right;
      /*display: inline-block;*/
      margin:0 6% 0 0;
      .content-box{
        box-shadow: 0 2px 5px rgba(0,0,0,.15);
        border-radius:5px;
        margin:0 0 20px;
        padding:12px;
        background-color: #fff;
        .content-tag{
          font-size:18px;
          margin-bottom:10px;
          position: relative;
        }
        .content-tag:before{
          content:'';
          display: block;
          background-color: #83e1f7;;
          width:5px;
          height:20px;
          position:absolute;
          border-radius:0 10px 10px 0 ;
          left: -12px;
          top: 0;
        }
        .content-tag+p{
          font-size:16px;
        }
      }
      .aside-img{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top:15px;
        p{
          padding:10px 0;
          .label{
            padding:5px 20px ;
            border-radius:20px;
          }
        }
        .imgBox{
          width: 100px;
          height: 100px;
          border-radius:50%;
          border:5px solid #ccc;
          p{
            padding-top:30px;
            padding-left:2px;
          }
        }
        img{
          display: block;
          border:5px solid #ccc;
        }
      }
      .aricle-item{
        padding:10px 0;
        border-bottom:1px solid #eee;
        cursor:pointer;
        font-size:16px;
        color:rgb(119, 119, 119);

      }
      .aricle-item:hover{
         background-color: #f9f9f9;
       };
  }


 @media screen and (max-width: 1100px) {
   .rightside{
     display: block;
     float: none;
     width:100%;
     margin:0;
   }
 }

</style>
