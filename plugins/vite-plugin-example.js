module.exports =  function(options){
    return {
        name: 'my-plugin',
        resolveId(source){
            console.log('source====', source)
            // 是否处理当前请求
            if(source === 'virtual-module'){
                return source; // 表示接管
            }
            return null; // 不接管
        },
        load(id){
            console.log('load====', id)
            if(id === 'virtual-module'){
                // 返回加载的模块代码
                return 'export default "this is virtual module"'
            }
            return null;
        }

    }
}