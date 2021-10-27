module.exports = {
    name:'userinfo',
    aliases: ['user','usr'],
    categories: ['info'],
    description: ['A megemlített felhasználóról információkat jelenít meg. Ha nincs megemlítve senki, akkor rólad.', 'Displays informations about the mentioned user. If no one mentioned, then about yourself.'],
    usage: ['[@Felhasználó#0000]', '[@User#0000]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let usr = message.mentions.users.first() || message.author;
        let member = message.guild.members.cache.get(usr.id);

        let UserEmbed = new Discord.MessageEmbed()
        UserEmbed.setColor('RANDOM')
        UserEmbed.setThumbnail(usr.avatarURL())
        UserEmbed.setTitle(usr.tag)
        UserEmbed.addFields(
            { name: 'ID', value: usr.id },
            { name: L.UsrInfoAccountCreatedAt, value: String(usr.createdAt) },
            { name: L.UsrInfoJoinedAt, value: String(member.joinedAt) },
            { name: L.UsrInfoNickName, value: member.nickname ? member.nickname : L.NotDefined },
            { name: L.UsrInfoHighestRole, value: String(member.roles.highest) },
            { name: 'bot?', value: usr.bot ? L.YesTrue: L.NoFalse }
        )
    
        message.channel.send({embeds: [UserEmbed]});
    }
}