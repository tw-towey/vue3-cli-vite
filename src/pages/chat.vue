<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 01:30:50
-->
<template>
  <div class="p-5">
    <ul :style="{'height': '80%', 'overflow': 'auto'}" ref="myRef">
      <li v-for="item in ListData.list" :key="item" class="p-1 flex"> 
        <span class="text-blue-600 text-right w-10 inline-block">{{item.username}}: </span>
        <span class="ml-5 flex-1">{{item.content}}</span>
        <span class="ml-5 float-right w-50 inline-block" v-if="item.createdAt">{{ new Date(item.createdAt).toLocaleString() }}</span>
      </li>
    </ul>
    <div class="pt-5 pb-5">
      <el-input v-model="form.content" type="textarea" @keydown="enterSend" placeholder="点击enter和发送按钮即可在线聊天"/>
    </div>
    <div>
      <el-button class="p-5"  type="primary" size="small"  @click="send">发送</el-button>
      <span class="float-right">{{ListData.list.length}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import axios from '../api/axios'//引入axios
import { api, wsHerf  } from '../api/env.js'
const userInfo = reactive(JSON.parse(String(localStorage.getItem('userInfo'))));

let myRef = ref(null);
onMounted(() => {
  bottomScroll();
});


function bottomScroll(){
  setTimeout(() =>{
    myRef.value.scrollTop = myRef.value.scrollHeight;
  }, 200)
}

const form = reactive({
  content:'',
  userId: userInfo.id,
  username: userInfo.username,
})
let ListData = reactive({
  list: []
})
var ws = new WebSocket(wsHerf);
//服务端向客户端连接执行
ws.onopen = ()=>{
  console.log('连接建立')
}
ws.onmessage = (msg)=>{
  console.log(JSON.parse(msg['data']));
  ListData.list.push(JSON.parse(msg['data']));
  bottomScroll();
}
const getChatList = ()=>{
  axios.post(api + '/chat/getList', form)
  .then( (res)=> {
    ListData.list = [...res.data];
  })
}
const enterSend = (e)=>{
  if(e && e.keyCode === 13){
    send();
  }
}

getChatList();
const send = ()=>{
  ws.send(JSON.stringify(form));
  axios.post(api + '/chat/send', form)
  .then(function (res) {
    form.content = '';
    bottomScroll();
  })
}
</script>