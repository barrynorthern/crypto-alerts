require("dotenv").config();
const express = require('express');
const app = express();
const { getEventHandler, initDiscordBot } = require('./utils');
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

    app.get('/', (req, res) => res.send('<iframe src="https://discord.com/widget?id=870958070245781505&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>'));
    app.listen(8080, () => console.log('Server ready'));
}

function initDapp(web3, dapp) {
    console.log(dapp.name);
    const contract = new web3.eth.Contract(dapp.abi, dapp.contract);    
    if (dapp.discords) {
        for (let discord of dapp.discords) {
            // init hook
            const hook = new Webhook(discord.hook);
            initDiscordBot(hook, discord.bot);
            // event handling
            if (discord.handlers) {
                contract.events.allEvents().on('data', (data) => {
                    var handler = getEventHandler(dapp, data);
                    if (handler) {
                        sendToDiscord(hook, handler.getMessage(data));
                    }
                });
            }
            // polling
            if (discord.poll?.init) {
                // init
                discord.poll.init(contract);
                //if (discord.poll.update && discord.poll.interval) {
                // To do, schedule updates on an interval
                //}
            }
        }
    }
    
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