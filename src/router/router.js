/*
 * @Author: tuWei
 * @Date: 2022-06-30 18:46:20
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 16:00:35
 */
import Home from '../pages/home.vue'
import Register from '../pages/register.vue'
import List from '../pages/list.vue'
import Login from '../pages/login.vue'
import Posts from '../pages/posts.vue'
import Posts_AddEdit from '../pages/postAdd_Edit.vue'

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
      { path: '/home/posts', component: Posts },
      { path: '/home/posts/add_edit', component: Posts_AddEdit },
    ]
  },
]

export default routes