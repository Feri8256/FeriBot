const blackListWords = require('../json/do-not-say-list.json');

module.exports = {
    name:'say',
    aliases: ['s', 'echo','repeat'],
    categories: ['fun'],
    description: ['Kiírja a szöveget, amit a parancs után írsz, majd törli az üzeneted.', 'Repeats you, then delete your message.'],
    usage: ['<szöveg>', '<text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var uzenet = args.slice(1, args.length).join(' ');

        if (args.length >= 2) {
            if (uzenet.includes('@everyone' || '@here')) {
                message.channel.send('🙄');
            }
            else {
    
                //Csúnya szó szűrő 
                var firstStep = uzenet.split(' ');
                for (var i = 0; i < firstStep.length; i++) {
                    if (blackListWords.includes(firstStep[i].toLowerCase())) firstStep[i] = '...';
                }
                var filteredMsg = firstStep.join(' ');
    
                message.delete()
                message.channel.send(filteredMsg);
            }
        }
        else {
            message.channel.send(L.SayWhat);
        }
    }
}