module.exports = {
    name:'tan',
    categories: ['math'],
    description: ['Megadja a parancs után beírt szám tangens értékét (deg).', 'Returns the tangent value of a number (deg).'],
    usage: ['<fok érték>', '<degree value>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var degIn = parseInt(args[1]);
    
        if (!degIn) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else if (isNaN(degIn)) {
            message.channel.send(ErrMessages.E_NaNError(L));
        }
        else {
            var tanOut = Math.tan(degIn * Math.PI / 180);
            message.reply(`tan ${degIn}° = **${tanOut}**`);
        }
    }
}