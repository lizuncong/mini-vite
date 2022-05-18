const sass = require('sass');
var nodeSass = require('node-sass');

const result = sass.compile('./src/style/test.scss');

console.log('result...', result)

nodeSass.render({
    file: './src/style/test.scss'
  }, function(err, result) { 
    console.log('err....', err)
    console.log('result...', result)
    console.log('result...', result.css.toString())
  });