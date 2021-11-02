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
        let { user, member } = options.getMember('user') ?? interaction;

        if (user.bot) return interaction.reply({content: 'Botokról való információszerzés még nem támogatott'});

        let UserEmbed = new Discord.MessageEmbed()
        UserEmbed.setColor('RANDOM')
        UserEmbed.setThumbnail(user.avatarURL())
        UserEmbed.setTitle(user.tag)
        UserEmbed.addFields(
            { name: 'ID', value: user.id },
            { name: L.UsrInfoAccountCreatedAt, value: String(user.createdAt) },
            { name: L.UsrInfoJoinedAt, value: String(member.joinedAt) },
            { name: L.UsrInfoNickName, value: member.nickname ? member.nickname : L.NotDefined },
            { name: L.UsrInfoHighestRole, value: String(member.roles.highest) },
            { name: 'bot?', value: user.bot ? L.YesTrue: L.NoFalse }
        )
        
        interaction.reply({ embeds: [UserEmbed] });
    }
}