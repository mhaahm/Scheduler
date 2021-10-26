var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');

var app = express();
var config = require('./dist/globalConfig');
const { chmodSync } = require('fs');
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

app.post('/upload/:filename', function (req, res) {
  var filename = path.basename(req.params.filename);
  filename = path.resolve(__dirname, filename);
  const filedir = config.default.sslFileDepot;
  if (!fs.existsSync(filedir)) {
    fs.mkdirSync(filedir, { recursive: true });
    fs.chmodSync(filedir, 777);
  }

  console.log('File ' + filename + ' copied to ' + filedir);
  var dst = fs.createWriteStream(filedir + path.basename(filename))
  req.pipe(dst);
  dst.on('drain', function () {
    console.log('drain', new Date());
    req.resume();
  });
  req.on('end', function () {
    console.log('File end copied ');
    res.send(200);
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log(
    'Express server listening on port ' +
      app.get('port') +
      ' ' +
      app.request.originalUrl,
  );
});
