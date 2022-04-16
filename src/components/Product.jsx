import { defineComponent } from "vue";
import '@style/index.css'
import '@style/test.less'
import styles from '@style/product.module.css'
export default defineComponent({
    setup(){
        return () => {
            return (
                <div>
                    <div class={`root ${styles.container}`}>hello vue3 jsx</div>
                    <div class="wrap">
                        hello less
                    </div>
                </div>
            )
        }
    }
})