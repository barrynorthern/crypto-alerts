require("dotenv").config();
const express = require('express');
const app = express();
const { getEventHandler } = require('./utils');
const { Webhook, MessageBuilder  } = require('discord-webhook-node');

const dapps = [
    "cometh"
];

async function main() {
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(process.env.WEB3_SOCKETS);

    console.log("registering dapps");
    for (let dapp of dapps) {
        initDapp(web3, require('./dapps/' + dapp));
    }

    app.get('/', (req, res) => res.send('Visit the Crypto Alerts Discord <a href="https://discord.gg/Wbsbsrv4">https://discord.gg/Wbsbsrv4</a>'));
    app.listen(8080, () => console.log('Server ready'));
}

function initDapp(web3, dapp) {
    console.log(dapp.name);
    const hook = new Webhook(dapp.hook);
    initDiscordBot(hook);
    const contract = new web3.eth.Contract(dapp.abi, dapp.contract);    
    contract.events.allEvents().on('data', (data) => {
        var handler = getEventHandler(dapp, data);
        if (handler) {
            sendToDiscord(hook, handler.getMessage(data));
        }
    });
}

function initDiscordBot(hook) {
    hook.setUsername('crypto alerts');
    hook.setAvatar('https://raw.githubusercontent.com/barrynorthern/crypto-alerts/master/assets/crypto-alert.png');
}

function sendToDiscord(hook, message) {
    if (!message) {
        return;
    }
    console.log(message);
    // const embed = new MessageBuilder()
    //     .setTitle(message.title)
    //     .setColor(message.color)
    //     .setThumbnail(message.thumbnail)
    //     .setTimestamp();
    hook.send(message.title) 
        .then(() => console.log('(sent to discord)'))
        .catch(err => console.log(err.message));
}

main();