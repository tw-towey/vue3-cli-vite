<!--
 * @Author: tuWei
 * @Date: 2022-07-04 16:57:04
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-06 12:34:42
-->
<template>

  <el-row class="tac h100">
    <el-col :span="4" class="h100">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo bg-gray-50"
        @select="handleOpen"
      >
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>注册</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>人员列表</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="h100">
      <div class="flex flex-col">
        <div class="flex text-base flex-row-reverse items-center  justify-items-center bg-blue-50 h-12">
          <button class="cursor-pointer px-2.5 h-8 mx-1.5 bg-blue-400" @click="login">登录</button>
          <button class="cursor-pointer px-2.5 h-8 mx-1.5 bg-blue-400">张三</button>
          <button class="cursor-pointer px-2.5 h-8 mx-1.5 bg-blue-400">注册</button>
        </div>
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'

const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  if(key === '1') {
    router.push({
      path: '/register',
    })
  }else if(key === '2'){
    router.push({
      path: '/home/list',
    })
  }
}
const login = ()=> {
  router.push({
    path: '/login',
  })
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>