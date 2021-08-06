const fs = require('fs');
module.exports = {
    name: 'emote-statistics',
    aliases: ['emotestat','emotestats','emote-stats'],
    description: ['Figyeli a szerveren használt egyedi emotikonok használati gyakoriságát (reakciókban is).','Counts how many times a custom emote is used in the server (messages and reactions).'],
    usage: ['[1/0/reset]','[1/0/reset]'],
    //reqPerms: ['MANAGE_EMOJIS'],
    categories: ['info'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var emoteStatsEmbed;

        if (message.member.hasPermission('MANAGE_EMOJIS') && args[1]) {
            switch (args[1]) {
                case '1':
                    if (!fs.existsSync(`./data/${message.guild.id}/emotestats.json`) &&
                        (DataMgr.Read(`./data/${message.guild.id}`,'emotestat') === undefined ||
                        DataMgr.Read(`./data/${message.guild.id}`,'emotestat') === '0')
                    ) {
                        fs.writeFileSync(`./data/${message.guild.id}/emotestats.json`,'[]');
                        DataMgr.Write(`./data/${message.guild.id}`,'emotestat','1');
    
                        emoteStatsEmbed = new Discord.MessageEmbed()
                        emoteStatsEmbed.setTitle(L.EmoteStatsEnabled)
                        emoteStatsEmbed.setDescription(L.EmoteStatsEnabledDescription.replace('{0}',client.prefix))
                        message.channel.send(emoteStatsEmbed);
                    }
                    else {
                        message.reply(L.EmoteStatsAlreadyEnabled)
                    }
                    break;
    
                case '0':
                    if (fs.existsSync(`./data/${message.guild.id}/emotestats.json`) &&
                        (DataMgr.Read(`./data/${message.guild.id}`,'emotestat') != undefined ||
                        DataMgr.Read(`./data/${message.guild.id}`,'emotestat') === '1')
                    ) {
                        DataMgr.Write(`./data/${message.guild.id}`,'emotestat','0');
    
                        emoteStatsEmbed = new Discord.MessageEmbed()
                        emoteStatsEmbed.setTitle(L.EmoteStatsSuspended)
                        emoteStatsEmbed.setDescription(L.EmoteStatsSuspendedDescription.replace('{0}',client.prefix))
                        message.channel.send(emoteStatsEmbed);
                    }
                    else {
                        message.reply(L.EmoteStatsAlreadySuspended)
                    }
                    break;
    
                case 'reset':
                    if (fs.existsSync(`./data/${message.guild.id}/emotestats.json`)) {
                        if (JSON.parse(fs.readFileSync(`./data/${message.guild.id}/emotestats.json`)).length > 0) {
                            fs.writeFileSync(`./data/${message.guild.id}/emotestats.json`,'[]');
    
                            emoteStatsEmbed = new Discord.MessageEmbed()
                            emoteStatsEmbed.setTitle(L.EmoteStatsReseted)
                            emoteStatsEmbed.setDescription(L.EmoteStatsResetedDescription)
                            message.channel.send(emoteStatsEmbed);
                        }
                        else {
                            message.reply(L.EmoteStatsNothingToReset);
                        }
                    }
                    break;
            }
        }
        else {
            if (!fs.existsSync(`./data/${message.guild.id}/emotestats.json`)) {
                message.reply(L.EmoteStatsNoData)
            }
            else {
                let readedData = fs.readFileSync(`./data/${message.guild.id}/emotestats.json`);
                let parsedData = JSON.parse(readedData);

                if (parsedData.length > 0) {
                    emoteStatsEmbed = new Discord.MessageEmbed()
                    let sortedData = parsedData.sort(function(a,b){
                        return a.occurrances - b.occurrances;
                    }).reverse().slice(0,10);
    
                    emoteStatsEmbed.setTitle(L.EmoteStatsMostUsed)
                    emoteStatsEmbed.setDescription('top-10')
                    
                    let listText = '';
                    for (var e of sortedData) {
                        listText += `${e.emote} - \`${e.emote.split(':')[1]}\` - **${e.occurrances}**\n`
                    }
                    emoteStatsEmbed.addField(L.EmoteStatsListLabels, listText)
    
                    message.channel.send(emoteStatsEmbed);
                }
                else {
                    message.reply(L.EmoteStatsNoData)
                }
            }
        }
    }
}