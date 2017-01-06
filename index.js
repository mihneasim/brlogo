var fs = require('fs');

var koa = require('koa');
var route = require('koa-route');
var koaStatic = require('koa-static');
var multiParse = require('co-busboy');
var mkdirp = require('mkdirp');

var exec = require('child_process').exec;

var app = koa();
app.use(koaStatic('public'));

app.listen(8000);

var RATIO = 20;

app.use(route.post('/api/upload', function * (data, next) {
  var part = yield multiParse(this);
  console.log(part);
  if (!(part.length && part.length === 4)) {
    var path = 'var';
    mkdirp.sync(path);
    var stream = fs.createWriteStream(path + '/uploaded.jpg');
    part.pipe(stream);
  }
  var cmd = `identify -format "%[fx:w]x%[fx:h]" var/uploaded.jpg`;
  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    var matches = stdout.match(/([0-9]+)x([0-9]+)/);
    var maximum = Math.max(parseInt(matches[1]), parseInt(matches[2]));
    var unit = Math.floor(maximum / RATIO);
    var cmd = ['composite -compose exclusion -gravity SouthEast -geometry ',
      unit, 'x', unit, '+', unit, '+', unit,
      ' logo.png var/uploaded.jpg public/result.jpg'].join('');
      console.log(cmd);
    exec(cmd, function(error, stdout, stderr) {
      console.log(error, stdout, stderr);
    });
  });
  this.body = '{"error": null}';
}));
