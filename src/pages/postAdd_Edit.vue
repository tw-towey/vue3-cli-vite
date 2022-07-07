<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:57:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 23:46:17
-->
<template>
  <div class="p-4">
    <el-form :model="form" label-width="120px">
      <h2 class="text-2xl p-8" v-if="!userId">
        新增
      </h2>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="form.content" type="textarea" rows="8" />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.remake" type="textarea" rows="8" />
      </el-form-item>
      <el-form-item v-if="userId">
        <el-button @click="onSave" type="primary">保存</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';
import axios from '../api/axios'//引入axios
import Mock from 'mockjs'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter();
const route= useRoute();
console.log(route.query); 
const userInfo = JSON.parse(String(localStorage.getItem('userInfo')));
const userId = ref(route.query.id);
// do not use same name with ref
const form = reactive({
  title: '',
  content: '',
  remake: '',
});

const changeform = (res) => {
  const Obj = res || {};
  form.title = Obj.title;
  form.content = Obj.content || '';
  form.remake = Obj.remake || '';
};

const getDetailByUserId = (id) => {
  axios.get('http://127.0.0.1:4000/posts/queryById/' + id)
    .then(function (res) {
      console.log(res);
      changeform(res.data)
    })
}
const initData = () => {
  if (route.query) {
    getDetailByUserId(route.query.id);
  } else {
    changeform({});
  }
}

initData();
  const onSubmit = () => {
    axios.post('http://127.0.0.1:4000/posts/create', { ...form } )
    .then(function (res) {
      changeform({})
      router.push({
        path: '/home/posts',
      })
      ElMessage({
        showClose: true,
        message: res['message'],
        type: 'success',
      })
    })
};

const emit = defineEmits(['close-model'])

const onSave = () => {
  axios.post('http://127.0.0.1:4000/posts/updateById', { id: userId.value, ...form })
    .then(function (res) {
      ElMessage({
        showClose: true,
        message: res['message'],
        type: 'success',
      });
      emit('close-model', false);
    })
}

</script>