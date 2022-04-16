import { createApp } from 'vue'
import App from './App.vue'

import vm from 'virtual-module'
import { mike } from './test.ts'
console.log('vm====', vm, postMessage)
console.log('mike...', mike)
// import './index.css'

createApp(App).mount('#app')
