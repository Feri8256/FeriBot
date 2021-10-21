const fs = require('fs-extra');

module.exports = {
    name:'leaderboard',
    aliases:['top'],
    categories: ['fun','info'],
    description: ['A 20 legtöbb kekszet elért tag rangsora.', 'Leaderboard of top-20 users, who are collected the most reward.'],
    //usage: ['', ''],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let MsgCh = message.channel;
        let MsgGuildID = message.guild.id;
    
        let readedDir = [];
        let readedData = [];
    
        if (fs.pathExistsSync(`./data/${MsgGuildID}/coin`)) {
            readedDir = fs.readdirSync(`./data/${MsgGuildID}/coin`);
            if (readedDir.length > 0) {
                for (var i in readedDir) {
                    var coinValues = parseInt(DataMgr.Read(`./data/${MsgGuildID}/coin`, readedDir[i]));
                    readedData.push({
                        userID: readedDir[i],
                        value: coinValues
                    });
                }
            }
        }
        else {
            MsgCh.send(L.LeaderBoardNoRanked);
        }
    
        let sortedData = readedData.sort(function(a,b){
            return a.value - b.value;
        }).reverse().slice(0,19);
    
        if (readedData.length === 0) return;
    
        leaderbEmbed = new Discord.MessageEmbed()
        leaderbEmbed.setTitle(L.LeaderBoardTitle)
    
        let textField = '';
        for (var i = 0; i < sortedData.length; i++) {
            textField += `**#${i + 1}** <@${sortedData[i].userID}> - \`${sortedData[i].value}\` 🍪\n`;
        }
    
        leaderbEmbed.addField(L.LeaderBoardTop20,textField)
        leaderbEmbed.setTimestamp()
        MsgCh.send(leaderbEmbed);
    }
}
