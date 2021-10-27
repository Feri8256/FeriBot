module.exports = {
    name:'welcome',
    categories: ['mod'],
    reqPerms: ['MANAGE_CHANNELS'],
    description: ['Tagok szerverre belépésekor üdvözlő üzenetet küld a beállított csatornába (max 255 karakter).', 'Sends a message to the specified channel whenever a member joins to your server (max 255 character).'],
    usage: ['<#csatorna> <szöveg>', '<#channel> <text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let guildID =   message.guild.id;
        
        
            switch(args[1]){
                case 'reset':
                    //visszaállít, töröl
                    DataMgr.Delete(`./data/${guildID}`, 'welcome');
                    message.reply({content: `☑ | ${L.WelcomeRemoved}`});
                break;
            
            default:
                if(message.mentions.channels.first() && args[2]){
                    //érvényes
                    let mentionedChannel   =   message.mentions.channels.first();
                    let customMessageInput   =   args.slice(2, args.length);
                    let customMessage =   customMessageInput.slice(0, 255).join(' ');
                    DataMgr.Write(`./data/${guildID}`,'welcome', mentionedChannel.id + ';' + customMessage);
                    message.reply({content: `☑ | ${L.WelcomeAdded}`});
                }
                else{
                    //érvénytelen
                    message.channel.send({embeds: [ErrMessages.E_InvalidArgs(L)]});
                }
            }
    }
}