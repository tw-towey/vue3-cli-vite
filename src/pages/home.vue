<!--
 * @Author: tuWei
 * @Date: 2022-07-04 16:57:04
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 00:59:11
-->
<template>
  <div class="h-full">
    <el-row class="h-full">
      <el-col :span="4" class="h-full bg-green-50">
        <el-menu :default-active="acIndex" class="h-full  el-menu-vertical-demo" @select="handleOpen">
          <el-menu-item v-for="item in menuList" :index="item.path" :key="item">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="h-full">
        <div class="flex flex-col h-full">
          <div class="flex text-base flex-row-reverse items-center justify-items-center h-12 bg-blue-50">
            <el-button link v-if="userInfo.id" type="primary" class="mr-2" @click="editFn">编辑信息</el-button>
            <el-button link v-else type="primary" @click="toLogin">登录</el-button>
            <el-button link v-if="userInfo.id" type="primary" @click="toloOut">退出</el-button>
            <span class="mr-2">欢迎您,{{ userInfo.username }}</span>
          </div>
          <router-view style="height: calc(100% - 3rem)"></router-view>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-model="outerVisible" width="800px" :title="'编辑信息'">
      <div style="height: 600px; overflow: auto">
        <Register v-if="outerVisible" @close-model="closeModel" :userId="userInfo.id"></Register>
      </div>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { getCookie } from '../api/utils';
import { api } from '../api/env.js'
import Register from './register.vue';


const router = useRouter();
const route = useRoute();
const outerVisible = ref(false)
let user = localStorage.getItem('userInfo') || '{}';
const userInfo = reactive(JSON.parse(user));
const acIndex = ref(route.path);

const toLogin = () => {
  router.push({
    path: '/login',
  })
}

const editFn = (r) => {
  outerVisible.value = true;
}

const toloOut = () => {
  localStorage.setItem('userInfo', '{}');
  router.push({
    path: '/login',
  })
}

const closeModel = (flag) => {
  outerVisible.value = false;
}

if (!userInfo.id) {
  toLogin();
}

const menuList = reactive([
  {
    name: '人员列表',
    path: '/home/list'
  },
  {
    name: '文章列表',
    path: '/home/posts'
  },
  {
    name: '文章分类',
    path: '/home/category'
  },
  {
    name: '聊天',
    path: '/home/chat'
  },
]);

const handleOpen = (key: string, keyPath: string[]) => {
  acIndex.value = key;
  router.push({
    path: key,
  })
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>