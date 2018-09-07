var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var Database = require('./Database').Database
var MongoClient = require("mongodb").MongoClient;
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
app.listen(8080);// <---- change the port

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  var DB = new Database(MongoClient, socket);
  socket.on('login', function (detail) {
    console.log("Receive login");
    detail = JSON.parse(detail)
    DB.login(detail.email, detail.password);
  })
  socket.on('register', function (detail) {
    console.log("Receive register");
    detail = JSON.parse(detail)
    console.log(detail);
    DB.register(detail.username, detail.email, detail.password);
  })
});
