var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var Database = require('./Database').Database
var UserManager = require('./UserManager').UserManager
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
var CHAT = [];
var usermanager = new UserManager();
var DB = new Database(MongoClient, usermanager);
io.on('connection', function (socket) {
  socket.on('login', function (detail) {
    console.log("[LOGIN] Trying with " + detail);
    detail = JSON.parse(detail)
    DB.login(socket, detail.email, detail.password, detail.fingerprint);
  })
  socket.on('loginToken', function (detail) {
    console.log("[LOGIN] Trying with " + detail);
    detail = JSON.parse(detail)
    DB.loginToken(socket, detail.email, detail.fingerprint, detail.tokenDate);
  })
  socket.on('register', function (detail) {
    console.log("[REGISTER] Trying with " + detail);
    detail = JSON.parse(detail)
    console.log(detail);
    DB.register(socket, detail.username, detail.email, detail.password);
  })
  socket.on('message', function (msg) {
    if (socket.user) {
      console.log("[CHAT] Received :" + msg);
      let newmessage = {username: socket.user.username, message: msg};
      if (msg[0] == "/") {
        newmessage = {username: 'Console', message: eval(msg.substring(1))};
      }
      CHAT.push(newmessage)
      if (CHAT.length > 50) CHAT.splice(0,1)
      io.emit("chat", JSON.stringify(newmessage))
    }
  })
});
