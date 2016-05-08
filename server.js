var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();
var server = http.createServer(app);


app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync(__dirname+'/index.html'));
});

app.get(/.js$|.css$/, function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync(__dirname + req.url));
});


app.listen(80, function() {
  console.log("Server listening...");
});
