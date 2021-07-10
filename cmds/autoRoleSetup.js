module.exports = {
    name:'autorole',
    categories: ['mod'],
    description: ['Automatikusan a beállított rangot adja a szerverre belépő felhasználóknak.', 'Automatically adding the specified role to joining users.'],
    usage: ['<@Rang>', '<@Role>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let guildID =   message.guild.id;
        let myRole = message.guild.member(client.user).roles.highest;

        if(message.member.hasPermission('MANAGE_ROLES')){
            switch(args[1]){
                case 'reset':
                        //visszaállít, töröl
                        DataMgr.Delete(`./data/${message.guild.id}`, 'role');
                        message.reply(`☑ | ${L.AutoRoleRemoved}`);
                    break;
        
                default:
                    if(message.mentions.roles.first()){
                        //érvényes
                        let mentionedRole   =   message.mentions.roles.first();
                        //Ha az említett rang alacsonyabb a bot legmagasabb rangjánál...
                        if (mentionedRole.comparePositionTo(myRole) < 0){
                            DataMgr.Write(`./data/${message.guild.id}`, 'role', mentionedRole.id);
                            message.reply(`☑ | ${L.AutoRoleAdded}`);
                        }
                        else {
                            message.reply(`❌ | ${L.AutoRoleHigher}`);
                        }
                    }
                    else{
                        //érvénytelen
                        message.reply(`❌ | ${L.AutoRoleInvalid}`);
                    }
            }
        }
        else{
            message.channel.send(ErrMessages.W_UsrNoPermission(L));
        }
    }
}