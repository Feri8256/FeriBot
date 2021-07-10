module.exports = {
    name:'unicode',
    aliases: ['charcode','char'],
    categories: ['it'],
    description: ['Megjeleníti a parancs után beírt karakter kódszámát.', 'Displays character code of a character.'],
    usage: ['<karakter>', '<char>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (!args[1]) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            var uniInput = args[1];
            var uniOutput = uniInput.charCodeAt();
            message.reply(`${L.UnicodeYourChar} (${uniInput}) ${L.UnicodeResult}: **${uniOutput}**`);
        }
    }
}