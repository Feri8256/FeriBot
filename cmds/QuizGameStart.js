const QuizGameAsk = require('../auto/QuizGameAsk')
module.exports = {
    name:'quiz',
    categories: ['games'],
    description:['Válaszolj kvíz kérdésekre.','Answer quiz questions. (not available in english yet)'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (client.QuizGamePlayer.has(message.author.id + message.channel.id)) {
            message.channel.send('Nem kezdhetsz új játékot, míg be nem fejezed az előzőt!'); //Nem kezdhetsz új játékot
        }
        else {
            client.QuizGameLevel.set(message.author.id, 1);
            message.channel.send(L.QuizStart);
            //kérdezzen is
            QuizGameAsk(message, client, L, DataMgr);
        }
    }
}