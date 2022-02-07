module.exports = {
    commandData: {
        name: 'userinfo',
        description: 'Információk felhasználókról',
        options: [
            {
                name:'user',
                type: 6,
                description:'említett felhasználó',
                required: false
            }
        ]
    },

    execute(Discord, client, interaction, options, L) {
        let member  = options.getMember('user') ?? interaction.member;

        let UserEmbed = new Discord.MessageEmbed()
        UserEmbed.setColor(member.roles.highest.hexColor)
        UserEmbed.setThumbnail(member.user.avatarURL())
        UserEmbed.setTitle(member.user.tag)
        UserEmbed.addFields(
            { name: 'ID', value: member.user.id },
            { name: L.UsrInfoAccountCreatedAt, value: String(member.user.createdAt) },
            { name: L.UsrInfoJoinedAt, value: String(member.joinedAt) },
            { name: L.UsrInfoNickName, value: member.nickname ? member.nickname : L.NotDefined },
            { name: L.UsrInfoHighestRole, value: String(member.roles.highest) },
            { name: 'bot?', value: member.user.bot ? L.YesTrue : L.NoFalse }
        )
        
        interaction.reply({ embeds: [UserEmbed] });
    }   
}