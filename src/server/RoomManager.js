var ObjectId = require('mongodb').ObjectID;
var JSON = require('circular-json');
class RoomManager {
  constructor(DB) {
    this.rooms = []
    this.DB = DB
  }
  enter (socket, user, id) {
    let roomFound = this.getRoomById(id)
    if (roomFound !== null) {
      user.roomId = id
      if (this.hasUserInRoom(user, roomFound) === -1) {
        roomFound.users.push(user)
        console.log("[ROOM] added user " + user.user.username + " in " + roomFound.name);
      }
      socket.emit('enteredRoom', JSON.stringify({"room":roomFound}))
    } else {
      this.DB.getRoom(id).then(room => {
        user.roomId = id
        room.users = [user]
        this.rooms.push(room)
        console.log("[ROOM] added room " + room.name);
        console.log("[ROOM] added user " + user.user.username + " in " + room.name);
        socket.emit('enteredRoom', JSON.stringify({"room":room}))
      }).catch(err => console.log(err));
    }
  }
  leave (socket, user) {
    let roomFound = this.getRoomById(user.roomId)
    if (!roomFound) return;
    this.removeUserInRoom(user, roomFound)
    if (roomFound.users.length === 0)
    this.rooms.forEach((room, i) => {
      if (room._id === roomFound.id) this.rooms.splice(i, 1)
      console.log("[ROOM] removed room " + roomFound.name);
    })
  }
  getRoomById (id) {
    let roomFound = null;
    console.log("[ROOM] try to find room " + id);
    this.rooms.forEach((room, i) => {
      if (room._id.toString() == id) {
        roomFound = room
        console.log("[ROOM] found room " + roomFound.name);
      }
    })
    return roomFound;
  }
  hasUserInRoom (usermy, room) {
    let userFound = -1;
    console.log("[ROOM] try to find " + usermy.user.username + " in " + room.name);
    room.users.forEach((user, i) => {
      if (user.user._id == usermy.user._id) {
        userFound = i
        console.log("[ROOM] found " + usermy.user.username + " in " + room.name);
      }
    })
    return userFound;
  }
  removeUserInRoom (usermy, room) {
    let userIndex = this.hasUserInRoom(usermy, room)
    if (userIndex !== -1) {
      console.log("[ROOM] " + usermy.user.username + " leaved " + room.name);
      room.users.splice(userIndex, 1)
    }
  }
  toString () {
    let result = []
    this.rooms.forEach(room => {
      let room2 = Object.assign({}, room)
      room2.users = room2.users.length
      result.push(room2)
    })
    return JSON.stringify(result);
  }
}
module.exports = {RoomManager: RoomManager}
