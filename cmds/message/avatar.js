module.exports = {
    name: 'avatar',
    aliases: ['pfp','profilkép'],
    categories: ['info'],
    usage: ['[@Felhasználó#0000]','[@User#0000]'],
    description: ["A te, vagy az említett felhasználó profilképét jeleníti meg.","Displays your or the mentioned user's avatar."],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let usr = message.mentions.users.first() || message.author;
        let pfpEmbed = new Discord.MessageEmbed()
            pfpEmbed.setTitle(L.AvatarUser.replace('{0}',usr.tag))
            pfpEmbed.setImage(usr.displayAvatarURL({size:256}))

        message.channel.send({embeds: [pfpEmbed]})
    }
}