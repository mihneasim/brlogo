var fs = require('fs');

var koa = require('koa');
var route = require('koa-route');
var koaStatic = require('koa-static');

var app = koa();
app.use(koaStatic('public'));

app.listen(8000);
