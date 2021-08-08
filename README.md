# crypto-alerts

This simple node js application simply opens an alchemy websocket, initialises a smart contract using web3 for the game "cometh", registers some event listeners for in-game events from the smart contract, and when received, posts information about the event to a Discord webhook.

# usage

For this to work you need to supply your own .env file specifying the following:

* WEB3_SOCKETS=wss://polygon-mainnet.g.alchemy.com/v2/<YOUR-APP-KEY>
* HOOK_COMETH=https://discordapp.com/api/webhooks/<YOUR-DISCORD-WEBHOOK>
