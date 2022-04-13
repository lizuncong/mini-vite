### vite
vite是一个基于Vue3单文件组件的非打包开发服务器，它做到了本地快速开发启动，实现按需编译，不再等待整个应用编译完成。

面向现代浏览器，基于原生模块系统 ESModule 实现。webpack的开发环境很慢(开发时需要进行编译存到内存中)

### vite的实现原理
vite在浏览器端使用export import的方式导入和导出模块，同时实现了按需加载，vite高度依赖module script特性

过程如下：
- 服务端拦截客户端请求，拿到请求body
- 通过 es-module-lexer 解析资源 ast 拿到import的内容
- 判断 import 的资源是否是 npm 模块
- 返回处理后的资源路径： "vue" => "/@modules/vue"

将处理后的template，script，style等所需的依赖以http请求的形式，通过query参数形式区分并加载sfc文件各个模块内容

### vite插件
使用vite插件可以扩展vite能力，比如解析用户自定义的文件输入，在打包代码前转译代码，或者查找第三方模块

#### 插件钩子
开发时，vite创建一个插件容器按照顺序调用各个钩子
- config：修改vite配置
- configResolved： vite配置确认
- configureServer： 用于配置dev server
- transformIndexHtml：用于转换宿主页
- resolveId：创建自定义确认函数，常用于定位第三方依赖
- load：创建自定义加载函数，可用于返回自定义的内容
- transform：可用于转换已加载的模块内容
- handleHotUpdate：自定义HMR更新时调用