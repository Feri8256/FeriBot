const fs = require('fs');
const QuizGameAsk = require('./QuizGameAsk');
const answerMap = { 'a':0, 'b':1, 'c':2, 'd':3 };
module.exports = (message, client, L, DataMgr, findLanguage) => {
    let playerId = message.author.id + message.channel.id;

    if (client.QuizGamePlayers.has(playerId)) {
        let msgLC = message.content.toLowerCase();
        let playersMap = client.quizGamePlayers;

        switch (msgLC) {
            case 'cancel':
            case 'giveup':
            case 'exit':
                playersMap.delete(playerId);
                message.reply({content: L.QuizCancel}); //Feladja
                break;

            default:
                if (answerMap[msgLC] !== undefined) {
                    let d = playersMap.get(playerId);
                    let AnswerIndex = answerMap[msgLC];

                    if (d.question.possibleAnswers[AnswerIndex].correct) {
                        d.level++;
                        message.reply({content: `☑ ${L.QuizCorrectAnswer} (**+10** 🍪)`}); //helyes

                        DataMgr.AddToNumber(`./data/${message.guild.id}/coin`, message.author.id, 10);
                        playersMap.set(playerId, d);

                        QuizGameAsk(message, client, L, DataMgr, findLanguage);
                    }
                    else {
                        //megkeresni a helyes megfejtést...
                        let CorrectAnswerIndex = d.question.possibleAnswers.findIndex(element => element.correct);

                        message.reply({content: `❌ ${L.QuizWrongAnswer.replace('{0}', d.question.possibleAnswers[CorrectAnswerIndex].answerText)}`}); //Helytelen
                        playersMap.delete(playerId);
                    }
                }
                
                break;
        }
    }
}