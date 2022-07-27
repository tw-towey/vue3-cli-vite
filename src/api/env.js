/*
 * @Author: tuWei
 * @Date: 2022-07-27 13:12:21
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 00:47:47
 */
const ENV = process.env.NODE_ENV;
console.log( '=====' , ENV );
let api = 'http://152.136.103.169:4000';
let wsHerf = 'ws://152.136.103.169:9009'
if(process.env.NODE_ENV === 'development'){
  api = 'http://127.0.0.1:4000';
  wsHerf = 'ws://127.0.0.1:9009'
}
export {
  api,
  wsHerf
}