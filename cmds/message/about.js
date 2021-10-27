const os = require('os');

module.exports = {
    name: 'about',
    aliases: ['sys','stat','bot'],
    categories: ['info'],
    description: ['A botról.', 'About the bot.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let d = new Date(client.uptime)

        const SystemEmbed = new Discord.MessageEmbed()
        SystemEmbed.setColor('#5555ff')
        SystemEmbed.setTitle(L.AboutBotTitle)
        SystemEmbed.addFields(
            { name: L.AboutBotGuilds, value: String(client.guilds.cache.size), inline: true },
            { name: L.AboutBotGuildChannels, value: String(client.channels.cache.size), inline: true },
            { name: L.AboutBotUsers, value: String(client.users.cache.size), inline: true },
            { name: L.AboutBotMemUsage, value: Math.round(process.memoryUsage().heapUsed * 1 / 100000) + ' MB', inline: true },
            { name: L.AboutBotCPUClock, value: Math.round(((os.cpus()[1].speed) / 1000) * 100) / 100 + ' GHz', inline: true },
            { name: L.AboutBotUptime, value: `${d.getFullYear()-1970}y ${d.getMonth()}m ${d.getDate()-1}d - ${d.getHours()-1}h ${d.getMinutes()}m ${d.getSeconds()}s`, inline: true },
            { name: L.AboutBotExecutedCommands, value: String(client.ExecutedCmdCount), inline: true }
        )
        SystemEmbed.setFooter(`${L.RequestedBy}: ${message.author.tag}`)
        SystemEmbed.setTimestamp()
    
        message.channel.send({embeds: [SystemEmbed]});
    }
}