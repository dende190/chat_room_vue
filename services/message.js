const mongoLib = require('../lib/mongo');
const roomsServices = require('../services/rooms');

const messageServices = {
  getAll: async function(roomName) {
    const room = await roomsServices.get(roomName);
    if (!room) {
      return [];
    }

    return room.message;
  },
  save: async function(roomName, data) {
    const room = await roomsServices.get(roomName);
    mongoLib.push(room._id, { message: data });
  },
};

module.exports = messageServices;
