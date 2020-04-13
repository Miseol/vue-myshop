import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css'

// 配置请求的跟路径
import axios from 'axios' // for bubble theme
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置请求拦截器
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

// tree-table ，注册组件
Vue.component('tree-table', TreeTable)
// 富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')
  const hh = (dt.getHours() + 1 + '').padStart(2, '0')
  const mm = (dt.getMinutes() + 1 + '').padStart(2, '0')
  const ss = (dt.getSeconds() + 1 + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
