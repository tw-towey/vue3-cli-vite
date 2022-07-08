<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:57:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 17:42:39
-->
<template>
  <div class="p-4">
    <el-form :model="form" label-width="120px">
      <h2 class="text-2xl p-3 text-center">
        新增
      </h2>
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input v-model="form.remake" type="textarea" rows="2" />
      </el-form-item>
      <el-form-item class="text-center">
        <el-button @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';
import axios from '../api/axios'//引入axios
import { useRoute, useRouter } from 'vue-router'
const router = useRouter();
const route= useRoute();
console.log(route.query); 
const userInfo = JSON.parse(String(localStorage.getItem('userInfo')));
const userId = ref(route.query.id);
const view = ref(route.query.type ? true : false);
console.log(view.value);
// do not use same name with ref
const form = reactive({
  name: '',
  remake: '',
});

const changeform = (res) => {
  const Obj = res || {};
  form.name = Obj.title;
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
  if (route.query.id) {
    getDetailByUserId(route.query.id);
  } else {
    changeform({});
  }
}

initData();
  const onSubmit = () => {
    axios.post('http://127.0.0.1:4000/category/create', { ...form } )
    .then(function (res) {
      changeform({})
      router.push({
        path: '/home/category',
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
      router.push({
        path: '/home/posts',
      })
    })
}

</script>