<template>
  <div class="toolbar">
    <div class="toolbox">
      <div class="tool-list">
        <div v-for="item in btnList" :key="item.key" class="btn" :class="{ active: panelKey === item.key }" @click="showPanel(item.key)">
          <i class="iconfont" :class="'icon-' + item.key"></i>
        </div>
      </div>
      <div class="btn" :class="{ active: panelKey === 'layers' }" @click="showPanel('layers')"><i class="iconfont icon-layer"></i></div>
    </div>
    <div v-show="panelKey" class="collapse-panel">
      <SidePanel :panel-key="panelKey"></SidePanel>
    </div>
  </div>
</template>

<script>
import SidePanel from './SidePanel.vue'

export default {
  components: {
    SidePanel
  },
  data() {
    return {
      panelKey: '',
      btnList: [
        {
          key: 'chart',
          name: '图表'
        },
        {
          key: 'text',
          name: '文字'
        },
        {
          key: 'picture',
          name: '图片'
        },
        {
          key: 'tools',
          name: '组件'
        }
      ],
      showCollapsePanel: false
    }
  },
  computed: {
    chartData() {
      return this.$parent.chartData
    }
  },
  methods: {
    showPanel(key) {
      if (this.panelKey === key) {
        this.panelKey = ''
      } else {
        this.panelKey = key
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  height: 100%;
}

.toolbox {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffffe9;
  border-right: 1px solid rgba(0, 0, 0, 0.02);

  .tool-list {
    flex: 1;
    margin-top: 4px;
  }

  .btn {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 5px;
    color: #999;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      color: #666;
      background-color: rgba(64, 160, 255, 0.1);
      cursor: pointer;
    }

    &.active {
      color: #409eff;
      background-color: rgba(64, 160, 255, 0.1);
    }

    .iconfont {
      font-size: 24px;
    }
  }
}

.collapse-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  z-index: 10;
  width: 250px;
}
</style>
