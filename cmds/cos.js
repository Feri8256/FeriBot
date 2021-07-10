module.exports = {
    name:'cos',
    categories: ['math'],
    description: ['Megadja a parancs után beírt szám koszinusz értékét (deg).', 'Returns the cosinus value of a number (deg).'],
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
            var cosOut = Math.cos(degIn * Math.PI / 180);
            message.reply(`cos ${degIn}° = **${cosOut}**`);
        }
    }
}