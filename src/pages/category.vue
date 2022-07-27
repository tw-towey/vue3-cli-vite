<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 00:43:20
-->
<template>
<div class="h-full flex flex-col">
  <el-form :inline="true" :model="formInline" style="min-height: 60px; padding: 10px; text-align: left;" >
      <el-form-item label="名称">
        <el-input v-model="formInline.name" placeholder="名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
        <el-button type="primary" @click="onAddPost">Add</el-button>
      </el-form-item>
  </el-form>
  <div style="width: 100%; overflow: auto;" class="flex-1" >
    <el-table :data="tableData">
      <el-table-column prop="name" label="名称"  />
      <el-table-column prop="remake" label="摘要"/>
      <el-table-column prop="postNum" label="文章数量" />
      <el-table-column prop="createdAt" label="创建时间" />
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
    <el-pagination @current-change="changePage" :pageSiz="20" :current-page="current" layout="prev, pager, next" :total="total" />
  </div>
</div>
</template>

<script lang="ts" setup>
import axios from '../api/axios'//引入axios
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { Timer } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { api } from '../api/env.js'

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
  name: '',
});


const current = ref(1);
const total = ref(1);
const onAddPost = ()=>{
  router.push({
    path: '/home/category/Add_Edit',
  })
}
const changePage = (pager)=>{
  current.value = pager;
  console.log(current.value);
  getData();
}
const seeFn = (r)=> {
  router.push({
    path: '/home/category/Add_Edit',
    query: {
      id: r.row.id,
      type: 'view'
    }
  })
}

const editFn = (r)=>{
  router.push({
    path: '/home/category/Add_Edit',
    query: {
      id: r.row.id
    }
  })
}
const deleteFn = (r)=> {
  axios.post( api + '/category/delete', { id: r.row.id })
    .then(function (res) {
      console.log(res);
      getData();
    })
}
const getData = ()=>{
    axios.post(api + '/category/categoryList', {
      pageSize: 10,
      current: current.value,
      name: formInline.name
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