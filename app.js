require("dotenv").config();
const express = require('express');
const app = express();
const { Webhook, MessageBuilder  } = require('discord-webhook-node');
const hook_cometh = new Webhook(process.env.HOOK_COMETH);

async function main() {
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(process.env.WEB3_SOCKETS);

    initCometh(web3);

    app.get('/', (req, res) => res.send('Crypto Alerts'));
    app.listen(8080, () => console.log('Server ready'));
}

function initCometh(web3) {
    initDiscord(hook_cometh);
    // Comet Manager V4
    const contract_CometManagerV4 = "0x78f3b8403A85A4c27E6a635Ec012De3eB8f1a072";
    const abi_CometManagerV4 = [{"inputs":[{"internalType":"address","name":"ssStore","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"NewComet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"capacity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"NewStakingComet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"RemoveComet","type":"event"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"},{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"uint16","name":"rotationSpeed","type":"uint16"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"addComet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"cometPosition","outputs":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"position","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"cometsFrom","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.Comet[]","name":"","type":"tuple[]"},{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"capacity","type":"uint256"},{"internalType":"uint256","name":"roverCount","type":"uint256"},{"internalType":"uint256","name":"cumulatedRate","type":"uint256"},{"internalType":"uint256","name":"collectable","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.StakingComet[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"countCometIn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"getComet","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.Comet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"getStakingComet","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"capacity","type":"uint256"},{"internalType":"uint256","name":"roverCount","type":"uint256"},{"internalType":"uint256","name":"cumulatedRate","type":"uint256"},{"internalType":"uint256","name":"collectable","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.StakingComet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"isModule","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"modules","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"removeComet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"solarSystemStore","outputs":[{"internalType":"contract ISolarSystemStore","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newModule","type":"address"}],"name":"updateModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"newModules","type":"address[]"}],"name":"updateModules","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStore","type":"address"}],"name":"updateSolarSystemStore","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const CometManagerV4 = new web3.eth.Contract(abi_CometManagerV4, contract_CometManagerV4);
    // example of how to call past events, with block number to start from
    //getPastEvents(17709137, CometManagerV4);
    addComethSmartContractListeners(CometManagerV4);
}

function initDiscord(hook) {
    hook.setUsername('crypto alerts');
    hook.setAvatar('https://raw.githubusercontent.com/barrynorthern/crypto-alerts/master/assets/crypto-alert.png');
}

function sendToDiscord(hook, message) {
    console.log(message);
    const embed = new MessageBuilder()
        .setTitle(message)
        .setColor('#00b0f4')
        .setThumbnail('https://raw.githubusercontent.com/cometh-game/cometh-assets/main/logo.png')
        .setTimestamp();
    hook.send(embed) 
        .then(() => console.log('(sent to discord)'))
        .catch(err => console.log(err.message));
}

function getComethSolName(comet) {
    return "SOL" + (parseInt(comet.solarSystemID, 10) + 1);
}

// Example of how to retrieve past events
// function getPastEvents(fromBlock, CometManagerV4) {
//     CometManagerV4.getPastEvents("NewStakingComet", { fromBlock: fromBlock, toBlock: "latest" })
//     .then((events) => {
//         console.log("Found " + events.length + " event(s)");
//         for (var event of events) {
//             let comet = event.returnValues;
//             let message = "A new radioactive comet appeared on " + getComethSolName(comet); 
//             console.log(message);
//         }
//     },
//     (err) => console.error(err));
// }

function addComethSmartContractListeners(CometManagerV4) {
    console.log("Registering Event Listeners");

    console.log("NewStakingComet");
    CometManagerV4.events.NewStakingComet()
        .on('data', (event) => {
            let comet = event.returnValues;
            let message = "A new radioactive comet appeared on " + getComethSolName(comet); 
            sendToDiscord(hook_cometh, message);
        })
        .on('error', console.error);

    console.log("NewComet");
    CometManagerV4.events.NewComet()
        .on('data', (event) => {
            let comet = event.returnValues;
            let message = "A new comet appeared on " + getComethSolName(comet); 
            sendToDiscord(hook_cometh, message);
        })
        .on('error', console.error);
        
    console.log("RemoveComet");
    CometManagerV4.events.RemoveComet()
        .on('data', (event) => {
            let comet = event.returnValues;
            let message = "A comet expired on " + getComethSolName(comet);
            sendToDiscord(hook_cometh, message);
        })
        .on('error', console.error);
}

main();