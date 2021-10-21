module.exports = {
    name:'kick',
    categories: ['mod'],
    reqPerms: ['KICK_MEMBERS'],
    description: ['Kirúgja a megemlített felhasználót és menti az indoklást a szerver vizsgálati naplójába.', 'Kicks the mentioned user and saves the reason to the server audit log.'],
    usage: ['<@Felhasználó#0000> <indok>', '<@User#0000> <reason>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let kickTarget;

            if (!args[2]) {
                //Nincsen meg a kellő mennyiségű indok
                message.channel.send(ErrMessages.E_InvalidArgs(L));
            }
            else {
                if (!message.mentions.users.first()) {
                    //Nincs kirúgandó felhasználó megadva
                    message.channel.send(`❌ | ${L.KickNoUser}`);
                }
                else {
                    kickTarget = message.mentions.users.first();
    
                    if (kickTarget === message.author) {
                        //Ha a kirúgandó felhasználó a parancs írója
                        message.channel.send(`❌ | ${L.KickYourselfNo}`);
                    }
                    else if (kickTarget === client.user) {
                        //Ha a kirúgandó felhasználó a bot :D
                        message.channel.send(`❌ | ${L.KickMeNo}`);
                    }
                    else {
                        let kickReason = args.slice(2, args.length).join(' ');
                        let kickUsrName = kickTarget.tag;
                        let kickUsr = message.guild.member(kickTarget);
    
                        kickUsr.kick(kickReason)
                        .then(() => {
                            let KickSucces = new Discord.MessageEmbed()
                            KickSucces.setTitle(`**${kickUsrName}** ${L.KickedBy} **${message.author.tag}**`)
                            KickSucces.setColor('#00ff00')
                            KickSucces.addFields(
                                { name: L.Reason, value: kickReason }
                            )
                            KickSucces.setTimestamp()
    
                            message.channel.send(KickSucces);
                        })
                        .catch(err => message.channel.send(ErrMessages.W_BotNoPermission(L)))
                    }
                }
            }
    }
}