const fs = require('fs');
const findLanguage = require('../../findLanguage');
const wRegExp = /\u006D\u0069\u0074\u0020\u006D\u006F\u006E\u0064\u0020\u0061\u0020\u0072\u00F3\u006B\u0061|\u0077\u0068\u0061\u0074\u0020\u0064\u006F\u0065\u0073\u0020\u0074\u0068\u0065\u0020\u0066\u006F\u0078\u0020\u0073\u0061\u0079/iu
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

            if (wRegExp.test(message.content.toLowerCase())) {
                PickRdmNum = Math.floor(Math.random() * pAnswers.w.length);
                message.reply({content: pAnswers.w[PickRdmNum]});
            }
            else {
                PickRdmNum = Math.floor(Math.random() * pAnswers.answers.length);
                message.reply({content: pAnswers.answers[PickRdmNum]});
            }
        }
        else {
            message.reply({content: L.EightBallInvalidQ});
        }
    }
}