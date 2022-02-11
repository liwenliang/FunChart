<template>
  <div class="header">
    <div class="filename">{{ $parent.title }}</div>
    <i class="btn iconfont icon-preview" :class="{ active: $parent.preview }" @click="$parent.preview = !$parent.preview"></i>
    <div class="publish-btn" @click="saveChartData">发布</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title
    }
  },
  methods: {
    saveChartData() {
      this.$parent.saveChartData()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  background: #333e;
}

.filename {
  flex: 1;
  color: #fff;
  font-size: 16px;
  text-align: center;
}

.btn {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: #aaa;
  line-height: 32px;
  text-align: center;
  border-radius: 18px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #666;
    cursor: pointer;
  }

  .iconfont {
    font-size: 32px;
  }

  &.active {
    color: #409eff;
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.publish-btn {
  height: 36px;
  padding: 0 18px;
  color: #fff;
  line-height: 36px;
  background: #353535;
  border-radius: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: #666;
    cursor: pointer;
  }
}
</style>
