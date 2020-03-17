<template>

  <div class="content">
    <ul>
      <router-link :to="{name:'contentItem',query:{id:item._id}}"
                   tag='li'
                   v-for="(item,index) in contents" :key="index">
        <div class="img">
          <img :src="item.url" alt="" >
        </div>
        <div class="circleItem-right">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
          <span class='label label-primary'>{{item.category.name}}</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import bus from './bus.js'
  export default {
    //props:['contents'],
    data(){
      return {
        contentId:'',
        contents:[]
      }
    },
    created(){
      bus.$on('contents', (data) => {
        this.contentId =  data
      });

      this.getContents()
    },
    watch:{
      contentId(){
        this.getContents()
      }
    },
    methods:{
      async getContents(){//获取分类对应的内容
        let where = {};
        if(this.contentId){
          where.category = this.contentId;
        }
        let contents = await this.$axios.post('/admin/getcontents',where);
        this.contents = contents.data;
        console.log(this.contents);
      },
    }
  }
</script>

<style scoped lang="less">
  .content{
    margin:10px 0 20px 15%;
    width:50%;
    display: inline-block;
    overflow: hidden;
    border-radius:5px;
    box-shadow: 0 2px 5px rgba(0,0,0,.15);
    box-sizing: border-box;
    height:980px;
    li:hover{
      background-color: #f9f9f9;
    };
    li{
      display: flex;
      align-items: center;
      height: 140px;
      padding:8px 10px;
      background-color: #fff;
      border-bottom:1px solid #ccc;
      cursor:pointer;
      box-sizing: border-box;
      .img{
        width: 100px;
        height: 10px;
        min-height:100px;
        max-height:100px;
        overflow: hidden;
        border-radius:5px;
        img:hover{
          transform: scale(1.3);
        }
        img{
          display: block;
          width:100px;
          height: 100px;
          transition: 1s all;
        }
      }
      .circleItem-right{
        width:75%;
        padding:10px 15px;
        h3{
          font-weight: 300;
        }
        p{
          color:#aaa;
          font-size:.9em;
          padding:15px 10px;
          white-space: nowrap;
        }
      }
    }
  }
  @media screen and (max-width: 1100px) {
    .content{
      float: none;
      width: 100%;
      margin-left:0;
      height:auto;
    }
    .content li .circleItem-right {
      width: 60%;
    }
  }
  @media screen and (max-width: 750px) {
    p{
      overflow: hidden;/*超出部分隐藏*/
      text-overflow:ellipsis;/* 超出部分显示省略号 */
      white-space: nowrap;/*规定段落中的文本不进行换行 */
    }
  }
</style>
