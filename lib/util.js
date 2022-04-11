const { Readable, Stream } = require('stream')

const readBody = async (stream) => {
    if(stream instanceof Readable){
        return new Promise((resolve, reject) => {
            let res = ''
            stream.on('data', function(chunk){
                res += chunk
            })
            stream.on('end', function(){
                resolve(res)
            })
        })
    } else {
        return stream
    }
}

exports.readBody = readBody
