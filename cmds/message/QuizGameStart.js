const QuizGameAsk = require('../../auto/QuizGameAsk');
const findLanguage = require('../../findLanguage');
module.exports = {
    name:'quiz',
    categories: ['games'],
    description:['Válaszolj kvíz kérdésekre.','Answer quiz questions. (not available in english yet)'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (findLanguage(client, message.guild.id) === 1) return message.channel.send({content: '**Sorry!** This game is not available in English! :('}) 
        if (client.QuizGamePlayers.has(message.author.id + message.channel.id)) {
            message.channel.send({content: 'Nem kezdhetsz új játékot, míg be nem fejezed az előzőt!'}); //Nem kezdhetsz új játékot
        }
        else {
            let playerObject = {
                level: 1,
                question: null
            }
            client.QuizGamePlayers.set(message.author.id + message.channel.id, playerObject);
            message.channel.send({content: L.QuizStart});
            //kérdezzen is
            QuizGameAsk(message, client, L, DataMgr);
        }
    }
}