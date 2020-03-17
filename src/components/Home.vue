<template>
  <div class="home">
    <home-header :categoryArr="categoryArr"></home-header>
    <home-content></home-content>
    <home-rightside :contents="contents"></home-rightside>
    <home-footer></home-footer>
  </div>
</template>

<script>
  const HomeHeader = () => import('./home/header')
  const HomeContent = () => import('./home/content')
  const HomeRightside = () => import('./home/rightside')
  const HomeFooter = () => import('./home/footer')

  export default {
  name: 'home',
  data () {
    return {
      categoryArr:[],
      contents:[]
    }
  },
  methods:{
    async getCategoryList() {//获取前台分类
      let data = await this.$axios.post('/admin/titleCategory');
      data.data.category.forEach(item => {
          this.categoryArr.push(item)
      });
      this.contents = data.data.content;
    },
    // async getContents(){//获取分类对应的内容
    //   let where = {};
    //   where.category = this.$route.query.category;
    //   let contents = await this.$axios.post('/admin/getcontents',where);
    //     this.contents = contents.data;
    //    // bus.$emit('contents',this.contents)
    // },
  },
  created(){
    this.getCategoryList();
  },
  watch:{
    $route(){
    //  this.getContents();
    }
  },
  components:{
    HomeHeader,
    HomeContent,
    HomeRightside,
    HomeFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

</style>
