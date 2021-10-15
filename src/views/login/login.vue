<template>
  <div class="container">
    <div class="login">
      <div class="title">
        <img class="logo" :src="require('@/assets/logo.png')" />
        <h1 class="name">{{name}}</h1>
      </div>
      <div class="form">
        <a-form :form="form" autocomplete="off">
          <a-form-item hasFeedback>
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入用户名' }] },
              ]"
              size="large"
              placeholder="用户名"
            >
              <a-icon slot="prefix" type="user" class="form-prefix" />
            </a-input>
          </a-form-item>
          <a-form-item hasFeedback>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }] },
              ]"
              size="large"
              type="password"
              placeholder="密码"
            >
              <a-icon slot="prefix" type="lock" class="form-prefix" />
            </a-input>
          </a-form-item>
        </a-form>
        <a-button class="login-button" type="primary" size="large" @click="handleSubmit">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 系统名称
      name: window.custom.systemName.toUpperCase(),
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit () {
      let self = this
      self.form.validateFields((err, values) => {
        if (err) return
        self.$store.dispatch('user/Navigation').then(() => {
          // console.log(self.$router.getRoutes())
          self.$router.push('/')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #243B55, #141E30);
  }
  .login{
    width: 340px;
    padding-bottom: 130px;
    .title{
      height: 100px;
      display: flex;
      align-items: center;
      .logo{
        height: 50px;
        width: 50px;
        margin: 12px;
      }
      .name{
        color: #fff;
      }
    }
    .form{
      .login-button{
        width: 100%;
      }
      ::v-deep.ant-input-prefix{
        margin-right: 8px;
      }
      .form-prefix{
        font-size: 16px;
        color: rgba(0,0,0,.25)
      }
    }
  }
</style>
