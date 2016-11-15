var koa = require('koa');
var app = koa();
var staticServer = require('koa-static')


app.use( staticServer(__dirname + '/public/', {}) );



app.listen(3000);
console.log('open: http://127.0.0.1:3000/doc/index.html')