/*
 * @Author: tuWei
 * @Date: 2022-06-30 19:12:00
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 12:13:22
 */
export function setCookie (name, value, path, domain, time) {
  let arr = [];
  let now = new Date();
  arr.push(name + '=' + value);
  if (path) {
    arr.push('path=' + path);
  }
  if (domain) {
    arr.push('domain=' + domain);
  }
  if (time !== null || time !== undefined) {
    now.setTime(now.getTime() + time);
    arr.push('expires=' + now.toUTCString());
  }
  document.cookie = arr.join(';');
}

export function getCookie (name) {
  let cookies = getCookies();
  return cookies[name];
}
function trim (text) {
  return text == null ? '' : (text + '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
export function getCookies () {
  let cookies = decodeURIComponent(document.cookie).split(';');
  let result = {};
  for (let i = 0; i < cookies.length; i++) {
    let c = trim(cookies[i]);
    let cookie = c.split('=');
    let ck = trim(cookie.shift());
    let cv = trim(Array.prototype.join.call(cookie, '='));
    if (ck && cv) {
      result[ck] = cv;
    }
  }
  return result;
}
