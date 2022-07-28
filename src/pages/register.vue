<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:57:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-29 03:04:29
-->
<template>
  <el-form :model="form" label-width="120px">
    <h2 class="text-2xl p-8" v-if="!userId">
      注册信息
    </h2>
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-form-item label="头像">
      <el-upload
      class="avatar-uploader"
      name="file"
      :action="api+'/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="form.avatar" :src="form.avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex" clearable placeholder="Select">
        <el-option
          v-for="item in sexOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker
          v-model="form.dateOfBirth"
          value-format="YYYY-MM-DD"
          placeholder="Pick a time"
          style="width: 100%"
        />
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="form.cellphone" type="number" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="职业">
      <el-input v-model="form.job" />
    </el-form-item>
    <el-form-item label="爱好">
      <el-input v-model="form.hobby" />
    </el-form-item>
     <el-form-item label="地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remake" type="textarea" rows="8" />
    </el-form-item>
     <el-form-item v-if="userId">
      <el-button  @click="onSave">保存</el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-button @click="onSubmit">Create</el-button>
      <el-button @click="changeform">一键生成</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from '../api/axios' //引入axios
import Mock from 'mockjs'
import { api } from '../api/env.js'

import { useRouter } from 'vue-router'
const router = useRouter();

type Props = {
  userId: Number,
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  form.avatar = URL.createObjectURL(uploadFile.raw!)
}


const props = defineProps<Props>();
// const { appContext } = getCurrentInstance();
const sexOpts = [{label: "男", value: 1},{label: "女", value: 2}];

// eslint-disable-next-line no-undef
Mock.Random.extend({
  phone: function () {
    return  Mock.mock(/^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/) //Number()
  }
})
// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
  dateOfBirth: '',
  sex: '',
  cellphone: '',
  job: '',
  hobby: '',
  email: '',
  remake: '',
  address:'',
  avatar: '',
});

const changeform = (res)=>{
  const Obj = res || {};
  form.username = Obj.username || Mock.mock('@cname');
  form.password = Obj.password || '123456';
  form.avatar = Obj.avatar || null;
  form.dateOfBirth = Obj.dateOfBirth || Mock.mock('@date');
  form.sex = Obj.sex || Math.round(Math.random() + 1);
  form.cellphone= Obj.cellphone || Mock.mock(/^1[356789]{1}[0-9]{9}$/);
  form.job= Obj.job || Mock.mock('@ctitle(3, 5)');
  form.hobby= Obj.hobby || Mock.mock('@ctitle(5)');
  form.email= Obj.email || Mock.mock('@email()');
  form.remake= Obj.remake || Mock.mock('@cparagraph');
  form.address= Obj.address || Mock.mock('@province') + Mock.mock('@county') + Mock.mock('@county');
};

const getDetailByUserId = (id)=>{
  axios.get(api + '/user/'+ id)
  .then(function (res) {
    console.log(res);
    changeform(res.data)
  })
}
const initData = ()=>{
  if(props.userId){
    getDetailByUserId(props.userId);
  }
}
initData();
const onSubmit = () => {
  axios.post(api + '/user/addUser', form)
  .then(function (res) {
    changeform({})
    if(emit){
      emit('close-model', false);
    }
    router.push({
      path: '/home/list',
    })
    ElMessage({
      showClose: true,
      message: res['message'],
      type: 'success',
    })
  })
};

const emit = defineEmits(['close-model'])
const onSave = ()=>{
  axios.post(api + '/user/update', { id: props.userId, ...form, dateOfBirth: new Date(form.dateOfBirth).toLocaleDateString() })
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
<style>
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>