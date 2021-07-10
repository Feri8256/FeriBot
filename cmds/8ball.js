const fs = require('fs');
const findLanguage = require('../findLanguage');
const wdtfsRegExp = /mit mond a róka|what does the fox say/
module.exports = {
    name: '8ball',
    categories: ['fun'],
    description: ['Különféleképpen válaszol kérdésekre.', 'Answers questions.'],
    usage: ['<kérdés szövege>', '<question text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (args[2] && message.content.endsWith('?')) {
            let langSetting = findLanguage(client, message.guild.id);
            var AnswersRaw = fs.readFileSync(`./json/8ball-${langSetting}.json`);
            var pAnswers = JSON.parse(AnswersRaw);
            let PickRdmNum = 0;

            if (wdtfsRegExp.test(message.content.toLowerCase())) {
                PickRdmNum = Math.floor(Math.random() * pAnswers.wdtfs.length);
                message.reply(pAnswers.wdtfs[PickRdmNum]);
            }
            else {
                PickRdmNum = Math.floor(Math.random() * pAnswers.answers.length);
                message.reply(pAnswers.answers[PickRdmNum]);
            }
        }
        else {
            message.reply(L.EightBallInvalidQ);
        }
    }
}