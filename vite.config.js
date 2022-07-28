/*
 * @Author: tuWei
 * @Date: 2022-07-04 17:47:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-28 15:14:26
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/chat/',
  build: {
    outDir: 'chat',
    assetsInlineLimit: 0
  },
  plugins: [vue()],
})
