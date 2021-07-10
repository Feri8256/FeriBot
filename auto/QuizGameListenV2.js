const fs = require('fs');
const QuizGameAsk = require('./QuizGameAsk');
const AnswerMap = { 'a':0, 'b':1, 'c':2, 'd':3 };
module.exports = (message, client, L, DataMgr, findLanguage) => {
    if (client.QuizGameLevel.has(message.author.id) && client.QuizGamePlayer.has(message.author.id + message.channel.id)) {
        let langSetting = findLanguage(client, message.guild.id);
//////////
        let MsgLowerCase = message.content.toLowerCase();

        switch (MsgLowerCase) {
            case 'cancel':
            case 'giveup':
            case 'exit':
                client.QuizGamePlayer.delete(message.author.id + message.channel.id);
                client.QuizGameLevel.delete(message.author.id);
                message.reply(L.QuizCancel); //Feladja
                break;

            default:
                if (AnswerMap[MsgLowerCase] !== undefined) {
                    //Kérdés fájl megnyitása a válaszok figyelésére (QL = QuestionListen)
                    let Question = client.QuizGamePlayer.get(message.author.id + message.channel.id)
                    let AnswerIndex = AnswerMap[MsgLowerCase];

                    if (Question.possibleAnswers[AnswerIndex].correct) {
                        let PlayerLevelBefore = client.QuizGameLevel.get(message.author.id);
                        message.reply(`☑ ${L.QuizCorrectAnswer} (**+10** 🍪)`); //helyes

                        let TestRead = DataMgr.Read(`./data/${message.guild.id}/coin`, message.author.id);
                        let CoinBefore;
                        if (!TestRead) {
                            CoinBefore = 0;
                        }
                        else {
                            CoinBefore = parseInt(TestRead);
                        }
                        DataMgr.Write(`./data/${message.guild.id}/coin`, message.author.id, CoinBefore + 10);
                        client.QuizGameLevel.set(message.author.id, PlayerLevelBefore + 1);

                        QuizGameAsk(message, client, L, DataMgr, findLanguage);
                    }
                    else {
                        //megkeresni a helyes megfejtést...
                        let CorrectAnswerIndex = Question.possibleAnswers.findIndex(element => element.correct);

                        message.reply(`❌ ${L.QuizWrongAnswer.replace('{0}', Question.possibleAnswers[CorrectAnswerIndex].answerText)}`); //Helytelen
                        client.QuizGamePlayer.delete(message.author.id + message.channel.id);
                        client.QuizGameLevel.delete(message.author.id);
                    }
                }
                
                break;
        }
    }
}