<!--
 * @Author: tuWei
 * @Date: 2022-06-30 18:54:03
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 10:46:55
-->
<template>
  <div class="p-5">
    <ul :style="{'height': '80%', 'overflow': 'auto'}" ref="myRef">
      <li v-for="item in ListData.list" :key="item" class="p-1 flex" :class="style(item,'li')">
        <div class="rounded-full h-16 w-16 min-w-16 bg-blue-400 bg-cover avatar" :style="{'background-image':`url(${item.avatar})`}"></div>
        <div class="flex flex-col text-left" :class="style(item,'div')">
          <span class="ml-3 mr-3 w-50 text-gray-300">
            <span class="mr-3 text-gray-400">{{item.username}}</span>
            {{ new Date(item.createdAt).toLocaleString() || '' }}
          </span>
          <div class="relative">
            <span class="inline-block text-left text-sm px-5 py-2 mx-3 my-3 rounded-md font-semibold ring ring-offset-2" :class="style(item,'content')">
              {{item.content}}
            </span>
            <span class="sjBox absolute top-5" :class="style(item,'sj')">
              <span class="inline-block absolute w-0 h-0 -top-0.5 left-0.5" :class="style(item,'sjspan')"></span>
              <span class="inline-block absolute w-0 h-0" :class="style(item,'sjspan')"></span>
              <span class="inline-block absolute w-0 h-0" :class="style(item,'sjspan')"></span>
            </span>
          </div>
        </div>
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
      'flex-row-reverse': self,
      'ml-60': self,
      'mr-60': !self
    }
  }else if( tag === 'div' ) {
    return {
      'text-right': self
    }
  }else if( tag === 'content' ) {
    return {
      'text-violet-500': self,
      'bg-violet-200': self,
      'ring-violet-300': self,
      'ring-offset-violet-50': self,
      'text-blue-500': !self,
      'bg-blue-200': !self,
      'ring-blue-300': !self,
      'ring-offset-blue-50': !self
    }
  }else if( tag === 'sj' ) {
    return {
      'right-3': self,
      '-left-4': !self
    }
  }else if( tag === 'sjspan' ) {
    return {
      'sjleft': !self,
      'sjright': self
    }
  }
}
</script>

<style scoped>
.avatar {
  min-width: 4rem;
}
.sjBox span:nth-child(1) {
  border: 0.75rem solid transparent;
}
.sjBox span:nth-child(2) {
  border: 10px solid transparent;
}
.sjBox span:nth-child(3) {
  border: 8px solid transparent;
}
.sjBox span:nth-child(1).sjleft {
  border-right-color: rgb(147 197 253);
}
.sjBox span:nth-child(1).sjright {
  border-left-color: rgb(196 181 253);
}
.sjBox span:nth-child(2).sjleft {
  border-right-color: #eff6ff;
  left: 0.5rem;
}
.sjBox span:nth-child(2).sjright {
  border-left-color: #f5f3ff;
}
.sjBox span:nth-child(3).sjleft {
  border-right-color: #bfdbfe;
  left: 0.8rem;
  top: 2px;
}
.sjBox span:nth-child(3).sjright {
  border-left-color: #ddd6fe;
  left: -0.1rem;
  top: 2px;
}
</style>