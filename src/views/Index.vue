<template>
  <div>
    <div class="screen">
      <div class="logo">ChartFun</div>
      <div class="desc">一站式数据大屏制作平台</div>
      <transition name="slide-fade">
        <div v-if="show" class="login-box">
          <div class="radio-group">
            <div class="radio-btn" :class="{ active: tab == 'login' }" @click="tab = 'login'">登录</div>
            <div class="radio-btn" :class="{ active: tab == 'reg' }" @click="tab = 'reg'">注册</div>
          </div>
          <el-input v-model="form.user" placeholder="请输入用户名"></el-input>
          <el-input v-model="form.password" placeholder="请输入密码" :type="tab == 'login' ? 'password' : 'text'" style="margin-top: 10px"></el-input>
        </div>
      </transition>
      <div class="btn-wrapper"><span class="btn" @click="handleClick">进入系统</span></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import md5 from 'js-md5'

export default {
  data() {
    return {
      show: false,
      tab: 'login',
      form: {
        user: '',
        password: ''
      }
    }
  },
  mounted() {},
  methods: {
    handleClick() {
      if (!this.show) {
        if (localStorage.getItem('uid')) {
          this.$router.push('console')
        } else {
          this.show = true
        }
      } else {
        // 开始检查
        const md5pass = md5(this.form.password) // 对密码进行MD5加密
        this.$http
          .post(`/user/${this.tab}`, {
            user: this.form.user,
            pass: md5pass
          })
          .then((res) => {
            const { errno, errmsg, data } = res.data
            if (errno === 0) {
              this.$message({
                type: 'success',
                message: '验证成功'
              })
              localStorage.setItem('uid', data.uid)
              localStorage.setItem('user', data.name)
              this.$router.push('console')
            } else {
              this.$message.error(errmsg)
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: url('../assets/img/bg.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
}

.logo {
  height: 72px;
  margin-top: 180px;
  color: #515151;
  font-weight: bold;
  font-size: 36px;
  line-height: 72px;
  text-align: center;

  &::after {
    color: rgba(255, 0, 0, 0.6);
    font-size: 42px;
    content: '.';
  }
}

.desc {
  margin: 0 0 40px;
  color: #808080;
  font-weight: 300;
  font-size: 16px;
  font-family: 'Noto Sans SC', sans-serif;
  letter-spacing: 4px;
  text-align: center;
}

.login-box {
  width: 240px;
  margin: 20px auto 40px;
  padding: 0 40px 36px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);

  .radio-group {
    text-align: center;

    .radio-btn {
      display: inline-block;
      margin: 10px 10px;
      padding: 10px 20px;
      color: #999;

      &.active {
        color: #212121;
        border-bottom: 2px solid #212121;
      }
    }
  }
}

.btn-wrapper {
  margin-top: 40px;
  text-align: center;

  a {
    color: #fff;
    text-decoration: none;
  }

  .btn {
    padding: 12px 32px;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    transition: background 0.3s ease;

    &:hover {
      background: #409eff;
      cursor: pointer;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
