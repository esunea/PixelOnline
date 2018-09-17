class UserManager {
  constructor() {
    this.users = []
  }
  connect (user) {
    this.users.push(user)
  }
  disconnect (id) {
    this.users.forEach((user, i) => {
      if (user.id === id) this.users.splice(i, 1)
    })
  }
  getUserById (id) {
    let userFound = null;
    this.users.forEach((user, i) => {
      if (user.id === id) userFound = user
    })
    return userFound;
  }
  toString () {
    let arr = []
    this.users.forEach((user, i) => {
      arr.push(user.user.username)
    })
    return arr.join(", ");
  }
}
module.exports = {UserManager: UserManager}
