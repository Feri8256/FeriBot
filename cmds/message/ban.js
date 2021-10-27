const { Permissions } = require('discord.js');

module.exports = {
    name: 'ban',
    categories: ['mod'],
    reqPerms: [Permissions.FLAGS.BAN_MEMBERS],
    description: ['Kitiltja a megemlített felhasználót és menti az indoklást a szerver vizsgálati naplójába.', 'Bans the mentioned user and saves the reason to the server audit log.'],
    usage: ['<@Felhasználó#0000> <indok>', '<@User#0000> <reason>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let banTarget;
            if (!args[2]) {
                message.channel.send({embeds: [ErrMessages.E_InvalidArgs(L)]});
            }
            else {
                if (!message.mentions.users.first()) {
                    message.channel.send({content: `❌ | ${L.BanNoUser}`});
                }
                else {
                    banTarget = message.mentions.users.first();
    
                    if (banTarget === message.author) {
                        message.channel.send({content: `❌ | ${L.BanYourselfNo}`});
                    }
                    else if (banTarget === client.user) {
                        message.channel.send({content: `❌ | ${L.BanMeNo}`});
                    }
    
                    else {
                        let banReason = args.slice(2, args.length).join(' ');
                        let BanUsrName = banTarget.tag;
                        let BanUsr = message.guild.members.cache.get(banTarget.id)
    
                        BanUsr.ban({reason: banReason})
                        .then(() => {
                            let BanSucces = new Discord.MessageEmbed()
                            BanSucces.setTitle(`**${BanUsrName}** ${L.BannedBy} **${message.author.tag}**`)
                            BanSucces.setColor('#00ff00')
                            BanSucces.addFields(
                                { name: Language[langSetting].Reason, value: banReason }
                            )
                            BanSucces.setTimestamp()
    
                            message.channel.send({embeds: [BanSucces]});
                        })
                        .catch(err => message.channel.send({embeds: [ErrMessages.W_BotNoPermission(L)]}))
                    }
                }
            }
    }
}