<template>
  <div class="bgc">
    <homeHeader></homeHeader>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="loginForm('ruleForm')">登录</el-button>
        <el-button ><router-link :to="{name:'register'}">  注册-->  </router-link></el-button>
        <!--<el-button >-->
          <!--<router-link :to="{name: 'Home'}">首页</router-link>-->
        <!--</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          pass: '',
          name: ''
        },
        rules: {
          pass: [
            {  required: true,message:'密码不能为空', trigger: 'blur' },
          ],
          name: [
            {  required: true,message:'用户名不能为空', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      loginForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //http://localhost:3000
            this.$axios.post('/form/login',{
              username:this.ruleForm.name,
              password:this.ruleForm.pass
            }).then((res)=>{
              if(res.data.errno){//如果登录失败 弹出失败提示
                console.log(1);
                this.$message.error('该用户未注册，请先注册');
                return
              }else{
                this.$message.success('恭喜你，登录成功');
                  localStorage.setItem('user',JSON.stringify({
                    username:res.data.username,
                    isAdmin:res.data.isAdmin
                  }))
                setTimeout(function () {
                  this.$router.push('/')
                }.bind(this),500)

                //  this.$store.commit('saveUser',this.ruleForm.name);//commit触发saveUser函数

                // this.$router.push('/admin')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>

<style scoped lang="less">
  .bgc{
    height:100%;
    background:url("http://www.teenshare.club/wp-content/uploads/2017/10/2017103011335463.jpg") no-repeat center;
  }
  .demo-ruleForm{
    width:50%;
    height:50%;
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    a{
      color:#ccc
    }
  }
  @media screen and (max-width: 1300px) {


  }

  @media screen and (max-width: 750px) {
    .demo-ruleForm{
      width:100%;
      padding-right: 10%;
    }
  }

</style>
