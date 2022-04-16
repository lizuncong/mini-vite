<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
import Product from '@/components/Product.jsx'
import { getCurrentInstance, ref, computed } from 'vue'

// 获取组件实例
const ins = getCurrentInstance()

function useI18n(){
  const locale = ref('zh')
  const i18n = ins.type.i18n
  const t = msg => {
    return computed(() => i18n[locale.value][msg]).value
  }

  return {
    locale,
    t
  }
}
const { locale, t } = useI18n()
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Product />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <label>{{ t("language") }}</label>
  <label>{{ t("hello") }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
</template>


<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh": {
    "language": "语言",
    "hello": "你好，世界!"
  }
}
</i18n>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
