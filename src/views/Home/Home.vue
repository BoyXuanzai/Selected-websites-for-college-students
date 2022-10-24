<template>
  <div class="Home-container">
    <el-backtop :bottom="60"></el-backtop>
    <Header></Header>
    <div class="banner">
      <div class="banner-img"></div>
      <div class="focusinfo animate__animated animate__pulse">
        <div class="header-tou">
          <a href="javascript:;">
            <img src="@/assets/logo.png" alt="" class="avator" />
          </a>
        </div>
        <div class="encourage">Be encouraged in time, time waits for no one.</div>
        <div class="link">
          <span title="github" class="iconfont icon-github"></span>
          <span title="知乎" class="iconfont icon-shejiaotubiao-46"></span>
          <span title="gitee" class="iconfont icon-gitee"></span>
        </div>
      </div>
      <div class="slant-left"></div>
      <div class="slant-right"></div>
    </div>
    <div class="main-container">
      <div class="notify">
        <div class="quote">
          <i class="iconfont icon-shengxian-shuiguo" style="color: red; font-weight: 800"></i>
          及时当勉励，岁月不待人。欢迎访问我的博客.项目源码在上方
        </div>
      </div>
      <div class="top-feature">
        <!-- 聚焦 -->
        <section-title>
          <div style="display: flex; align-items: flex-end">
            聚焦
            <small-ico></small-ico>
          </div>
        </section-title>
        <div class="feature-content">
          <div class="feature-item" v-for="item in features" :key="item.title">
            <Feature :data="item"></Feature>
          </div>
        </div>
      </div>
      <main class="site-main" :class="{ search: hideSlogan }" v-loading="loading">
        <section-title v-if="!hideSlogan">推荐</section-title>
        <template v-for="item in postList">
          <post :post="item" :key="item.id"></post>
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import sectionTitle from '@/components/section-title'
import SmallIco from '@/components/small-icon.vue'
import Feature from '@/components/feature.vue'
import Post from '@/components/post.vue'
export default {
  props: ['cate', 'words'],
  data() {
    return {
      features: [
        {
          id: 1,
          title: 'Xuan',
          img: 'https://s1.ax1x.com/2020/05/14/YDfRnU.jpg'
        },
        {
          id: 2,
          title: '关于博主',
          img: 'https://storytale-public2.b-cdn.net/2021/08/16/0c9abba2-a80f-4a4b-866f-fc1225165fde-Education.png?height=410%201x,%20https://storytale-public2.b-cdn.net/2021/08/16/0c9abba2-a80f-4a4b-866f-fc1225165fde-Education.png?height=820%202x'
        },
        {
          id: 3,
          title: '文章归档',
          img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'
        }
      ],
      loading: false,
      postList: [
        {
          id: 1,
          img: 'http://zhouyi.run:5222/api/public/admin/getFiles?id=e52cfbc48528687fd6100e33e40f49ae.jpg&&mimetype=image/jpeg',
          title: 'VUE 自定义组件',
          isTop: true,
          pubTime: '2020-10-21 15:44:20',
          isHot: true,
          summary: 'VUE：自定义组件的 v-model',
          commentsCount: 100,
          viewsCount: 999
        },
        {
          id: 2,
          img: 'http://zhouyi.run:5222/api/public/admin/getFiles?id=e52cfbc48528687fd6100e33e40f49ae.jpg&&mimetype=image/jpeg',
          title: 'VUE 自定义组件',
          isTop: true,
          pubTime: '2020-10-21 15:44:20',
          isHot: true,
          summary: 'VUE：自定义组件的 v-model',
          commentsCount: 100,
          viewsCount: 999
        }
      ]
    }
  },
  methods: {
    async getarticleList() {
      const { data: res } = await this.$http.get('/my/article/list')
      if (res.meta.status !== 200) return this.$message.error('获取文章列表失败')
      this.postList = res.data
      console.log(typeof this.postList[0].create_time)
    }
  },
  created() {
    this.getarticleList()
  },
  components: {
    Header,
    sectionTitle,
    SmallIco,
    Feature,
    Post
  },
  computed: {
    searchWords() {
      return this.$route.params.words
    },
    category() {
      return this.$route.params.cate
    },
    hideSlogan() {
      return this.category || this.searchWords
    },
    notice() {
      return this.$store.getters.notice || '人生天地间，忽如远行客.'
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  list-style: none;
}
.Home-container {
  height: 2000px;
  // overflow: auto !important;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  letter-spacing: 1px;
}
a {
  text-decoration: none;
}
.banner {
  height: 550px;
  position: relative;
  margin-top: 80px;
  width: 100%;
  .banner-img {
    width: 100%;
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
    transition: unset;
    background-image: url('https://s1.ax1x.com/2020/05/23/YxaLMq.jpg');
  }
}
.focusinfo {
  position: absolute;
  top: 20%;
  left: 35%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid hsla(0, 0%, 100%, 0.3);
    overflow: hidden;
  }
}
.encourage {
  height: 50px;
  line-height: 40px;
  padding: 5px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.3);
  font-family: monaco, Consolas, Liberation Mono, Courier, monospace;
}
.link {
  margin-top: 10px;
}
.link span {
  margin: 10px;
}
.link span:hover {
  cursor: pointer;
}
.main-box {
  width: 100%;
  background-color: #fff;
}
.slant-left {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 100px solid #fff;
  border-right: 800px solid transparent;
  left: 0;
  bottom: 0;
}
.slant-right {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 100px solid #fff;
  border-left: 800px solid transparent;
  right: 0;
  bottom: 0;
}
.main-container {
  margin: 0 auto;
  padding: 0 10px;
  max-width: 800px;
}
.notify {
  margin: 60px 0;
  border-radius: 3px;
  .quote {
    padding: 20px;
    line-height: 25px;
    border-left: 3px solid #ff6d6d;
    background-color: #fbfbfb;
    border-radius: 3px;
    color: #aaa;
  }
}
.section-title {
  color: #757575;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 10px;
  line-height: 32px;
  border-bottom: 1px dashed #ececec;
}
section {
  display: block;
}
.section-title:hover {
  cursor: pointer;
}
.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 32.9%;
    }
  }
}
.site-main {
  padding-top: 80px;
  &.search {
    padding-top: 0;
  }
}
@media (max-width: 800px) {
  .top-feature {
    display: none;
  }

  .site-main {
    padding-top: 40px;
  }

  .site-content {
    .notify {
      margin: 30px 0 0 0;
    }
    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}
</style>
