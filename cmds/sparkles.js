module.exports = {
    name:'sparkles',
    categories: ['fun'],
    description: ['A szövegben lévő szóközöket ✨ emoji-ra cseréli.', 'Replaces the spaces with ✨ emoji in the text.'],
    usage: ['<szöveg>', '<text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var uzenet = args.slice(1, args.length).join('✨');

        if (args.length >= 2) {
            message.channel.send(uzenet);
        }
        else {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
    }
}