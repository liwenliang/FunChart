<template>
  <el-container>
    <el-aside width="240px"><NavMenu></NavMenu></el-aside>
    <el-container>
      <el-header height="96px">
        <PageHeader></PageHeader>
      </el-header>
      <el-main>
        <router-view :user="user"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './NavMenu.vue'
import PageHeader from './PageHeader.vue'

export default {
  components: {
    NavMenu,
    PageHeader
  },
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  position: fixed;
  right: 0;
  left: 240px;
  z-index: 10;
  padding: 0;
  background: rgba(255, 255, 255, 0.94);
  // box-shadow: 0 0 2px #eee;
}

.el-main {
  padding: 106px 40px 0;
}
</style>
