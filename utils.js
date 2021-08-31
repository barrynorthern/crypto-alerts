const utils = {
    getEventHandler: (dapp, event) => dapp.handlers[event.event],
    
    initDiscordBot: (hook, bot) => {
        hook.setUsername(bot?.username || 'crypto alerts');
        hook.setAvatar(bot?.avatar || 'https://raw.githubusercontent.com/barrynorthern/crypto-alerts/master/assets/crypto-alert.png');
    },
};

module.exports = utils;