<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-11 17:23:10
-->
<template>
<div class="h-full flex flex-col">
  <el-form :inline="true" :model="formInline" style="min-height: 60px; padding: 10px; text-align: left;" >
      <el-form-item label="创建人">
        <el-input v-model="formInline.username" placeholder="创建人" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="标题" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
        <el-button type="primary" @click="onAddPost">Add</el-button>
      </el-form-item>
  </el-form>
  <div style="width: 100%; overflow: auto;" class="flex-1" >
    <el-table :data="tableData">
      <el-table-column prop="username" label="创建人" width="100" />
      <el-table-column prop="cellphone" label="创建人手机号码" width="150" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="title" label="标题" width="100" />
      <el-table-column prop="remake" label="摘要"/>
      <el-table-column prop="cNames" label="分类" width="100" />
      <el-table-column prop="cNum" label="分类数量" width="100" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editFn(scope)">编辑</el-button>
          <el-button link type="primary" size="small" @click="seeFn(scope)">查看</el-button>
          <el-button link type="primary" size="small" @click="deleteFn(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="height: 60px" >
    <el-pagination @current-change="changePage" :pageSize="20" :current-page="current" layout="prev, pager, next" :total="total" />
  </div>
</div>
</template>

<script lang="ts" setup>
import axios from '../api/axios'//引入axios
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { Timer } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const userInfo = JSON.parse(String(localStorage.getItem('userInfo')));
let tableData = ref([]);
const outerVisible = ref(false)
const title = ref('编辑信息')

function changeform(list){
  tableData.value = list;
}

const formatter = (row)=>{
  return new Date(row.dateOfBirth).toLocaleDateString();
}
const closeModel = (flag)=>{
  outerVisible.value = false;
  getData();
}
const formInline = reactive({
  username: '',
  title: '',
});


const current = ref(1);
const total = ref(1);
const onAddPost = ()=>{
  router.push({
    path: '/home/posts/add_edit',
  })
}
const changePage = (pager)=>{
  current.value = pager;
  console.log(current.value);
  getData();
}
const seeFn = (r)=> {
  router.push({
    path: '/home/posts/add_edit',
    query: {
      id: r.row.id,
      type: 'view'
    }
  })
}

const editFn = (r)=>{
  router.push({
    path: '/home/posts/add_edit',
    query: {
      id: r.row.id
    }
  })
}
const deleteFn = (r)=> {
  axios.get('http://127.0.0.1:4000/posts/remove/' + r.row.id)
    .then(function (res) {
      console.log(res);
      getData();
    })
}
const getData = ()=>{
    axios.post('http://127.0.0.1:4000/posts/list', {
      pageSize: 10,
      current: current.value,
      title: formInline.title,
      username: formInline.username
    })
    .then(function (res) {
      console.log(res['total']);
      changeform(res.data)
      total.value = res['total'];
    })
}
const onSubmit = () => {
  getData();
}
onSubmit();
</script>