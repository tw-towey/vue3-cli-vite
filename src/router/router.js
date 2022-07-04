/*
 * @Author: tuWei
 * @Date: 2022-06-30 18:46:20
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 17:03:03
 */
import Home from '../pages/home.vue'
import Register from '../pages/register.vue'
import List from '../pages/list.vue'

const routes = [
  {
    path: '/', component: Home,
  },
  {
    path: '/home', component: Home,
    children: [
      { path: '/home/register', component: Register },
      { path: '/home/list', component: List },
    ]
  },
]

export default routes