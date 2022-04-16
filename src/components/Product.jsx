import { defineComponent } from 'vue'
import '@style/index.css'
import '@style/test.less'
import logoUrl from '../assets/logo.png'
import styles from '@style/product.module.css'
import logoRaw from '../assets/logo.png?raw'

console.log('product.jsx...', logoRaw)
console.log('import.meta.env...', import.meta.env)

export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <div class={`root ${styles.container}`}>hello vue3 jsx</div>
          <img src={logoUrl} alt="" />
          <div class="wrap">hello less</div>
          <div>环境变量：{JSON.stringify(import.meta.env)}</div>
        </div>
      )
    }
  },
})
