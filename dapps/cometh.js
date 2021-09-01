const Q = require('q');

const comethLogoUrl = 'https://raw.githubusercontent.com/cometh-game/cometh-assets/main/logo.png';

function getSolIndex(comet) {
    return parseInt(comet.solarSystemID, 10);
}

function getComethSolName(index) {
    return "SOL" + (index + 1);
}

const solRoles = {
    "crypto-alerts": [
        "<@&876588925915922432>",
        "<@&876589260185157652>",
        "<@&876589438430507068>",
        "<@&876589513307213876>"
    ],
    "mars-guild": [
        "<@&882536879919104021>",
        "<@&882537625066565673>",
        "<@&882537839278047314>",
        "<@&882537963974717470>"
    ]
}

function getSolRole(index, type) {
    let roles = solRoles[type];
    if (roles == null || index < 0 || index >= roles.length) {
        return "";
    }
    return roles[index];
}

function createHandlers(type) {
    return {
        NewStakingComet: {
            getMessage: (event) => {
                var solIndex = getSolIndex(event.returnValues)
                var solName = getComethSolName(solIndex);
                var solRole = getSolRole(solIndex, type);
                return {
                    title: solRole + " A new radioactive comet appeared on " + solName,
                    color: '#5ae048',
                    thumbnail: comethLogoUrl
                };
            }
        },
        NewComet: {
            getMessage: (event) => {
                var solIndex = getSolIndex(event.returnValues)
                var solName = getComethSolName(solIndex);
                var solRole = getSolRole(solIndex, type);
                return {
                    title: solRole + " A new comet appeared on " + solName,
                    color: '#00b0f4',
                    thumbnail: comethLogoUrl
                };
            }
        },
        RemoveComet: {
            getMessage: (event) => {
                var solIndex = getSolIndex(event.returnValues)
                var solName = getComethSolName(solIndex);
                var solRole = getSolRole(solIndex, type);
                return {
                    title: solRole + " A comet expired on " + solName,
                    color: '#a83531',
                    thumbnail: comethLogoUrl
                };
            }
        }
    };
}

class StakingComet {
    remaining;
    age;
    capacity;
    roverCount;

    constructor(data) {
        const t18 = Math.pow(10, 18);
        const time = new Date().getTime() / 1000;

        var age = time - data.lastUpdate;

        this.roverCount = data.roverCount;
        this.capacity = data.capacity;
        this.remaining = data.balance / t18;
        this.rev = ((data.orbit.last.distance * 2 * Math.PI) / data.orbit.rotationSpeed) / 60; // minutes
        this.age = age / 3600;

        this.orbit = data.orbit;
        this.balance = data.balance;
        this.roverCount = data.roverCount;
        this.rate = data.rate;
        this.capacity = data.capacity;
        this.cumulatedRate = data.cumulatedRate;
        this.collectable = data.collectable;
        this.lastUpdate = data.lastUpdate;
    }
}

class Sol {
    solarSystemID;
    comets;
    stakingComets;

    constructor(id, data) {
        this.solarSystemID = id;
        this.comets = data[0];
        this.stakingComets = data[1].map(x => new StakingComet(x));
    }

    summary = () => getComethSolName(this.solarSystemID) + " has " + this.comets.length + " comet(s) and " + this.stakingComets.length + " radioactive comets";

    radioactiveCometSummary(index) {
        const comet = this.stakingComets[index];
        console.log("comet", comet);
    }
}

sols = [];

class Contract {
    _contract;
    constructor(contract) {
        this._contract = contract;
    }
    
    cometsFrom(solarSystemID) {
        return Q.promise((resolve, reject) => {
            this._contract.methods.cometsFrom(solarSystemID).call()
                .then((data) => {
                    var sol = new Sol(solarSystemID, data);
                    sols.push(sol);
                    resolve(sol);
                },
                (error) => reject(error))
        });
    }
}

function pollInit(contract) {
    // const cometh = new Contract(contract);
    // const getComets = [0, 1, 2, 3].map((x) => cometh.cometsFrom(x));
    // Promise.all(getComets)
    //     .then(() => {
    //         sols = sols.sort((sol0, sol1) => sol0.solarSystemID - sol1.solarSystemID);
    //         for (var i = 0; i < sols.length; ++i) {
    //             console.log(sols[i].summary());
    //         }
    //         const sol = sols[1];
    //         for (var i = 0; i < sol.stakingComets.length; ++i)  {
    //             sol.radioactiveCometSummary(i);
    //         }
    //     });
}

function pollUpdate(contract) {

}

module.exports = {
    name: "Cometh",
    discords: [
        {
            handlers: createHandlers("crypto-alerts"),
            poll: {
                // interval: 5000,
                // init: pollInit,
                // update: pollUpdate
            },
            hook: process.env.HOOK_COMETH,
        },
        {
            handlers: createHandlers("mars-guild"),
            poll: {},
            hook: process.env.HOOK_MARS_GUILD
        }
    ],
    contract: "0x78f3b8403A85A4c27E6a635Ec012De3eB8f1a072",
    abi: [{"inputs":[{"internalType":"address","name":"ssStore","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"NewComet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"capacity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"NewStakingComet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"RemoveComet","type":"event"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"},{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"uint16","name":"rotationSpeed","type":"uint16"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"addComet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"cometPosition","outputs":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"position","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"cometsFrom","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.Comet[]","name":"","type":"tuple[]"},{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"capacity","type":"uint256"},{"internalType":"uint256","name":"roverCount","type":"uint256"},{"internalType":"uint256","name":"cumulatedRate","type":"uint256"},{"internalType":"uint256","name":"collectable","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.StakingComet[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"countCometIn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"getComet","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.Comet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"getStakingComet","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"capacity","type":"uint256"},{"internalType":"uint256","name":"roverCount","type":"uint256"},{"internalType":"uint256","name":"cumulatedRate","type":"uint256"},{"internalType":"uint256","name":"collectable","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.StakingComet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"isModule","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"modules","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"removeComet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"solarSystemStore","outputs":[{"internalType":"contract ISolarSystemStore","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newModule","type":"address"}],"name":"updateModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"newModules","type":"address[]"}],"name":"updateModules","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStore","type":"address"}],"name":"updateSolarSystemStore","outputs":[],"stateMutability":"nonpayable","type":"function"}]
};