import virtualModule from './plugins/vite-plugin-example'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), virtualModule()]
})
