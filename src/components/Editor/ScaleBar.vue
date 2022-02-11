<template>
  <div class="panel">
    <div class="control-bar">
      <i class="btn el-icon-minus" @click="zoomOut"></i>
      <div class="scale-mount">{{ scale * 100 }}%</div>
      <i class="btn el-icon-plus" @click="zoomIn"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scale: 0.7
    }
  },
  watch: {
    scale() {
      this.$emit('update:scale', this.scale)
    }
  },
  methods: {
    zoomOut() {
      if (this.scale > 0.1) {
        this.scale = parseFloat((this.scale - 0.1).toFixed(1))
      }
    },
    zoomIn() {
      if (this.scale < 1) {
        this.scale = parseFloat((this.scale + 0.1).toFixed(1))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  align-items: center;
  width: 130px;
  background: #ffffffe9;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.control-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 6px;
  color: #666;
  text-align: center;

  .btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    border-radius: 14px;
    transition: all 0.3s ease;

    &:hover {
      color: #333;
      background-color: #ddd;
      cursor: pointer;
    }
  }

  .scale-mount {
    flex: 1;
    font-size: 14px;
  }
}

.canvas-view {
  position: relative;
  width: 144px;
  height: 120px;
  margin: 6px 8px;
  background: #1e1e1ee9;
}

.canvas-box {
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
}

.canvas-box-dragging,
.canvas-box-dragging:hover {
  background: rgba(255, 255, 255, 0.16);
}
</style>
