<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 01:35:56
-->
<template>
<div style="display:flex; flex-direction: column" class="h100">
  <el-form :inline="true" :model="formInline" style="min-height: 60px; padding: 10px; margin-top: 20px;text-align: left;" >
      <el-form-item label="姓名">
        <el-input v-model="formInline.username" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formInline.cellphone" placeholder="手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
  </el-form>
  <el-table :data="tableData" style="height: 88%;width: 100%; overflow: auto;">
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
  <div class="example-pagination-block" style="height: 30px">
    <el-pagination @current-change="changePage" :pageSiz="20" :current-page="current" layout="prev, pager, next" :total="total" />
  </div>
  <el-dialog v-model="outerVisible" width="800px" title="编辑信息">
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

let tableData = ref([]);
let userId = ref(null);
const outerVisible = ref(false)

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
const handleClick = ()=>{

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
  axios.post('http://127.0.0.1:4000/user/remove', {id: r.row.id})
    .then(function (res) {
      console.log(res);
      getData();
    })
}
const getData = ()=>{
    axios.post('http://127.0.0.1:4000/user/userList', {
      pageSize: 10,
      current: current.value,
      ...formInline
    })
    .then(function (res) {
      console.log(res['total']);
      changeform(res.data)
      total.value = res['total'];
      ElMessage({
        showClose: true,
        message: res['message'] || null,
        type: 'success',
      })
    })
}
const onSubmit = () => {
  getData();
}
onSubmit();
</script>