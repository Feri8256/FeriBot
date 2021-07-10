const DataMgr = require('./dataManager');

module.exports = (client, guildID) => {
    let LS = 0;
    if (!client.cachedLangSettings.has(guildID)) {
        let rL = parseInt(DataMgr.Read(`./data/${guildID}`,'language'));
        if (!isNaN(rL)) {
            client.cachedLangSettings.set(guildID, rL);
            LS = rL;
        }
    }
    else {
        LS = client.cachedLangSettings.get(guildID);
    }
    return LS;
}