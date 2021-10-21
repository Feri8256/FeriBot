module.exports = {
    name: 'reverse',
    aliases: ['rev'],
    categories: ['fun'],
    description: ['Fordított írás. A parancs után beírt szöveget visszafelé írja le.', 'Write text backwards.'],
    usage: ['<szöveg>', '<text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var TextToRev = args.slice(1, args.length).join(' ');

        if (!TextToRev) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            var reversedText = TextToRev.split('').reverse().join('');
            message.channel.send(reversedText);
        }
    }
}