import { defineComponent } from 'vue'
import '@style/index.css'
import '@style/test.less'
import logoUrl from '../assets/logo.png'
import styles from '@style/product.module.css'
import logoRaw from '../assets/logo.png?raw'

console.log('product.jsx...', logoRaw)
export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <div class={`root ${styles.container}`}>hello vue3 jsx</div>
          <img src={logoUrl} alt="" />
          <div class="wrap">hello less</div>
        </div>
      )
    }
  },
})
