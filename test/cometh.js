const expect = require("chai").expect;
const { getEventHandler } = require('../utils');
const cometh = require('../dapps/cometh');

describe("Cometh", () => {

    describe("Dapp library exports necessary fields", () => {
        it("returns an object with specific fields set", () => {
            expect(cometh).to.not.be.null;
            expect(cometh.name).to.equal("Cometh");
            expect(cometh.hook).to.not.be.null;
            expect(cometh.handlers).to.not.be.null;
            expect(cometh.contract).to.not.be.null;
            expect(cometh.abi).to.not.be.null;
        });
    });

    describe("Get new radioactive comet event", () => {
        it("returns a message containing {title,color,thumbnail} in response to event if the event hash != last hash", () => {
            const event = createEvent("NewStakingComet", "0x1", { solarSystemID: "2" });
            testEvent(event, "<@&876589438430507068> A new radioactive comet appeared on SOL3", "#5ae048");
        })
    });
    
    describe("Get new comet event", () => {
        it("returns a message containing {title,color,thumbnail} in response to event if the event hash != last hash", () => {
            const event = createEvent("NewComet", "0x2", { solarSystemID: "0" });
            testEvent(event, "<@&876588925915922432> A new comet appeared on SOL1", "#00b0f4");
        })
    });

    describe("Get an expired comet event", () => {
        it("returns a message containing {title,color,thumbnail} in response to event if the event hash != last hash", () => {
            const event = createEvent("RemoveComet", "0x3", { solarSystemID: "3" });
            testEvent(event, "<@&876589513307213876> A comet expired on SOL4", "#a83531");
        })
    });

    describe("Get an expired comet event on the remaining sol to test", () => {
        it("returns a message containing {title,color,thumbnail} in response to event if the event hash != last hash", () => {
            const event = createEvent("RemoveComet", "0x4", { solarSystemID: "1" });
            testEvent(event, "<@&876589260185157652> A comet expired on SOL2", "#a83531");
        })
    });
});

function testEvent(event, title, color) {
    const handler = getEventHandler(cometh, event);
    expect(handler).to.not.be.null;
    const message = handler.getMessage(event);
    expect(message).to.not.be.null;
    expect(handler.lastestTransation).to.equal(event.transactionHash);
    expect(message.title).to.equal(title);
    expect(message.color).to.equal(color);
    expect(message.thumbnail).to.not.be.null;
    const handlerForSameEvent = getEventHandler(cometh, event);
    expect(handlerForSameEvent).to.be.null;
}

function createEvent(event, transaction, returnValues) {
    return {
        returnValues: returnValues,
        event: event,
        transactionHash: transaction
    }
}