<template>
  <div class="header">
    <div class="page-title">
      <span>{{ pageTitle }}</span>
    </div>
    <div class="icon-row"></div>
    <el-dropdown>
      <div class="avatar-image"></div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled="disabled">{{ user.username }}</el-dropdown-item>
        <el-dropdown-item divided="divided" @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user')
      }
    }
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title
    }
  },
  mounted() {
    if (!this.user.uid) {
      this.logout()
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('uid')
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 40px 40px 0;

  .page-title {
    flex: 1;
    font-weight: normal;
    font-size: 20px;
  }

  .icon {
    display: inline-block;
    margin-right: 14px;
    font-size: 20px;

    &:last-of-type {
      margin-right: 28px;
    }
  }

  .avatar-image {
    width: 32px;
    height: 32px;
    background: #ccc;
    background-image: url('../../assets/img/profile.jpg');
    background-size: 32px;
    border-radius: 50%;
  }
}
</style>
