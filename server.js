/*
    nodeCSRproxy: A ready-to-deploy node.js proxy server app for making cross domain HTTP requests.
    
    Copyright (c) 2012 Glenn Rivkees
*/

var express = require('express');
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
          callback(null, body);
        });
    });
    req.on('error', function (e) {
        callback(e.message);
    });
    req.end();
}

var app = express();
app.get('*', function (req, res, next) {
  if (req.query.url == undefined) {
    res.send("<html><body>Request Format: /?url=[URL]&format=[http(default)/json]</body></html>");
  } else {
    request(req.query.url, function (err, body) {
        res.setHeader('Access-Control-Allow-Origin','*');
        if (err) res.send(err, 500);
        else if (req.query.format == "json") res.jsonp(body);
        else res.send(body);
    });
  }
})
var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on " + port);
});