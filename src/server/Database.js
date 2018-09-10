var Validator = require('./Validator')
var md5 = require('md5')
class Database {
  constructor(MongoClient) {
    this.USE_DB = true;
    this.users = [
      {
        username:"Leoche",
        email:"leodesigaux@gmail.com",
        password:"1234"
      }
    ]
    this.db = null;
    if (this.USE_DB) {
      MongoClient.connect("mongodb://localhost/", (error, db) => {
          if (error) return funcCallback(error);
          this.db = db.db("pixelonline")
          console.log("Connecté à la base de données 'pixelonline'");
          this.db.createCollection('users')
      });
    }
  }
  login (socket, email, password, fingerprint) {
    let response = "error";
    if (!this.USE_DB) {
      this.users.forEach(user => {
        if (user.email === email && user.password === password) response = user;
      })
      this.socket.emit('loginResponse', response);
    } else {
      let user = false;
      this.db.collection('users').find({email:email, password: password}).toArray((err, results) => {
        if (results.length > 0) {
          let token = this.createToken(email, fingerprint)
          this.db.collection('users').updateOne({'_id': results[0]._id}, {$set:{
            token: token.token,
            tokenDate: token.tokenDate
          }})
          results[0].token = token.token
          results[0].tokenDate = token.tokenDate
          socket.emit('loginResponse', JSON.stringify(results[0]));
          socket.user = results[0]
        } else socket.emit('loginResponse', JSON.stringify({"error":"Identifiants non valides!"}))
      });
    }
  }
  loginToken (socket, email, fingerprint, tokenDate) {
    let user = false;
    if (tokenDate + 60 * 30 < (new Date() / 1000 | 0)) {
      console.log("token invalid");
      return;
    }
    this.db.collection('users').find({email:email, token: this.createToken(email, fingerprint, tokenDate).token, tokenDate:tokenDate}).toArray((err, results) => {
      if (results.length > 0) {
        socket.user = results[0]
        socket.emit('loginResponse', JSON.stringify(results[0]));
      }
    });

  }
  createToken(email, fingerprint, date) {
    let timestamp = date || (new Date() / 1000 | 0);
    return {
      token: md5(email + fingerprint + timestamp),
      tokenDate: timestamp
    }
  }
  register (socket, username, email, password) {
    let user = {
      'username': username,
      'email': email,
      'password': password,
      'token': null,
      'tokenTimestamp': 0
    };
    new Promise((resolve, reject) => {
      if(!Validator.username(username)) reject('Username invalid')
      else if(!Validator.email(email)) reject('Email invalid')
      else if(!Validator.password(password)) reject('Password invalid')
      else resolve()
    }).then(() => {
      return this.isUnique('users', 'email', email)
    }).then(() => {
      return this.isUnique('users', 'username', username)
    }).then(() => {
      if (!this.USE_DB) {
        this.users.push(user)
      } else {
        this.db.collection('users').insertOne(user).then(() => {
          socket.emit('registerResponse', JSON.stringify({"success":"OK"}));
        })
      }
    }).catch((error) => {
      console.log(error);
      socket.emit('registerResponse', JSON.stringify({"error":error}))
    })
  }
  isUnique (collection, field, value) {
    return new Promise((resolve, reject) => {
      if (!this.USE_DB) {
        let isUnique = true;
        this[collection].forEach(item => {
          if (item[field] === value) reject(field.capitalize() + ' already taken.')
        })
        resolve()
      } else {
        this.db.collection(collection).find({[field] :value}).toArray((err, results) => {
          if (results.length > 0) {
            reject(field.capitalize() + ' already taken.')
          } else {
            resolve()
          }
        })
      }
    });
  }
  getUser (collection, field, value) {
    if (!this.USE_DB) {
      let isUnique = true;
      this[collection].forEach(item => {
        if (item[field] === value) isUnique = false;
      })
      return isUnique;
    }
  }
}
module.exports = {Database: Database}
