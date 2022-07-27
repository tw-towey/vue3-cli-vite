<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:57:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-27 13:22:09
-->
<template>
<div class="bg-green-500 bg-opacity-25 h-full">
   <h2 class="p-10 h-12 text-center leading-10 text-2xl text-pink-500">
  登录
  </h2>
  <div>
    <el-form class="w-96 p-8 bg-opacity-70 bg-indigo-300" style="margin: 0 auto" :model="form" label-width="80px">
      <el-form-item label="用户名" >
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <div class="mt-8">
        <el-button @click="onSave">login</el-button>
        <!-- <el-button type="success" @click="changeform">忘记密码</el-button> -->
        <el-button @click="register">注册</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import axios from '../api/axios'//引入axios
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api/env.js'
import { getCookie, setCookie } from "../api/utils"

const router = useRouter();
const form = reactive({
  username: 'admin',
  password: '123456'
})

const register = ()=> {
  router.push({
    path: '/register',
  })
}

const onSave = ()=>{
  axios.post(api + '/auth/login', { ...form })
  .then(function (res) {
    if(res['access_token']){
      setCookie('access_token', res['access_token'])
    }
    if(res.data){
      localStorage.setItem('userInfo', JSON.stringify(res.data));
    }
    if(res['flag']){
      router.push({
        path: '/home/list',
      })
    }else{
      ElMessage({
        showClose: true,
        message: res['message'],
        type: 'success',
      });
    }
  })
};


</script>