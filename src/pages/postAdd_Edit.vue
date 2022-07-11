<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:57:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-11 17:27:02
-->
<template>
  <div class="p-4">
    <el-form :model="form" label-width="120px" v-if="!view">
      <h2 class="text-2xl p-3 text-center" v-if="!userId">
        新增
      </h2>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.remake" type="textarea" rows="2" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.categories" multiple clearable placeholder="Select" class="w-full">
          <el-option
            v-for="item in category.opts"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- <div title="添加与修改文章" class="w-full p-16"> -->
      <!-- </div> -->
      <el-form-item label="内容" class="py-1.5">
        <md-editor v-model="form.content" :preview='true' class='h-full'/>
      </el-form-item>
      <el-form-item v-if="userId">
        <el-button @click="onSave" type="primary">保存</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <md-editor v-else v-model="form.content" codeTheme="atom" :preview='true' :previewOnly="true" class='h-full'/>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';
import axios from '../api/axios'//引入axios
import Mock from 'mockjs'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
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
  categories: [],
  title: '',
  content: '',
  remake: '',
});
interface sas {
  name: string,
  id: string
}
const category = reactive({
  opts: [
    {
      name: '请选择',
      id: ''
    }
  ]
})
const getCategory = ()=>{
  axios.post('http://127.0.0.1:4000/category/categoryList', {
    pageSize: 100,
    current: 1,
    name: '',
  })
  .then(function (res) {
    if(res.data){
      category.opts = reactive(res.data)
    }
  })
}
getCategory();
const changeform = (res) => {
  const Obj = res || {};
  form.title = Obj.title;
  form.content = Obj.content || '';
  form.remake = Obj.remake || '';
  form.categories = Obj.categories || [];
};

const getDetailByUserId = (id) => {
  axios.get('http://127.0.0.1:4000/posts/queryById/' + id)
    .then(function (res) {
      changeform(res.data);
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
      router.push({
        path: '/home/posts',
      })
    })
}

</script>