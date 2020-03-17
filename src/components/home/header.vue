<template>
    <div class="header">

        <div class="header-nav">
          <!--<img src="../../image/logo.jpg" width="50" height="50">-->
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item class='menu-items' ref='menuItem'>
              <a class="font-item"
                 @click="getContents()">
                <i class="iconfont icon-shouye" style="color:#bfffff;font-size:40px"></i>
              </a>
            </el-menu-item>
            <el-menu-item class='menu-items menu-list' ref='menuItem' v-for="(item,index) in categoryArr" :key="index">
              <a class="font-item"
                 @click="getContents(item._id)">
                {{item.name}}
              </a>
            </el-menu-item>
            <el-menu-item index="5"><p ref="p"></p></el-menu-item>

            <div  style="float:right;display: flex">
              <el-menu-item v-show='hasUsername' class="welcomeUser" index="6">
                欢迎：{{hasUsername.username}}
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">账号</template>
                <el-menu-item index="2-1"  v-show='!hasUsername'>
                  <router-link :to="{name:'register'}">注册</router-link>
                </el-menu-item>
                <el-menu-item index="2-2"  v-show='!hasUsername'>
                  <router-link :to="{name:'login'}">登录</router-link>
                </el-menu-item>
                <el-menu-item index="2-3" v-show="isAdmin" class="admin">
                  <a href="/admin">
                    <i class="iconfont icon-jinru" style="color:lightblue"></i> 进入后台管理面板
                  </a>
                </el-menu-item>
                <el-menu-item index="2-4" v-show='hasUsername' @click="goout" style="text-indent: 2em">
                   <i class="iconfont icon-tuichu4" style="color:red"></i>  退出
                </el-menu-item>
              </el-submenu>
            </div>



          </el-menu>

        </div>
    </div>
</template>


<script>
  import bus from './bus.js'
  export default {
        props:['categoryArr'],
        data() {
            return {
              hasUsername:'',
              isAdmin:'',
              activeIndex: '1',
              activeIndex2: '1',
              contents:[]
            }
        },
      methods: {
        goout() {
          localStorage.clear();
          window.location.reload()
        },
        word(dom) {
          let str = '你好,欢迎来到我的博客';
          let i = 0;
          let timer = setInterval(function () {
            dom.innerText = str.substr(0, ++i) + "^_^" + '⭐️'
            if (i == str.length) {
              clearInterval(timer);
              setTimeout(function () {
                dom.innerText = ''
              }, 1000)
            }
          }, 200)
        },
        getContents(category){
          if(category==undefined){
            this.$router.push('/')
          }
          bus.$emit('contents',category);
          this.$emit('data','子组件的数据')
        },
      },
       created(){
         this.hasUsername =  localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):'';
         this.isAdmin = this.hasUsername.isAdmin;
         this.$nextTick(()=>{
           let p = this.$refs.p;
           this.word(p);
         });
       }
        }
</script>

<style scoped lang="less">

  .header{
    width:100%;
    display: flex;
    background-color: #545c64;
    text-align: center;
    color:#fff;
  }
  .header-nav{
    width:80%;
    line-height:50px;
    //background-color: red;
    margin-left:15%;
  }
  .font-item:hover{
    transform: scale(1.5);
    text-decoration: none;
  }
  li{
    padding:0 20px;
    a{
      width: 100%;
      height: 100%;

      display: inline-block;
    }
  }
  .font-item{
    transition: 1s all;
  }
  .active{
    color: rgb(255, 208, 75);
    border-bottom-color: rgb(255, 208, 75);
  }
  img{
    float:left;
    cursor: pointer;
  }


  @media screen and (max-width: 1100px) {
    .welcomeUser{
      display:none
    }
    .header-nav{
      width:100%;
      margin-left:0;
    }
  }
  @media screen and (max-width: 750px) {
    .menu-list{
      display: none;
    }
    .admin{
      display: none;
    }
  }

</style>
