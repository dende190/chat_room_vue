const mongoLib = require('../lib/mongo');

const roomsServices = {
  get: async function(name) {
    return mongoLib.get({name: name});
  },
  getNames: async function() {
    const rooms = await mongoLib.getAll();
    let names = [];
    for (room of rooms) {
      names.push(room.name);
    }
    return names;
  },
  create: async function(rooms) {
    let roomsToAdd = [];
    for (let room of rooms) {
      let roomId = '';
      if (room[0].indexOf('room_') === -1) {
        continue;
      }

      if (await this.get(room[0])) {
        continue;
      }

      roomsToAdd.push({
        name: room[0],
        message: [],
      });
    }

    if (roomsToAdd.length > 0) {
      mongoLib.insert(roomsToAdd);
    }
  },
};

module.exports = roomsServices;
