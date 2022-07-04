/*
 * @Author: tuWei
 * @Date: 2022-06-30 18:41:36
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 16:45:12
 */
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,createWebHashHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.css'
import routes from './router/router'

// import axios from './api/axios.js';
const app = createApp(App);
// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
// app.config.globalProperties.$api = axios;
app.use(router);
app.use(ElementPlus)
app.mount('#app')
