
class Database {
  constructor(MongoClient) {
    this.USE_DB = false;
    this.users = [
      {
        username:"Leoche",
        email:"leodesigaux@gmail.com",
        password:"1234"
      }
    ]
    if (this.USE_DB) {
      MongoClient.connect("mongodb://localhost/pixelonline", function(error, db) {
          if (error) return funcCallback(error);

          console.log("Connecté à la base de données 'pixelonline'");
      });
    }
  }
  login (email, password) {
    if (!this.USE_DB) {
      let isLogged = false;
      this.users.forEach(user => {
        if (user.email === email && user.password === password) isLogged = user;
      })
      return isLogged;
    }
  }
  register (username, email, password) {
    if (!this.USE_DB) {
      if (this.isUnique('users', 'username', username) && this.isUnique('users', 'email', email)) {
        this.users.push({
          'username': username,
          'email': email,
          'password': password
        })
      }
    }
  }
  isUnique (collection, field, value) {
    if (!this.USE_DB) {
      let isUnique = true;
      this[collection].forEach(item => {
        if (item[field] === value) isUnique = false;
      })
      return isUnique;
    }
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
