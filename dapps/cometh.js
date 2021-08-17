const comethLogoUrl = 'https://raw.githubusercontent.com/cometh-game/cometh-assets/main/logo.png';

function getSolIndex(comet) {
    return parseInt(comet.solarSystemID, 10);
}

function getComethSolName(index) {
    return "SOL" + (index + 1);
}

function getSolRole(index) {
    const solRoles = [
        "<@&876588925915922432>",
        "<@&876589260185157652>",
        "<@&876589438430507068>",
        "<@&876589513307213876>"
    ];
    if (index < 0 || index >= solRoles.length) {
        return "";
    }
    return solRoles[index];
}

var handlers = {
    NewStakingComet: {
        getMessage: (event) => {
            var solIndex = getSolIndex(event.returnValues)
            var solName = getComethSolName(solIndex);
            var solRole = getSolRole(solIndex);
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
            var solRole = getSolRole(solIndex);
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
            var solRole = getSolRole(solIndex);
            return {
                title: solRole + " A comet expired on " + solName,
                color: '#a83531',
                thumbnail: comethLogoUrl
            };
        }
    }
};

module.exports = {
    name: "Cometh",
    handlers: handlers,
    hook: process.env.HOOK_COMETH,
    contract: "0x78f3b8403A85A4c27E6a635Ec012De3eB8f1a072",
    abi: [{"inputs":[{"internalType":"address","name":"ssStore","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"NewComet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"capacity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"NewStakingComet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"cometId","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"RemoveComet","type":"event"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"},{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"uint16","name":"rotationSpeed","type":"uint16"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"addComet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"cometPosition","outputs":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"position","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"cometsFrom","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.Comet[]","name":"","type":"tuple[]"},{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"capacity","type":"uint256"},{"internalType":"uint256","name":"roverCount","type":"uint256"},{"internalType":"uint256","name":"cumulatedRate","type":"uint256"},{"internalType":"uint256","name":"collectable","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.StakingComet[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"countCometIn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"getComet","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.Comet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"getStakingComet","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"components":[{"components":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"internalType":"struct PositionsV2.Cartesian","name":"center","type":"tuple"},{"components":[{"internalType":"uint32","name":"distance","type":"uint32"},{"internalType":"int128","name":"angle","type":"int128"}],"internalType":"struct PositionsV2.Polar","name":"last","type":"tuple"},{"internalType":"int32","name":"rotationSpeed","type":"int32"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"}],"internalType":"struct PositionsV2.Orbit","name":"orbit","type":"tuple"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"capacity","type":"uint256"},{"internalType":"uint256","name":"roverCount","type":"uint256"},{"internalType":"uint256","name":"cumulatedRate","type":"uint256"},{"internalType":"uint256","name":"collectable","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"internalType":"struct ICometManagerV4.StakingComet","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"isModule","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"modules","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cometId","type":"address"},{"internalType":"uint256","name":"solarSystemID","type":"uint256"}],"name":"removeComet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"solarSystemStore","outputs":[{"internalType":"contract ISolarSystemStore","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newModule","type":"address"}],"name":"updateModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"newModules","type":"address[]"}],"name":"updateModules","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStore","type":"address"}],"name":"updateSolarSystemStore","outputs":[],"stateMutability":"nonpayable","type":"function"}]
};