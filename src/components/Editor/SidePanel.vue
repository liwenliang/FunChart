<template>
  <div class="panel">
    <div v-if="panelKey === 'layers'" class="title">
      <span>图层 ({{ chartData.elements.length }})</span>
    </div>
    <div v-else-if="panelKey !== ''" class="title">
      <span>{{ componentList[panelKey].name }} ({{ componentList[panelKey].children.length }})</span>
    </div>
    <div v-if="panelKey === 'layers'" class="layer-list">
      <draggable v-model="chartData.elements" ghost-class="ghost" @start="handleLayerListDragStart" @end="handleLayerListDragEnd">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            v-for="(item, index) in chartData.elements"
            :key="item.name"
            class="layer-list-item"
            :class="{ active: index === $parent.$parent.currentElementIndex }"
            @click="$parent.$parent.setActiveComponentByIndex(index)"
          >
            <div class="name">{{ item.name }}</div>
            <i class="el-icon-delete icon" @click="handleDeleteComponent(index)"></i>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div v-else-if="panelKey !== ''" class="component-list">
      <div v-for="item in componentList[panelKey].children" :key="item.name" class="list-item" @click="handleAddComponent(item)">
        <div class="img-wrapper"><img :src="item.img" /></div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
/* eslint-disable */

export default {
  props: ['panelKey'],
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      componentList: {
        chart: {
          name: '图表',
          children: [
            {
              id: 'line',
              name: '折线图',
              img: require('@/assets/img/charts/line.png')
            },
            {
              id: 'histogram',
              name: '柱状图',
              img: require('@/assets/img/charts/histogram.png')
            },
            {
              id: 'bar',
              name: '条形图',
              img: require('@/assets/img/charts/bar.png')
            },
            {
              id: 'pie',
              name: '饼图',
              img: require('@/assets/img/charts/pie.png')
            },
            {
              id: 'ring',
              name: '环状图',
              img: require('@/assets/img/charts/ring.png')
            },
            {
              id: 'funnel',
              name: '漏斗图',
              img: require('@/assets/img/charts/funnel.png')
            },
            {
              id: 'radar',
              name: '雷达图',
              img: require('@/assets/img/charts/radar.png')
            },
            // {
            //   id: "map-world",
            //   name: "世界地图",
            //   img: require("@/assets/img/charts/map-world.png")
            // },
            {
              id: 'map',
              name: '中国地图',
              img: require('@/assets/img/charts/map-china.png')
            },
            // {
            //   id: "sankey",
            //   name: "桑基图",
            //   img: require("@/assets/img/charts/sankey.png")
            // },
            // {
            //   id: "scatter",
            //   name: "散点图",
            //   img: require("@/assets/img/charts/scatter.png")
            // },
            // {
            //   id: "candle",
            //   name: "K线图",
            //   img: require("@/assets/img/charts/candle.png")
            // },
            // {
            //   id: "gauge",
            //   name: "仪表盘",
            //   img: require("@/assets/img/charts/gauge.png")
            // },
            {
              id: 'liquidfill',
              name: '水球图',
              img: require('@/assets/img/charts/liquidfill.png')
            }
            // {
            //   id: "wordcloud",
            //   name: "词云图",
            //   img: require("@/assets/img/charts/wordcloud.png")
            // }
          ]
        },
        text: {
          name: '文本',
          children: [
            {
              id: 'text',
              name: '文本',
              img: require('@/assets/img/charts/text.png')
            }
          ]
        },
        picture: {
          name: '图片',
          children: [
            {
              id: 'image',
              name: '图片',
              img: require('@/assets/img/charts/image.png')
            }
          ]
        },
        tools: {
          name: '组件',
          children: [
            {
              id: 'border',
              name: '边框',
              img: require('@/assets/img/charts/border.png')
            }
          ]
        }
      },
      layerList: []
    }
  },
  computed: {
    chartData() {
      return this.$parent.chartData
    }
  },
  methods: {
    handleLayerListDragStart(e) {
      this.drag = true
      this.$parent.$parent.setActiveComponentByIndex(e.oldIndex)
    },
    handleLayerListDragEnd(e) {
      this.drag = false
      this.$parent.$parent.setActiveComponentByIndex(e.newIndex)
    },
    handleAddComponent(item) {
      let initData = {}
      if (item.id == 'text') {
        initData = {
          type: 'text',
          datacon: {
            text: '请输入文字',
            color: '#000000',
            fontSize: 48,
            fontFamily: 'ZCOOL QingKe HuangYou',
            bold: false,
            italic: false,
            stroke: false,
            strokeColor: '#ffffff',
            strokeSize: 2,
            shadow: false,
            shadowColor: '#ff0000',
            shadowBlur: 10
          }
        }
      } else if (item.id == 'image') {
        initData = {
          type: 'image',
          datacon: {
            img: '',
            imgSize: 'cover',
            opacity: 1
          }
        }
      } else if (item.id == 'border') {
        initData = {
          type: 'border',
          datacon: {
            borderId: 1,
            opacity: 1
          }
        }
      } else {
        initData = {
          type: 'chart',
          settings: {
            type: item.id
          },
          datacon: {
            type: 'raw',
            connectId: '',
            data: {
              columns: ['日期', '访问用户'],
              rows: [
                { 日期: '1月1日', 访问用户: 1523 },
                { 日期: '1月2日', 访问用户: 1223 },
                { 日期: '1月3日', 访问用户: 2123 },
                { 日期: '1月4日', 访问用户: 4123 },
                { 日期: '1月5日', 访问用户: 3123 },
                { 日期: '1月6日', 访问用户: 7123 }
              ]
            },
            getUrl: '',
            interval: 2
          },
          generated: {
            columns: ['日期', '访问用户'],
            rows: [
              { 日期: '1月1日', 访问用户: 1523 },
              { 日期: '1月2日', 访问用户: 1223 },
              { 日期: '1月3日', 访问用户: 2123 },
              { 日期: '1月4日', 访问用户: 4123 },
              { 日期: '1月5日', 访问用户: 3123 },
              { 日期: '1月6日', 访问用户: 7123 }
            ]
          }
        }
      }
      const component = {
        name: '新建图层' + (this.chartData.elements.length + 1),
        x: 10,
        y: 10,
        w: 400,
        h: 200,
        bgcolor: 'rgba(0, 0, 0, 0)',
        active: false,
        data: initData
      }
      this.$parent.$parent.addComponent(component)
    },
    handleDeleteComponent(index) {
      this.$parent.$parent.deleteComponent(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  background: #ffffffe9;
  box-shadow: 4px 0 4px #00000005;
}

.title {
  padding: 10px 16px 16px;
  color: #999;
}

.layer-list {
  flex: 1;
  padding: 0;
  overflow: scroll;

  .layer-list-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    margin-bottom: -1px;
    padding: 0 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    border-right: 6px solid transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    transition: background 0.3s ease;

    .icon {
      float: right;
      color: #999;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }

    &.active {
      background: rgba(64, 160, 255, 0.06);
      border-right: 6px solid #409eff7d;
    }

    .name {
      flex: 1;
      color: #777;
    }

    &:hover {
      background: rgba(64, 160, 255, 0.06);
      opacity: 1;

      .icon {
        opacity: 1;
      }
    }
  }
}

.component-list {
  flex: 1;
  padding: 0 10px 0 16px;
  overflow: scroll;

  .list-item {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
    margin-bottom: 12px;
    padding: 5px 0;
    text-align: center;
    background: rgba(64, 160, 255, 0.06);
    border: 1px solid rgba(64, 160, 255, 0.1);
    opacity: 0.6;
    transition: opacity, background 0.3s ease;

    .name {
      height: 20px;
      color: #777;
      font-size: 13px;
      line-height: 20px;
    }

    &:hover {
      background: rgba(64, 160, 255, 0.1);
      border: 1px solid #409eff;
      cursor: pointer;
      opacity: 0.8;

      .name {
        color: #666;
      }
    }

    .img-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80px;

      img {
        height: 54px;
      }
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  background: #c8ebfb;
  opacity: 0.3;
}
</style>
