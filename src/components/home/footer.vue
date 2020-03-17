<template>
    <div class="footer">
        <p>浙ICP备19027313号-1</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
  .footer{
    background-color: #545c64;
    line-height:50px;
    text-align: center;
  }
  @media screen and (max-width: 750px) {
    .footer{
      line-height:30px;
      font-size:10px;
    }
  }
</style>
