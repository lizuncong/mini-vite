const { readBody }  = require('./util')
const { parse } = require('es-module-lexer')
const MagicString = require('magic-string')

function rewriteImports(source){
  const imports = parse(source)[0]
  const ms = new MagicString(source)
  if(imports.length){
    for(let i = 0; i < imports.length; i++){
      const { s, e } = imports[i]
      let id = source.slice(s, e) // 引用的模块名称
      if(/^[^\/\.]/.test(id)){
        id = `/@modules/${id}`
        ms.overwrite(s, e, id)
      }
    }
  }
  return ms.toString()
}

function moduleRewritePlugin({ app, root }){
  app.use(async (ctx, next) => {
    await next()
    // 默认会先执行静态服务中间件，会将结果放到ctx.body

    // 需要将流转换成字符串，只需要处理js中的引用问题
    if(ctx.body && ctx.response.is('js')){
      const r = await readBody(ctx.body)
      const result = rewriteImports(r)
      ctx.body = result
    }
  })
}

module.exports = moduleRewritePlugin;
