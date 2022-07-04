<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:57:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 17:04:25
-->
<template>
  <el-form :model="form" label-width="120px">
    <h2 style="padding: 30px;" v-if="!userId">
      注册信息
    </h2>
    <el-form-item label="用户名">
      <el-input v-model="form.userName" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="text" v-model="form.password" />
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
      <el-button type="primary" @click="onSave">保存</el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="changeform">刷新数据</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, getCurrentInstance, ref } from 'vue'
import { ElMessage } from 'element-plus';
import axios from '../api/axios'//引入axios
import Mock from 'mockjs'

type Props = {
  userId: Number,
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
  userName: '',
  password: '',
  dateOfBirth: '',
  sex: '',
  cellphone: '',
  job: '',
  hobby: '',
  email: '',
  remake: '',
  address:'',
});

const changeform = (res)=>{
  const Obj = res || {};
  form.userName = Obj.userName || Mock.mock('@cname');
  form.password = Obj.password || '123456';
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
  axios.get('http://127.0.0.1:4000/user/'+ id)
  .then(function (res) {
    console.log(res);
    changeform(res.data)
  })
}
const initData = ()=>{
  if(props.userId){
    getDetailByUserId(props.userId);
  } else {
    changeform({});
  }
}
initData();
const onSubmit = () => {
  axios.post('http://127.0.0.1:4000/user/addUser', form)
  .then(function (res) {
    console.log(res);
    changeform({})
    ElMessage({
      showClose: true,
      message: '操作成功',
      type: 'success',
    })
  })
};

const emit = defineEmits(['close-model'])

const onSave = ()=>{
  axios.post('http://127.0.0.1:4000/user/update', { id: props.userId, ...form, dateOfBirth: new Date(form.dateOfBirth).toLocaleDateString() })
  .then(function (res) {
    ElMessage({
      showClose: true,
      message: '操作成功',
      type: 'success',
    });
    emit('close-model', false);
  })
}

</script>