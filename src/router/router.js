/*
 * @Author: tuWei
 * @Date: 2022-06-30 18:46:20
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-05 15:34:03
 */
import Home from '../pages/home.vue'
import Register from '../pages/register.vue'
import List from '../pages/list.vue'
import Login from '../pages/login.vue'


const routes = [
  {
    path: '/', component: Home,
  },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,
    children: [
      { path: '/home/list', component: List },
    ]
  },
]

export default routes