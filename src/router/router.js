/*
 * @Author: tuWei
 * @Date: 2022-06-30 18:46:20
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-26 10:05:53
 */
import Home from '../pages/home.vue'
import Register from '../pages/register.vue'
import List from '../pages/list.vue'
import Login from '../pages/login.vue'
import Posts from '../pages/posts.vue'
import Posts_AddEdit from '../pages/postAdd_Edit.vue'
import Category from '../pages/category.vue'
import CategoryAdd_Edit from '../pages/categoryAdd_Edit.vue'
import Chat from '../pages/chat.vue'


const routes = [
  {
    path: '/', 
    component: List,
    redirect: '/home/list',
  },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
    path: '/', component: Home,
    children: [
      { path: '/home/list', component: List },
      { path: '/home/posts', component: Posts },
      { path: '/home/posts/add_edit', component: Posts_AddEdit },
      { path: '/home/category', component: Category },
      { path: '/home/category/Add_Edit', component: CategoryAdd_Edit },
      { path: '/home/chat', component: Chat },
    ]
  },
]

export default routes