module.exports = {
    name:'sin',
    categories: ['math'],
    description: ['Megadja a parancs után beírt szám szinusz értékét (deg).', 'Returns the sinus value of a number (deg).'],
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
            var sinOut = Math.sin(degIn * Math.PI / 180); //Alapvetően radiánban számolna, ezért egy kis szorzás osztás is kell hozzá
            message.reply(`sin ${degIn}° = **${sinOut}**`);
        }
    }
}