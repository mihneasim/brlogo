var fs = require('fs');

var koa = require('koa');
var route = require('koa-route');
var koaStatic = require('koa-static');
var multiParse = require('co-busboy');
var mkdirp = require('mkdirp');

var app = koa();
app.use(koaStatic('public'));

app.listen(8000);

app.use(route.post('/api/upload', function * (data, next) {
  var part = yield multiParse(this);
  console.log(part);
  if (!(part.length && part.length === 4)) {
    var path = 'var';
    mkdirp.sync(path);
    var stream = fs.createWriteStream(path + '/uploaded.jpg');
    part.pipe(stream);
  }
  this.body = '{"error": null}';
}));
