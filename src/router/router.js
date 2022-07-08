/*
 * @Author: tuWei
 * @Date: 2022-06-30 18:46:20
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 17:46:12
 */
import Home from '../pages/home.vue'
import Register from '../pages/register.vue'
import List from '../pages/list.vue'
import Login from '../pages/login.vue'
import Posts from '../pages/posts.vue'
import Posts_AddEdit from '../pages/postAdd_Edit.vue'
import Category from '../pages/category.vue'
import CategoryAdd_Edit from '../pages/categoryAdd_Edit.vue'


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
      { path: '/home/category', component: Category },
      { path: '/home/category/Add_Edit', component: CategoryAdd_Edit },

    ]
  },
]

export default routes