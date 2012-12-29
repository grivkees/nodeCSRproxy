var express = require('express')
var http = require('http');
var https = require('https');

request = function (url, callback) {
    var client = url.indexOf("https") == 0 ? https : http;
    var req = client.request(url, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function() {
          callback(null, res.headers['content-type'], body);
        });
    });
    req.on('error', function (e) {
        callback(e.message);
    });
    req.end();
}

var app = express();
app.get('/http/:url', function (req, res, next) {
  request(req.params.url, function (err, contentType, body) {
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('content-type',contentType);
      if (err) res.send(err, 500);
      else res.send(body);
  });
});
app.get('/json/:url', function (req, res, next) {
  request(req.params.url, function (err, contentType, body) {
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('content-type',contentType);
      if (err) res.send(err, 500);
      else res.jsonp(body);
  });
});
var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on " + port);
});