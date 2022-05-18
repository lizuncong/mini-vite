import { createApp } from 'vue'
import App from './App.vue'
import vm from 'virtual-module'
import { mike } from './test.ts'
import './style/test.scss'

const globModules = import.meta.glob('./glob/*')

console.log('vm====', vm, postMessage)
console.log('mike...', mike)
// import './index.css'
console.log('globModules===', globModules)
Object.entries(globModules).forEach(([k, v]) => {
  console.log(k + ':', v)
  v().then((m) => {
    console.log(m.default)
  })
})
createApp(App).mount('#app')
