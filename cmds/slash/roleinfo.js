module.exports = {
    commandData: {
        name: 'roleinfo',
        description: 'Információk a megadott rangról.',
        options: [
            {
                name: 'role',
                type: 8,
                description: 'Rang',
                required: true
            }
        ]
    },
    execute(Discord, client, interaction, options, L) {
        let role = options.getRole('role');
        let rolePermNamesArr = role.permissions.toArray();
        let rolePermArrL = rolePermNamesArr.length;
        
        let rolePermNamesText = '';
        for (var i in rolePermNamesArr) {
            rolePermNamesText += rolePermNamesArr[i].toLowerCase().replace(/_/g, ' ');
            if (i < rolePermArrL - 1) rolePermNamesText += ', ';
        }

        let roleInfoEmbed = new Discord.MessageEmbed()
        roleInfoEmbed.setTitle(L.RoleInfoTitle)
        roleInfoEmbed.setColor(role.hexColor || 'RANDOM')
        roleInfoEmbed.addFields(
            { name: L.RoleInfoRole, value: String(role)},
            { name: L.RoleInfoName, value: role.name},
            { name: L.RoleInfoColorCode, value: role.hexColor},
            { name: 'ID', value: role.id},
            { name: L.RoleInfoPosition, value: String(role.rawPosition)},
            { name: L.RoleInfoHoist, value: role.hoist ? L.YesTrue : L.NoFalse},
            { name: L.RoleInfoCreatedAt, value: String(role.createdAt)},
            { name: L.RoleInfoPermissions, value: rolePermNamesText}
        )
        interaction.reply({embeds: [roleInfoEmbed]});
    }
}