Pusher = require('pusher-js');

window.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: `ap1`,
  encrypted: false
});
