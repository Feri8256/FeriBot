const fs = require('fs');
const QuizGameAsk = require('./QuizGameAsk');
const AnswerMap = { 'a':0, 'b':1, 'c':2, 'd':3 };
module.exports = (message, client, L, DataMgr, findLanguage) => {
    if (client.QuizGamePlayers.has(message.author.id + message.channel.id)) {
        let langSetting = findLanguage(client, message.guild.id);
//////////
        let MsgLowerCase = message.content.toLowerCase();

        switch (MsgLowerCase) {
            case 'cancel':
            case 'giveup':
            case 'exit':
                client.QuizGamePlayers.delete(message.author.id + message.channel.id);
                message.reply({content: L.QuizCancel}); //Feladja
                break;

            default:
                if (AnswerMap[MsgLowerCase] !== undefined) {
                    let d = client.QuizGamePlayers.get(message.author.id + message.channel.id);
                    let AnswerIndex = AnswerMap[MsgLowerCase];

                    if (d.question.possibleAnswers[AnswerIndex].correct) {
                        d.level++;
                        message.reply({content: `☑ ${L.QuizCorrectAnswer} (**+10** 🍪)`}); //helyes

                        let TestRead = DataMgr.Read(`./data/${message.guild.id}/coin`, message.author.id);
                        let CoinBefore;
                        if (!TestRead) {
                            CoinBefore = 0;
                        }
                        else {
                            CoinBefore = parseInt(TestRead);
                        }
                        DataMgr.Write(`./data/${message.guild.id}/coin`, message.author.id, CoinBefore + 10);
                        client.QuizGamePlayers.set(message.author.id + message.channel.id, d);

                        QuizGameAsk(message, client, L, DataMgr, findLanguage);
                    }
                    else {
                        //megkeresni a helyes megfejtést...
                        let CorrectAnswerIndex = d.question.possibleAnswers.findIndex(element => element.correct);

                        message.reply({content: `❌ ${L.QuizWrongAnswer.replace('{0}', d.question.possibleAnswers[CorrectAnswerIndex].answerText)}`}); //Helytelen
                        client.QuizGamePlayers.delete(message.author.id + message.channel.id);
                    }
                }
                
                break;
        }
    }
}