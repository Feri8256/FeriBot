module.exports = {
    name:'userinfo',
    aliases: ['user','usr'],
    categories: ['info'],
    description: ['A megemlített felhasználóról információkat jelenít meg. Ha nincs megemlítve senki, akkor rólad.', 'Displays informations about the mentioned user. If no one mentioned, then about yourself.'],
    usage: ['[@Felhasználó#0000]', '[@User#0000]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let usr = message.mentions.users.first() || message.author;
        let member = message.guild.member(usr);

        let UserEmbed = new Discord.MessageEmbed()
        UserEmbed.setColor('RANDOM')
        UserEmbed.setThumbnail(usr.avatarURL())
        UserEmbed.setTitle(usr.tag)
        UserEmbed.addFields(
            { name: 'ID', value: usr.id },
            { name: L.UsrInfoAccountCreatedAt, value: usr.createdAt },
            { name: L.UsrInfoJoinedAt, value: member.joinedAt },
            { name: L.UsrInfoNickName, value: member.nickname ? member.nickname : L.NotDefined },
            { name: L.UsrInfoHighestRole, value: member.roles.highest },
            { name: 'bot?', value: usr.bot ? L.YesTrue: L.NoFalse }
        )
    
        message.channel.send(UserEmbed);
    }
}