<template>
  <div class="login-container">
    <div class="login-box animate__animated" v-if="isLogin">
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <el-form ref="loginFormRef" :rules="loginFormRules" label-width="0px" class="login-form-box" :model="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="用户名" prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            placeholder="密码"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%; background: #505458; border: none margin-bottom:5px"
            @click="login"
            >登录</el-button
          >
          <span class="forget" @click="showDialog">忘记密码</span>
          <span class="register" @click="gotoResiter">没有账号？去注册</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-box animate__animated animate__flash reg-box" v-else>
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <el-form ref="RegFormRef" :rules="RegFormRules" label-width="0px" class="login-form-box" :model="RegForm">
        <!-- 用户名 -->
        <el-form-item prop="username" size="small">
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="RegForm.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email" size="small">
          <el-input placeholder="邮箱" prefix-icon="el-icon-message" v-model="RegForm.email"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" size="small" class="code">
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-chat-dot-round"
            v-model="RegForm.code"
            style="width: 65%"
          ></el-input>
          <el-button :disabled="disabled" @click="sendCode" style="width: 32%; margin-left: 10px">{{
            btntxt
          }}</el-button>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" size="small">
          <el-input
            placeholder="密码"
            show-password
            type="password"
            prefix-icon="el-icon-lock"
            v-model="RegForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%; background: #505458; border: none margin-bottom:5px"
            @click="Register"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="particles"
    >
    </vue-particles>
    <!-- 忘记密码对话框 -->
    <el-dialog
      title="忘记密码"
      :visible.sync="forgetDialogVisible"
      width="40%"
      :lock-scroll="false"
      @close="forgetFormClosed"
    >
      <el-form :model="forgetForm" ref="forgetFormRef" :rules="forgetFormRules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="forgetForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="forgetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetInfo">确 定</el-button>
        <el-button @click="forgetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetInfo">确 定</el-button>
        <el-button @click="forgetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login-xuan',
  data() {
    // 验证邮箱的规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (emailReg.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      isLogin: true,
      btntxt: '获取验证码',
      disabled: false,
      showLoading: false,
      showLoading1: false,
      showLoading2: false,
      time: 0,
      forgetDialogVisible: false,
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: window.sessionStorage.getItem('loginUsername') || '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '必须在 3 到 10 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码必须在 6 到 10 位之间', trigger: 'blur' }
        ]
      },
      RegForm: {
        username: '',
        password: '',
        email: '',
        code: ''
      },
      RegFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '必须在 3 到 10 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码必须在 6 到 10 位之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      forgetForm: {
        email: ''
      },
      forgetFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('输入的信息不合法')
        const { data: res } = await this.$http.post('/api/login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('用户名或密码错误')
        // this.$message.success('登录成功')
        this.$notify.success({
          message: '登录成功',
          showClose: false,
          duration: 1500
        })
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('loginUsername', this.loginForm.username)
        // window.sessionStorage.setItem('loginPassword', this.loginForm.password)
        // 1.1 项目中除了登陆之外的其他API接口，必须在登录之后才能访问
        // 1.2 token只应在当前网站打开期间生效，所以将token保存到sessionStroage中
        // 2. 通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push('/home')
      })
      // this.$message.success('登录成功')
    },
    gotoResiter() {
      this.isLogin = false
      this.$nextTick(() => {
        this.$refs.RegFormRef.resetFields()
        this.RegForm.username = ''
        this.RegForm.email = ''
      })
    },
    async Register() {
      const { data: res } = await this.$http.post('/api/register', this.RegForm)
      if (res.meta.status !== 200) return this.$message.error('注册失败，请稍后再试')
      this.$message.success('注册成功，已自动跳转到登录页')
      this.isLogin = true
      this.$refs.RegFormRef.resetFields()
    },
    async sendCode() {
      if (this.RegForm.email === '') {
        return this.$message.warning('请输入电子邮箱')
      }
      this.time = 35
      this.disabled = true
      this.timer()
      const { data: res } = await this.$http.get('/api/sendemail/register?email=' + this.RegForm.email)
      if (res.code === 200) return this.$message.success(res.msg)
      this.$message.error('发送邮箱失败,请稍后再试')
    },
    timer() {
      if (this.time > 0) {
        this.time--
        //                 console.log(this.time);
        this.btntxt = this.time + 's后重新获取验证码'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    showDialog() {
      this.forgetDialogVisible = true
    },
    resetInfo() {
      this.$refs.forgetFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('请填写邮箱信息')
        const { data: res } = await this.$http.post('/api/forget/user', {
          email: this.forgetForm.email
        })
        if (!res) {
          this.$message.success('您的个人信息已经发送至您的邮箱，请注意查收!')
          this.forgetDialogVisible = false
        } else {
          if (res.meta.code === 401) return this.$message.error('暂无此用户，请先去注册!')
        }
      })
    },
    forgetFormClosed() {
      this.$refs.forgetFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.login-container {
  // background-color: #2b4b6b;
  background-color: black;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 5%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    background-color: #fff;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login-form-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 15px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
    .register {
      position: fixed;
      right: 20px;
      bottom: -10px;
      font-size: 12px;
    }
    .forget {
      position: fixed;
      left: 20px;
      bottom: -10px;
      font-size: 12px;
    }
    .register:hover {
      cursor: pointer;
      color: skyblue;
      font-weight: bolder;
    }
    .forget:hover {
      cursor: pointer;
      color: skyblue;
      font-weight: bolder;
    }
  }
}
.reg-box {
  width: 450px;
  height: 350px;
  animation-duration: 0.8s;
}
.code {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-form-item.is-error {
  .el-input__inner {
    border-color: #dcdfe6 !important;
  }
}
.lizi {
  height: 100%;
}
.el-dialog__wrapper {
  overflow: hidden;
}
</style>
