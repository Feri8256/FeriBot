const variables = require('../variables.json');
module.exports = {
    name: 'invites',
    categories: ['mod'],
    reqPerms: ['ADMINISTRATOR'],
    description: ['Meghívó linkek automatikus törlésének beállítása (további segítség a parancson belül).', 'Auto delete of invite URLs (more help in the command).'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
            if (!args[1]) {
                let InvSetupEmbed = new Discord.MessageEmbed()
                InvSetupEmbed.setColor('#eeeeee')
                InvSetupEmbed.setTitle(L.InvModSetupTitle)
                InvSetupEmbed.addFields(
                    { name: `${variables.Prefix}invites <0/1> [0/1]`, value: `• ${L.InvModSetupFirstArg}\n\n• ${L.InvModSetupSecondArg}` }
                )
                message.channel.send(InvSetupEmbed);
            }
            else if (args[1]) {
                let arg1 = '';
                let arg2 = '';
    
                //Engedélyez/letilt
                switch (args[1]) {
                    case '1':
                        arg1 = '1';
                        break;
    
                    case '0':
                        arg1 = '0';
                        break;

                    default:
                        arg1 = '0';
                        break;
                }
    
                //Figyelmeztet/nem figyelmeztet
                if (args[2]){
                    switch (args[2]) {
                    case '1':
                        arg2 = '1';
                        break;

                    case '0':
                        arg2 = '0';
                        break;

                    default:
                        arg2 = '0';
                        break;
                    }
                }
                else {
                    arg2 = '0';
                }
    
                DataMgr.Write(`./data/${message.guild.id}/mod_invite`, message.channel.id, arg1+";"+arg2);
    
                message.channel.send(L.InvModSetupSetSucces.replace('{0}',arg1).replace('{1}',arg2));
                
            }
    }
}