const Discord = require('discord.js');

module.exports = (message, L, client) => {

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        let MyPrefxEmbed = new Discord.MessageEmbed()
        MyPrefxEmbed.setColor('#00FF00')
        MyPrefxEmbed.setTitle(`${L.MyPrefix} ${client.prefix}`)
        MyPrefxEmbed.setDescription(`${L.MyHelps} **${client.prefix}help**`)

        message.channel.send({embeds: [MyPrefxEmbed]})
    }
}