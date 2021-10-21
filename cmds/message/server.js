module.exports = {
    name:'server',
    aliases: ['serverinfo', 'guild', 'guildinfo'],
    categories: ['info'],
    description: ['Információkat jelenít meg a jelenlegi szerverről.', 'Informations about this guild.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let g = message.guild;
        let InfoEmbed = new Discord.MessageEmbed()
        InfoEmbed.setColor('#0044ee')
        InfoEmbed.setTitle(g)
        InfoEmbed.setThumbnail(g.iconURL())
        InfoEmbed.addFields(
            { name: 'ID', value: g.id },
            { name: L.ServerInfoCreatedAt, value: g.createdAt },
            { name: L.ServerInfoOwner, value: g.owner },
            { name: L.ServerInfoRegion, value: g.region },
            { name: L.ServerInfoMemberCount, value: g.memberCount },
            { name: L.ServerInfoRoleCount, value: g.roles.cache.size },
            { name: L.ServerInfoEmojiCount, value: g.emojis.cache.size },
            { name: L.ServerInfoChannels, value: `${L.ServerInfoChannelsTotal}: ${g.channels.cache.size}\n${L.ServerInfoChannelsText}: ${g.channels.cache.filter((ch)=> ch.type === 'text').size}\n${L.ServerInfoChannelsVoice}: ${g.channels.cache.filter((ch)=> ch.type === 'voice').size}\n${L.ServerInfoChannelsCategory}: ${g.channels.cache.filter((ch)=> ch.type === 'category').size}` },
            { name: L.ServerInfoIcon, value: `[Link](${g.iconURL()})`}
        )
        if(g.premiumSubscriptionCount > 0) {
            InfoEmbed.addField(L.ServerInfoBoostStatus, `${L.ServerInfoBoostCount}: ${g.premiumSubscriptionCount}\n${L.ServerInfoBoostTier}: ${g.premiumTier}`)
        }
        InfoEmbed.setFooter(`${L.RequestedBy}: ${message.author.tag}`)
        InfoEmbed.setTimestamp()

        message.channel.send(InfoEmbed);
    }
}