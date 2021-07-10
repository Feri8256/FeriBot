module.exports = {
    name: 'dec',
    categories: ['math'],
    description: ['A paracs után bevitt bináris számsorozatot átalakítja decimális számmá.', 'Converts binary to decimal.'],
    usage: ['<bináris számsor>', '<binary string>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (!args[1] || isNaN(args[1])) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            var binIn = parseInt(args[1]);
            var decOut = parseInt(binIn, 2);
            message.reply(`${L.MathBinYourInput}: **${binIn}**, ${L.MathBinToDec}: **${decOut}**`);
        }
    }
}