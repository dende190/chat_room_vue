const socket = io();

new Vue({
  el: '#app',
  data: {
    room: null,
    rooms: [],
  },
  methods: {
    send() {
      socket.emit('rooms', {
        name: this.room,
      });

      this.rooms.push(this.room);
    },
  },
});
