<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 10:46:55
-->
<template>
  <div class="p-5">
    <ul :style="{'height': '80%', 'overflow': 'auto'}" ref="myRef">
      <li v-for="item in ListData.list" :key="item" :class="style(item,'li')">
        <p class="flex items-center" :class="style(item,'p')">
          <span class="inline-block px-3 py-1 bg-blue-400 text-white text-center font-extrabold rounded-md" :class="style(item,'username')">{{item.username}}</span>
          <span class="ml-5 mr-5 w-50 text-gray-300" v-if="item.createdAt">{{ new Date(item.createdAt).toLocaleString() }}</span>
        </p>
        <span class="inline-block text-left bg-purple-100 text-sm px-5 py-2 mx-3 my-3 rounded-md font-semibold text-purple-500 bg-violet-200 ring ring-violet-300 ring-offset-2 ring-offset-violet-50">{{item.content}}</span>
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
const ws = new WebSocket(wsHerf);
//当前登录人的信息 userId
const userInfo = reactive(JSON.parse(String(localStorage.getItem('userInfo'))));

let myRef = ref(null);
onMounted(() => {
  bottomScroll();
});

function bottomScroll(){
  setTimeout(() =>{
    if(myRef.value){
      myRef.value.scrollTop = myRef.value.scrollHeight;
    }
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

//服务端向客户端连接执行
ws.onopen = ()=>{
  console.log('连接建立')
}

//接收消息方法
ws.onmessage = (msg)=>{
  console.log(JSON.parse(msg['data']));
  ListData.list.push(JSON.parse(msg['data']));
  bottomScroll();
}

//获取聊天历史记录
const getChatList = ()=>{
  axios.post(api + '/chat/getList', form)
  .then( (res)=> {
    ListData.list = [...res.data];
  })
}

getChatList();
//回车发送消息
const enterSend = (e)=>{
  if(e && e.keyCode === 13){
    send();
  }
}
//发送消息
const send = ()=>{
  ws.send(JSON.stringify(form));
  axios.post(api + '/chat/send', form)
  .then(function (res) {
    form.content = '';
    bottomScroll();
  })
}

const style = (item,tag)=> {
  let self = item.userId===form.userId;
  if( tag === 'li' ) {
    return {
      'p-1': true,
      'text-right': self,
      'ml-60': self,
      'mr-60': !self
    }
  }else if( tag === 'username' ) {
    return {
      'bg-red-400': self
    }
  }else if( tag === 'p' ) {
    return {
      'flex-row-reverse': self
    }
  }
}
</script>