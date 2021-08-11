# crypto-alerts

This simple node js application simply opens an alchemy websocket, initialises a smart contract using web3 for the game "cometh", registers some event listeners for in-game events from the smart contract, and when received, posts information about the event to a Discord webhook.

## usage

For this to work you need to supply your own .env file specifying the following:

* ```WEB3_SOCKETS=wss://polygon-mainnet.g.alchemy.com/v2/<YOUR-APP-KEY>```
* ```HOOK_COMETH=https://discordapp.com/api/webhooks/<YOUR-DISCORD-WEBHOOK>```
 
Then to run locally simply:
  
```$ node index.js```

## Roadmap
  
* ~Deploy as a docker container so this can run constantly~
* ~Improve event subscription to prevent multiple listeners~
* ~Refactor to generalise event subscription~
* ~Improve messaging formats~
* ~Create unit tests for dapp message handlers~
* Add support for other games / dapps
