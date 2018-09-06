var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var Database = require('./Database').Database
var MongoClient = require("mongodb").MongoClient;
var DB = new Database(MongoClient);
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
  console.log(socket.id);
  socket.on('login', function (detail) {
    detail = JSON.parse(detail)
    let log = DB.login(detail.email, detail.password);
    if (log !== false) {
      socket.emit('loginResponse', JSON.stringify(log));
    } else {
      socket.emit('loginResponse', "error");
    }
  })
});
