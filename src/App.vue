<template>
  <div id="app">
    <!--<keep-alive>-->
      <router-view></router-view>

    <!--</keep-alive>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    remChange()
    function remChange() {
      let html = document.documentElement;
      let width = html.getBoundingClientRect().width;
      if(width>=750){
        width=750
      }
      html.style.fontSize = width/10+'px'
    }
  },
  components:{

  }
}
</script>

<style lang="less">
  @rem:750/10rem;
html{
  background-color:  #f1f8fa;
}
a{
  color:#fff
}

</style>
