/*
 * @Author: tuWei
 * @Date: 2022-07-04 17:47:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-08-01 12:35:22
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/chat/',
  server: {
    host: '0.0.0.0'
  },
  build: {
    outDir: 'chat',
    assetsInlineLimit: 0
  },
  plugins: [vue()],
})
