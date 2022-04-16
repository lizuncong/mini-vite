### env

- 通过 `import.meta.env` 获取。在打包阶段，vite 会使用对象替换掉这个取值
- 可以在项目根目录下新建 `.env` 文件拓展 `import.meta.env` 字段。
  - `.env` 文件里的变量必须要以大写的 `VITE_` 作为前缀，才能注入到 `import.meta.env` 里面。
  - 可以通过 `.env.development` 或者 `.env.production` 区分环境
- 在 `package.json` 中，通过 `vite --mode development` 可以指定环境

### vite 中的 HMR 热更新功能

```javascript
export function render() {
  document.querySelector('#app').innerHTML = `
    <h1>Hello Vite!</h1>
  `
}
render()
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    newModule.render()
  })
}
```

### glob-import 批量导入功能

```js
const globModules = import.meta.glob('./glob/*')
console.log('globModules===', globModules)
Object.entries(globModules).forEach(([k, v]) => {
  console.log(k + ':', v)
  v().then((m) => {
    console.log(m.default)
  })
})
```
