const fs = require('fs');
const emoteMatchRegexp = /(<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g
const DataMgr = require('../dataManager');
module.exports = (message, reaction) => {
    let msgContent = message.content;

    //Üzenetet dolgozunk fel
    if (message && msgContent.match(emoteMatchRegexp)) {
        if (DataMgr.Read(`./data/${message.guild.id}`,'emotestat') === '1') {
            let result = msgContent.match(emoteMatchRegexp).slice(0,5); //Ha a regex-ben van global flag (g), akkor a match kimenete tömb
            let guildEmotes = message.guild.emojis.cache.toJSON();
            for (var e of result) {
                if (guildEmotes.find(emm => emm.id === e.split(':')[2].slice(0,18))) saveResult(e, message.guild.id); //Az emoji az adott szerverhez tartozik-e, csak akkor menti
            } 
        }
    }

    //Reakciót dolgozunk fel
    if (reaction) {
        if (
            DataMgr.Read(`./data/${reaction.message.guild.id}`,'emotestat') === '1' &&
            reaction._emoji.id != null &&
            reaction.message.guild.emojis.cache.toJSON().find(emr => emr.id === reaction._emoji.id) //Az emoji az adott szerverhez tartozik-e, csak akkor halad tovább
        ) {
            saveResult(reaction._emoji.toString(), reaction.message.guild.id)
        }
    }

    function saveResult(emoteStr, guildID) {
        //Betölt
        let loaded = JSON.parse(fs.readFileSync(`./data/${guildID}/emotestats.json`));

        //Keres
        let found = loaded.find(e => e.emote === emoteStr && e.occurrances >= 1);

        //Hozzáad/módosít
        if (found === undefined){
            loaded.push({"emote":emoteStr, "occurrances": 1});
        }
        if (found) {
            found.occurrances += 1;
        }

        //mentés
        fs.writeFileSync(`./data/${guildID}/emotestats.json`, JSON.stringify(loaded))
    }
}