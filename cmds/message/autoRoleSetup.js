const { Permissions } = require('discord.js');
module.exports = {
    name:'autorole',
    categories: ['mod'],
    reqPerms: [Permissions.FLAGS.MANAGE_ROLES],
    description: ['Automatikusan a beállított rangot adja a szerverre belépő felhasználóknak.', 'Automatically adding the specified role to joining users.'],
    usage: ['<@Rang>', '<@Role>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let guildID =   message.guild.id;
        let myRole = message.guild.members.cache.get(client.user).roles.highest;

        //if(message.member.hasPermission('MANAGE_ROLES')){
            switch(args[1]){
                case 'reset':
                        //visszaállít, töröl
                        DataMgr.Delete(`./data/${message.guild.id}`, 'role');
                        message.reply({content: `☑ | ${L.AutoRoleRemoved}`});
                    break;
        
                default:
                    if(message.mentions.roles.first()){
                        //érvényes
                        let mentionedRole   =   message.mentions.roles.first();
                        //Ha az említett rang alacsonyabb a bot legmagasabb rangjánál...
                        if (mentionedRole.comparePositionTo(myRole) < 0){
                            DataMgr.Write(`./data/${message.guild.id}`, 'role', mentionedRole.id);
                            message.reply({content: `☑ | ${L.AutoRoleAdded}`});
                        }
                        else {
                            message.reply({content: `❌ | ${L.AutoRoleHigher}`});
                        }
                    }
                    else{
                        //érvénytelen
                        message.reply({content: `❌ | ${L.AutoRoleInvalid}`});
                    }
            }
        //}
        //else{
        //    message.channel.send({embeds: [ErrMessages.W_UsrNoPermission(L)]});
        //}
    }
}