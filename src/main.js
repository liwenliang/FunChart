import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import App from './App.vue'
import http from './http'
import router from './router'
import store from './store'

// import initMock from '../mock';

// 需要 mock 数据时请打开注释
// initMock();

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$dayjs = dayjs
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(dayjs)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('vue-drag-resize', VueDragResize)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
