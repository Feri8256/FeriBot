const owoifyx = require('owoifyx');

module.exports = {
    name:'owoizer',
    aliases: ['owo', 'uwu'],
    categories: ['fun'],
    description: ['OwO ??', 'OwO ??'],
    usage: ['<szöveg>', '<text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var owoIn = args.slice(1, args.length).join(' ');

        if (!owoIn) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            message.channel.send(owoifyx(owoIn));
        }
    }
}