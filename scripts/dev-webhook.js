require("dotenv").config();
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook(process.env.HOOK_DEV);

const message =  process.argv[3];

hook.setUsername('crypto alerts');
hook.setAvatar('https://raw.githubusercontent.com/barrynorthern/crypto-alerts/master/assets/crypto-alert.png');

console.log("posting '" + message + "'");

hook.send(message) 
    .then(() => console.log('(sent to ' + process.env.HOOK_DEV + ')'))
    .catch(err => console.log(err.message));