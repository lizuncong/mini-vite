import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import virtualModule from './plugins/vite-plugin-example'
import i18n from './plugins/vite-plugin-i18n'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve('./src'),
            '@style': resolve('./src/style'),
            'comps': resolve('./src/components')
        }
    },
    plugins: [vue(), vueJsx(), virtualModule(), i18n]
})
