module.exports = {
    commandData: {
        name: 'server',
        description: 'Információk erről a szerverről.'
    },
    async execute(Discord, client, interaction, options, L) {
        let g = interaction.guild;
        let owner = await g.fetchOwner();
        
        let InfoEmbed = new Discord.MessageEmbed()
        InfoEmbed.setColor('#0044ee')
        InfoEmbed.setTitle(String(g.name))
        InfoEmbed.setThumbnail(g.iconURL())
        InfoEmbed.addFields(
            { name: 'ID', value: g.id },
            { name: L.ServerInfoCreatedAt, value: String(g.createdAt) },
            { name: L.ServerInfoOwner, value: String(owner) },
            { name: L.ServerInfoRegion, value: String(g.region) },
            { name: L.ServerInfoMemberCount, value: String(g.memberCount) },
            { name: L.ServerInfoRoleCount, value: String(g.roles.cache.size) },
            { name: L.ServerInfoEmojiCount, value: String(g.emojis.cache.size) },
            { name: L.ServerInfoChannels, value: `${L.ServerInfoChannelsTotal}: ${g.channels.cache.size}\n${L.ServerInfoChannelsText}: ${g.channels.cache.filter((ch)=> ch.type === 'GUILD_TEXT').size}\n${L.ServerInfoChannelsVoice}: ${g.channels.cache.filter((ch)=> ch.type === 'GUILD_VOICE').size}\n${L.ServerInfoChannelsCategory}: ${g.channels.cache.filter((ch)=> ch.type === 'GUILD_CATEGORY').size}` },
            { name: L.ServerInfoIcon, value: `[Link](${g.iconURL()})`}
        )
        if(g.premiumSubscriptionCount > 0) {
            InfoEmbed.addField(L.ServerInfoBoostStatus, `${L.ServerInfoBoostCount}: ${g.premiumSubscriptionCount}\n${L.ServerInfoBoostTier}: ${g.premiumTier}`)
        }
        InfoEmbed.setFooter(`${L.RequestedBy}: ${interaction.user.tag}`)
        InfoEmbed.setTimestamp()

        interaction.reply({embeds: [InfoEmbed]});
    }
}