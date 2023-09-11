import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import EventEmitter from 'eventemitter3'
import './assets/style/monolisa.css'
import './assets/style/reset.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// element icons
import * as Icons from "@element-plus/icons-vue";
import { ElLoadingDirective } from 'element-plus'
import 'nprogress/nprogress.css'
import './assets/iconfont/iconfont.css'
// alifont css
import "@/assets/alifont/iconfont.css";



const create = () => {
  const app = createApp(App)
  // 注册element Icons组件
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons);
  });
  app.config.globalProperties.$eventEmitter = new EventEmitter()
  app.use(ElementPlus)
  app.use(router)
  app.use(store)
  app.directive('loading', ElLoadingDirective)
  app.mount('#app')
}

const init = () => {
  store.dispatch('getGithubToken')
  create()
}
init()
