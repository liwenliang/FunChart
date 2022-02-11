<template>
  <div>
    <div class="enter-fullscreen" @click="toggleFullscreen(document)">切换全屏状态</div>
    <div ref="screen" class="screen" :style="screenStyle" @click.self="handleActivated(-1)">
      <div
        v-for="(item, index) in chartData.elements"
        :key="index"
        class="component"
        :style="{
          width: item.w + 'px',
          height: item.h + 'px',
          left: item.x + 'px',
          top: item.y + 'px',
          zIndex: chartData.elements.length - index
        }"
      >
        <div v-if="item.data.type == 'chart'" class="filler" :style="{ width: '100%', height: '100%', backgroundColor: item.bgcolor }">
          <ve-map
            v-if="item.data.settings.type == 'map'"
            :width="item.w + 'px'"
            :height="item.h + 'px'"
            :data="item.data.generated"
            :settings="item.data.settings"
            @ready-once="generateData(item)"
          ></ve-map>
          <ve-liquidfill
            v-else-if="item.data.settings.type == 'liquidfill'"
            :width="item.w + 'px'"
            :height="item.h + 'px'"
            :data="item.data.generated"
            @ready-once="generateData(item)"
          ></ve-liquidfill>
          <ve-chart v-else :width="item.w + 'px'" :height="item.h + 'px'" :data="item.data.generated" :settings="item.data.settings" @ready-once="generateData(item)"></ve-chart>
        </div>
        <div v-if="item.data.type == 'text'" class="filler" :style="{ width: '100%', height: '100%', backgroundColor: item.bgcolor }">
          <div
            class="textcontainer"
            :style="{
              fontFamily: item.data.datacon.fontFamily,
              fontWeight: item.data.datacon.bold ? 'bold' : 'normal',
              fontStyle: item.data.datacon.italic ? 'italic' : 'normal',
              color: item.data.datacon.color,
              fontSize: item.data.datacon.fontSize + 'px',
              textStroke: item.data.datacon.stroke ? item.data.datacon.strokeSize + 'px ' + item.data.datacon.strokeColor : '0',
              textShadow: item.data.datacon.shadow ? '5px 5px ' + item.data.datacon.shadowBlur + 'px ' + item.data.datacon.shadowColor : 'none'
            }"
            v-text="item.data.datacon.text"
          ></div>
        </div>
        <div v-if="item.data.type == 'image'" class="filler" :style="{ width: '100%', height: '100%', backgroundColor: item.bgcolor }">
          <div
            class="imagecontainer"
            :style="{
              backgroundImage: `url(${item.data.datacon.img})`,
              backgroundSize: item.data.datacon.imgSize,
              opacity: item.data.datacon.opacity
            }"
          >
            <div v-show="!item.data.datacon.img" class="placeholder"></div>
          </div>
        </div>
        <div v-if="item.data.type == 'border'" class="filler" :style="{ width: '100%', height: '100%', backgroundColor: item.bgcolor }">
          <div class="bordercontainer" :class="'border' + item.data.datacon.borderId" :style="{ opacity: item.data.datacon.opacity }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      chartData: {},
      document: document.documentElement,
      interval: {}
    }
  },
  computed: {
    screenStyle() {
      return {
        width: this.chartData.w + 'px',
        height: this.chartData.h + 'px',
        backgroundColor: this.chartData.bgcolor,
        backgroundImage: `url(${this.chartData.bgimage})`,
        backgroundSize: this.chartData.bgimagesize
      }
    }
  },
  mounted() {
    this.$http
      .get('/chart/view/' + this.$route.params.id)
      .then((res) => {
        const { errno, data } = res.data
        if (errno === 0) {
          this.title = data.title
          document.title = data.title
          this.chartData = data.chartData
        }
      })
      .catch(() => {})
  },
  methods: {
    generateData(item) {
      if (item.data.datacon.type == 'raw') {
        item.data.generated = item.data.datacon.data
      } else if (item.data.datacon.type == 'connect') {
        this.$http
          .get('/connect/' + item.data.datacon.connectId)
          .then((res) => {
            const { errno, data } = res.data
            if (errno === 0) {
              // console.log(data.data);
              item.data.generated = data.data
            }
          })
          .catch(() => {})
      } else if (item.data.datacon.type == 'get') {
        //修复bug 此处interval没有定义导致报错
        clearInterval(this.interval)
        let time = item.data.datacon.interval ? item.data.datacon.interval : 1
        this.interval = setInterval(() => {
          this.$http
            .get(item.data.datacon.getUrl)
            .then((res) => {
              item.data.generated = res.data
            })
            .catch(() => {})
        }, time * 1000)
      }
    },
    toggleFullscreen(element) {
      let ele = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
      if (ele != null) {
        // 关闭全屏
        if (document.exitFullScreen) {
          document.exitFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (element.msExitFullscreen) {
          element.msExitFullscreen()
        }
      } else {
        // 打开全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.enter-fullscreen {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  color: #fff;
  font-size: 24px;
  line-height: 80px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;

  .component {
    position: absolute;
  }

  .filler {
    .textcontainer {
      word-wrap: break-word;
    }

    .imagecontainer {
      width: 100%;
      height: 100%;

      .placeholder {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }
    }

    .bordercontainer {
      box-sizing: border-box;
      width: 100%;
      height: 100%;

      &.border1 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/1.png') 50;
      }

      &.border2 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/2.png') 50;
      }

      &.border3 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/3.png') 50;
      }
    }
  }
}
</style>
