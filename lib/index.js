const Koa = require('koa')
const serverStaticPlugin = require('./serverPluginServeStatic');
const moduleReWritePlugin = require('./moduleRewritePlugin');
const { moduleResolvePlugin } = require('./serverPluginModuleResolve')
const { serverPluginVue } = require('./serverPluginVue')


function createServer(){
  let app = new Koa();
  // 实现静态服务功能，就是访问我们的服务器，可以返回对应的文件 koa-static

  const context = {
    app,
    root: process.cwd()
  }

  const resolvePlugin = [
      moduleReWritePlugin, // 重写请求路径
      moduleResolvePlugin,
      serverPluginVue, // 编译.vue文件
      serverStaticPlugin,
  ]

  resolvePlugin.forEach(plugin => plugin(context))

  return app;
}


createServer().listen(4000, () => {
  console.log('vite start 4000')
})