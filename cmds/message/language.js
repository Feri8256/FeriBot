module.exports = {
    name:'language',
    aliases: ['lng','lang'],
    reqPerms: ['MANAGE_GUILD'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        
            if (!args[1]) {
                message.channel.send('You can change the bot language setting to this guild.\n\`f/language hu\` => Hungarian\n\`f/language en\` => English');
            }
            else {
                switch (args[1]) {
                    case 'hu':
                        DataMgr.Write(`./data/${message.guild.id}`, 'language', '0');
                        client.cachedLangSettings.set(message.guild.id, 0);
                        message.channel.send(`☑ | Language setting has been changed to: Hungarian!`);
                        break;
    
                    case 'en':
                        DataMgr.Write(`./data/${message.guild.id}`, 'language', '1');
                        client.cachedLangSettings.set(message.guild.id, 1);
                        message.channel.send(`☑ | Language setting has been changed to: English!`);
                        break;
    
                    default:
                        message.channel.send(`⚠ | Invalid argument!`);
                }
            }
    }
}