import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import virtualModule from './plugins/vite-plugin-example'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve('./src'),
            'comps': resolve('./src/components')
        }
    },
    plugins: [vue(), virtualModule()]
})
