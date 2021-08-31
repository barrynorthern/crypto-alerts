const expect = require("chai").expect;
const { getEventHandler, initDiscordBot } = require('../utils');
const cometh = require('../dapps/cometh');

describe("Cometh", () => {

    describe("Dapp library exports necessary fields", () => {
        it("returns an object with specific fields set", () => {
            expect(cometh).to.not.be.null;
            expect(cometh.name).to.equal("Cometh");
            expect(cometh.discords).to.not.be.null;
            expect(cometh.discords[0].hook).to.not.be.null;
            expect(cometh.discords[0].poll).to.not.be.null;
            expect(cometh.discords[0].handlers).to.not.be.null;
            expect(cometh.discords[1].hook).to.not.be.null;
            expect(cometh.discords[1].poll).to.not.be.null;
            expect(cometh.discords[1].handlers).to.not.be.null;
            expect(cometh.contract).to.not.be.null;
            expect(cometh.abi).to.not.be.null;
        });
    });

    describe("Get new radioactive comet event", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("NewStakingComet", "0x1", { solarSystemID: "2" });
            testEvent(cometh.discords[0], event, "<@&876589438430507068> A new radioactive comet appeared on SOL3", "#5ae048");
        })
    });
    
    describe("Get new comet event", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("NewComet", "0x2", { solarSystemID: "0" });
            testEvent(cometh.discords[0], event, "<@&876588925915922432> A new comet appeared on SOL1", "#00b0f4");
        })
    });

    describe("Get an expired comet event", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("RemoveComet", "0x3", { solarSystemID: "3" });
            testEvent(cometh.discords[0], event, "<@&876589513307213876> A comet expired on SOL4", "#a83531");
        })
    });

    describe("Get an expired comet event on the remaining sol to test", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("RemoveComet", "0x4", { solarSystemID: "1" });
            testEvent(cometh.discords[0], event, "<@&876589260185157652> A comet expired on SOL2", "#a83531");
        })
    });

    describe("Get new radioactive comet event (mars)", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("NewStakingComet", "0x1", { solarSystemID: "2" });
            testEvent(cometh.discords[1], event, "@sol3 A new radioactive comet appeared on SOL3", "#5ae048");
        })
    });
    
    describe("Get new comet event (mars)", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("NewComet", "0x2", { solarSystemID: "0" });
            testEvent(cometh.discords[1], event, "@sol1 A new comet appeared on SOL1", "#00b0f4");
        })
    });

    describe("Get an expired comet event (mars)", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("RemoveComet", "0x3", { solarSystemID: "3" });
            testEvent(cometh.discords[1], event, "@sol4 A comet expired on SOL4", "#a83531");
        })
    });

    describe("Get an expired comet event on the remaining sol to test (mars)", () => {
        it("returns a message containing {title,color,thumbnail} in response to event", () => {
            const event = createEvent("RemoveComet", "0x4", { solarSystemID: "1" });
            testEvent(cometh.discords[1], event, "@sol2 A comet expired on SOL2", "#a83531");
        })
    });

    describe("Ensure cometh bot username and avatar are correct", () => {
        it("calls the initDiscordBot function with the comet settings with a test hook to verify expected values", () => {
            const mockHook = {
                setUsername: (username) => expect(username).to.equal("crypto alerts"),
                setAvatar: (avatar) => expect(avatar).to.equal("https://raw.githubusercontent.com/barrynorthern/crypto-alerts/master/assets/crypto-alert.png")
            };
            initDiscordBot(mockHook, cometh.bot);
        });
    });
});

function testEvent(discord, event, title, color) {
    const handler = getEventHandler(discord, event);
    expect(handler).to.not.be.null;
    const message = handler.getMessage(event);
    expect(message).to.not.be.null;
    expect(message.title).to.equal(title);
    expect(message.color).to.equal(color);
    expect(message.thumbnail).to.not.be.null;
}

function createEvent(event, transaction, returnValues) {
    return {
        returnValues: returnValues,
        event: event,
        transactionHash: transaction
    }
}