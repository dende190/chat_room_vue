const socket = io();

new Vue({
  el: '#app',
  data: {
    step: 'nick',
    room: 'general',
    nick: null,
    message: null,
    messages: []
  },
  methods: {
    send() {
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

      this.step = 'chat';
    }
  },
  mounted() {
    socket.on('message', (msg) => {
      this.messages.push(msg);
    });
  }
});
