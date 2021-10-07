const socket = io();

new Vue({
  el: '#app',
  data: {
    step: 'nick',
    nick: null,
    message: null,
    messages: [],
    room: null,
    rooms: [],
  },
  methods: {
    send() {
      if (!this.message) {
        return;
      }

      socket.emit('message', this.room, {
        nick: this.nick,
        message: this.message,
        date: new Date().getTime(),
      });

      this.message = null;
    },
    signIn() {
      if (!this.nick) {
        return;
      }

      socket.emit('sign_in', this.room);
      this.step = 'chat';
    },
    createRoom() {
      socket.emit('rooms', {
        name: this.room,
      });

      this.room = ('room_' + this.room);
      this.rooms.push(this.room);
      this.hiddenRooms();
    },
    selectRoom(name) {
      this.room = name;
      this.hiddenRooms();
    },
    hiddenRooms() {
      this.$refs.roomCurrent.hidden = false;
      this.$refs.roomsContainer.hidden = true;
      this.$refs.roomName.disabled = true;
      this.$refs.signIn.hidden = false;
    }
  },
  mounted() {
    socket.on('message', message => {
      this.messages.push(message);
      const dChatContainer = this.$refs.chatPrueba;
      setTimeout(
        function() {
          dChatContainer.scroll(0, 1000);
        },
        100
      );
    });

    socket.on('message_all', messages => {
      this.messages = messages;
    });
  },
  created() {
    socket.on('rooms_names', rooms => {
      this.rooms = rooms
    });
  }
});
