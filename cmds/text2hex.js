const T2H = require('../auto/module-text2hex');

module.exports = {
    name:'hex',
    aliases:['text2hex'],
    categories: ['it'],
    description: ['Szöveget alakít át hexadecimális kóddá.', 'Converts text to hex string.'],
    usage: ['<szöveg>', '<text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let text = args.slice(1, args.length).join(' ');
        let converted = T2H(text);
    
        if (!converted) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            message.reply(`\`\`\`${converted}\`\`\``);
        }
    }
}