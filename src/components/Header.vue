<template>
  <div class="header-container">
    <div class="avatar_box">
      <img src="@/assets/logo.png" alt="" />
      <p id="blog">Xuan'blog</p>
    </div>
    <div class="menu">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">
          <i class="el-icon-search" v-if="!isShow" @click="changeisShow"></i>
          <el-input @blur="onblur" class="search" placeholder="请输入搜索内容" v-else ref="search"></el-input>
        </el-menu-item>
        <el-menu-item index="2">首页</el-menu-item>
        <el-submenu index="3">
          <template slot="title">文章</template>
          <el-menu-item index="2-1">后端</el-menu-item>
          <el-menu-item index="2-2">小程序</el-menu-item>
          <el-menu-item index="2-3">前端</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">友链</el-menu-item>
        <el-submenu index="5" class="userInfo">
          <template slot="title"> <el-avatar src="http://127.0.0.1:3000/uploads/heima.png"></el-avatar></template>
          <el-menu-item index="5-3">{{ username }}</el-menu-item>
          <el-menu-item index="5-4">修改密码</el-menu-item>
          <el-menu-item index="5-2" @click="showUserInfo">个人信息</el-menu-item>
          <el-menu-item index="5-1" @click="loginOut">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog @close="resetInfo" :lock-scroll="false" title="提示" :visible.sync="userInfoDialogVisible" width="50%">
      <el-form :model="userinfo" ref="userInfoRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userinfo.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input disabled type="password" v-model="userinfo.upwd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input disabled v-model="userinfo.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      userInfoDialogVisible: false,
      query: {
        username: window.sessionStorage.getItem('loginUsername')
      },
      userinfo: {},
      username: window.sessionStorage.getItem('loginUsername')
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    changeisShow() {
      this.isShow = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    onblur() {
      this.isShow = false
    },
    loginOut() {
      window.sessionStorage.removeItem('token')
      this.$notify.success({
        message: '退出成功',
        showClose: false,
        duration: 1500
      })
      this.$router.push('/login')
    },
    showUserInfo() {
      this.userInfoDialogVisible = true
    },
    async getUserInfo() {
      const { data: res } = await this.$http.get('/my/userinfo/?username=' + this.query.username)
      if (res.meta.status !== 200) return this.$message.error('获取信息失败,请稍后再试')
      this.userinfo = res.data
      console.log(this.userinfo)
    },
    async updateUserInfo() {
      const { data: res } = await this.$http.post('/my/userinfo', {
        uname: this.userinfo.uname,
        email: this.userinfo.email
      })
      if (res.meta.status !== 200) return this.$message.error('更新用户信息失败')
      this.$message.success('更新用户信息成功')
      this.userInfoDialogVisible = false
    },
    resetInfo() {
      this.$refs.userInfoRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  // border-bottom: 1px solid red;
}
* {
  padding: 0;
  margin: 0;
  font-family: monaco, Consolas, Liberation Mono, Courier, monospace;
}
.avatar_box {
  margin: 10px 0;
  width: 50px;
  height: 50px;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    height: 80%;
    border-radius: 100%;
  }
  #blog {
    font-weight: bold;
  }
}
.input-underline {
  border-bottom: 1px solid #dbdbdb;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
</style>
