const utils = {
    getEventHandler: (dapp, event) => {
        var handler = dapp.handlers[event.event];
        if (!handler) {
            return null;
        } 
        const skip = handler.lastestTransation == event.transactionHash;
        handler.lastestTransation = event.transactionHash;
        return skip ? null : handler;
    }
};

module.exports = utils;