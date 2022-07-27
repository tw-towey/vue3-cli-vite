<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-11 17:15:24
-->
<template>
<div class="h-full flex flex-col">
  <el-form :inline="true" :model="formInline" style="min-height: 60px; padding: 10px; text-align: left;" >
      <el-form-item label="姓名">
        <el-input v-model="formInline.username" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formInline.cellphone" placeholder="手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
        <el-button type="primary" @click="onAddUser">Add</el-button>
      </el-form-item>
  </el-form>
  <div style="width: 100%; overflow: auto;" class="flex-1" >
    <el-table :data="tableData">
      <el-table-column prop="username" label="姓名" width="100" />
      <el-table-column prop="job" label="职业" width="100" />
      <el-table-column prop="dateOfBirth" label="出生日期" width="120" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="cellphone" label="手机号码" width="120" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="email" label="邮箱" width="100" />
      <el-table-column prop="hobby" label="爱好" width="100" />
      <el-table-column prop="remake" label="备注" width="400"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editFn(scope)">Edit</el-button>
          <el-button link type="primary" size="small" @click="deleteFn(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="height: 60px" >
    <el-pagination @current-change="changePage" :pageSize="20" :current-page="current" layout="prev, pager, next" :total="total" />
  </div>
  <el-dialog v-model="outerVisible" width="800px" :title="title">
    <div style="height: 600px; overflow: auto">
      <Register v-if="outerVisible" @close-model="closeModel" :userId="userId"></Register>
    </div>
  </el-dialog>
</div>
</template>

<script lang="ts" setup>
import axios from '../api/axios'//引入axios
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { Timer } from '@element-plus/icons-vue'
import Register from './register.vue';
import { api } from '../api/env.js'

let tableData = ref([]);
let userId = ref(0);
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
  cellphone: '',
});


const current = ref(1);
const total = ref(1);
const onAddUser = ()=>{
  userId.value = 0;
  title.value = '';
  outerVisible.value = true;
}
const changePage = (pager)=>{
  current.value = pager;
  console.log(current.value);
  getData();
}
const editFn = (r)=>{
  outerVisible.value = true;
  userId.value = r.row.id
}
const deleteFn = (r)=> {
  axios.post(api + '/user/remove', {id: r.row.id})
    .then(function (res) {
      console.log(res);
      getData();
    })
}
const getData = ()=>{
    axios.post(api + '/user/userList', {
      pageSize: 10,
      current: current.value,
      ...formInline
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