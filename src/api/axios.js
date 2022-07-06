/*
 * @Author: tuWei
 * @Date: 2022-06-30 19:06:57
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 00:41:14
 */
import axios from 'axios'//引入axios
axios.defaults.crossDomain = true;
axios.defaults.timeout = 120000;
// axios.defaults.withCredentials = true
// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
import { getCookie } from "./utils"
axios.interceptors.request.use(
  cfg => {
    if (getCookie('access_token')) {
      cfg.headers.common['Authorization'] = 'Bearer ' + getCookie('access_token');
    }
    return cfg;
  },
  err => Promise.resolve(err)
);

axios.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;


