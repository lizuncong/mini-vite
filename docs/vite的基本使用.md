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

### vite 预编译

对于在 `node_modules` 中安装的第三方依赖，`vite` 在第一次启动时会将这些包进行编译放到缓存中 `node_modules/.vite`。之后请求都是走缓存的内容

预编译的目标：

- 将 `CommonJs` 等非 `ESM` 模块转换成 `ESM`
- bundle files together。将一些零散的文件打包到一起。比如 `lodash-es` 这种库，基本每个函数都写在一个文件里面，如果不使用预编译将所有模块打包成一个文件，就会造成浏览器太多的请求。

### 非 Node 服务中集成 vite

如果是使用 `java` 或者 `python` 等模版引擎生成的页面，如何集成 `vite`

这里使用 `express` 以及 `pug` 模拟其他语言

新家 server.js：

```javascript
const express = require('express')

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
    message: 'Hello There!',
  })
})
app.listen(4000)
```

新建 views/index.pug 文件

```pug
html
    head
        title=title
    body
        h1=message
        div(id="app")
        script(src="http://localhost:3000/@vite/client" type="module")
        script(src="http://localhost:3000/src/main.js" type="module")
```

`http://localhost:3000` 是本地客户端的端口

如果是生成环境，则在客户端的 `vite.config.js` 中配置

```json
"build": {
    "manifest": true, // 非nodejs服务中集成vite
}
```

此时构建出来的产物会有一个 `manifest.json` 文件，可以在服务端根据这个文件插入到后端生成的模版中

### Nodejs 集成 vite 开发时的 SSR
