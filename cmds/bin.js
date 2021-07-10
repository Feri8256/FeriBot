module.exports = {
    name:'bin',
    categories: ['it', 'math'],
    description: ['A parancs után bevitt decimális számot átalakítja binárissá.', 'Converts decimal to binary.'],
    usage: ['<decimális szám>', '<decimal number>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (!args[1] || isNaN(args[1])) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            var decIn = parseInt(args[1]);
            var binOut = (decIn).toString(2);
            message.reply(`${L.MathDecYourInput}: **${decIn}**, ${L.MathDecToBin}: **${binOut}**`);
        }
    }
}