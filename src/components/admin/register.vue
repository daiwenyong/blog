<template>
  <div class="bgc">
    <homeHeader></homeHeader>
    <div class="form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <!--<el-button type="primary" @click="loginForm('ruleForm')"> <--登录 </el-button>-->
        <el-button type="primary"><router-link :to="{path:'/login'}"> <--登录 </router-link>  </el-button>
        <el-button @click="registerForm('ruleForm')">注册</el-button>

      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules: {
          pass: [
            {  required: true,message:'密码不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '密码在 6 到 12 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            {  required: true,message:'用户名不能为空', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
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
              console.log(res);
              if(res.data.errno){//如果登录失败 弹出失败提示
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
      registerForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/form/register',{
              username:this.ruleForm.name,
              password:this.ruleForm.pass
            }).then((user)=>{
              if(user.data.errno){
                this.$message.error('该用户名已被注册');
                return;
              }
              this.$message.success('注册成功');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
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
  }
  a{
    color:#ccc
  }


  @media screen and (max-width: 750px) {
    .demo-ruleForm{
      width:100%;
      padding-right: 10%;
    }
  }

</style>
