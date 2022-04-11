const path = require('path')
const fs = require('fs').promises

function serverPluginVue({ app, root }){
    app.use(async (ctx, next) => {

        if(!ctx.path.endsWith('.vue')){
            return await next()
        }
        const filePath = path.join(root, ctx.path)
        const content = await fs.readFile(filePath, 'utf8')
        

        // 解析模版
        const { parse, compileTemplate } = require(path.resolve(root, 'node_modules', '@vue/compiler-sfc/dist/compiler-sfc.cjs'))
        const { descriptor } = parse(content)

        if(!ctx.query.type){
            let code = ''
            if(descriptor.script){
                let content = descriptor.script.content
                code += content.replace(/((?:^|\n|;)\s*)export default/, '$1const __script = ')
            }
            if(descriptor.template){
                const requestPath = ctx.path + `?type=template`;
                code += `\nimport { render as __render } from "${requestPath}"`
                code += `\n __script.render = __render`
            }
            code += `\nexport default __script`
            ctx.type = 'js'
            ctx.body = code
        }
        if(ctx.query.type === 'template'){
            ctx.type = 'js'
            let content = descriptor.template.content
            const { code } = compileTemplate({ source: content }) // 将app.vue中的模版转换成render函数
            ctx.body = code
        }

    })
}

exports.serverPluginVue = serverPluginVue