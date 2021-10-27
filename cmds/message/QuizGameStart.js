const QuizGameAsk = require('../../auto/QuizGameAsk');
const findLanguage = require('../../findLanguage');
module.exports = {
    name:'quiz',
    categories: ['games'],
    description:['Válaszolj kvíz kérdésekre.','Answer quiz questions. (not available in english yet)'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (findLanguage(client, message.guild.id) === 1) return message.channel.send({content: '**Sorry!** This game is not available in English! :('}) 
        if (client.QuizGamePlayer.has(message.author.id + message.channel.id)) {
            message.channel.send({content: 'Nem kezdhetsz új játékot, míg be nem fejezed az előzőt!'}); //Nem kezdhetsz új játékot
        }
        else {
            client.QuizGameLevel.set(message.author.id, 1);
            message.channel.send({content: L.QuizStart});
            //kérdezzen is
            QuizGameAsk(message, client, L, DataMgr);
        }
    }
}