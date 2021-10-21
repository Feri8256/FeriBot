module.exports = {
    name:'role',
    aliases: ['roleinfo','rang','ranginfo'],
    categories: ['info'],
    description: ['Információk a megadott rangról.', 'informations about a given role.'],
    usage: ['<@Rang>', '<@Role>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let role = message.mentions.roles.first();

        if (role == null || role == undefined) {
            message.channel.send(ErrMessages.E_InvalidArgs(L))
        }
        else {
            let rolePermNamesArr = role.permissions.toArray();
            let rolePermArrL = rolePermNamesArr.length;
            let rolePermNamesText = '';

            for (var i in rolePermNamesArr) {
                rolePermNamesText += rolePermNamesArr[i].toLowerCase().replace(/_/g, ' ');
                if (i < rolePermArrL - 1) rolePermNamesText += ', ';
            }

            let roleInfoHoistedText = ''
            if (role.hoist) {
                roleInfoHoistedText = L.YesTrue;
            }
            else {
                roleInfoHoistedText = L.NoFalse;
            }

            //valid arg
            let roleInfoEmbed = new Discord.MessageEmbed()
            roleInfoEmbed.setTitle(L.RoleInfoTitle)
            roleInfoEmbed.setColor(role.hexColor || 'RANDOM')
            roleInfoEmbed.addFields(
                { name: L.RoleInfoRole, value: role},
                { name: L.RoleInfoName, value: role.name},
                { name: L.RoleInfoColorCode, value: role.hexColor},
                { name: 'ID', value: role.id},
                { name: L.RoleInfoPosition, value: role.rawPosition},
                { name: L.RoleInfoHoist, value: roleInfoHoistedText},
                { name: L.RoleInfoCreatedAt, value: role.createdAt},
                { name: L.RoleInfoPermissions, value: rolePermNamesText}
            )
            message.channel.send(roleInfoEmbed);
        }
    }
}