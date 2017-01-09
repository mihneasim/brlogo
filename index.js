const fs = require('fs');
const process = require('process');

const koa = require('koa');
const route = require('koa-route');
const koaStatic = require('koa-static');
const multiParse = require('co-busboy');
const mkdirp = require('mkdirp');

const exec = require('child_process').exec;

let app = koa();
app.use(koaStatic('public'));

app.listen(process.env.PORT || 8000);

const RATIO = 20;

app.use(route.post('/api/upload', function * (data, next) {
  var part = yield multiParse(this);
  if (!(part.length && part.length === 4)) {
    var path = 'var';
    mkdirp.sync(path);
    var stream = fs.createWriteStream(path + '/uploaded.jpg');
    part.pipe(stream);
  }
  var cmd = `identify -format "%[fx:w]x%[fx:h]" var/uploaded.jpg`;
  exec(cmd, function(error, stdout, stderr) {
    var matches = stdout.match(/([0-9]+)x([0-9]+)/);
    var maximum = Math.max(parseInt(matches[1]), parseInt(matches[2]));
    var unit = Math.floor(maximum / RATIO);
    var cmd = ['composite -compose exclusion -gravity SouthEast -geometry ',
      unit, 'x', unit, '+', unit, '+', unit,
      ' logo.png var/uploaded.jpg public/result.jpg'].join('');
    exec(cmd, function(error, stdout, stderr) {
      console.log(error, stdout, stderr);
    });
  });
  this.body = '{"error": null}';
}));
