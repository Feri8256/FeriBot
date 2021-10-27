const fs = require('fs');
const findLanguage = require('../findLanguage')
module.exports = (message, client, L, DataMgr) => {
    if (client.QuizGameLevel.has(message.author.id) && client.QuizGameLevel.get(message.author.id) <= 10) {
        var langSetting = findLanguage(client, message.guild.id)
//////////
        let QFile = fs.readFileSync(`./json/quiz/quiz-lvl${client.QuizGameLevel.get(message.author.id)}-${langSetting}.json`);
        let QParsed = JSON.parse(QFile);
        let QRandom = Math.floor(Math.random() * QParsed.Questions.length);
        message.reply({content: `*${L.QuizQuestion}: ${client.QuizGameLevel.get(message.author.id)}/10*\n__**${QParsed.Questions[QRandom].questionText}**__\n[**A**: ${QParsed.Questions[QRandom].possibleAnswers[0].answerText}] [**B**: ${QParsed.Questions[QRandom].possibleAnswers[1].answerText}]\n[**C**: ${QParsed.Questions[QRandom].possibleAnswers[2].answerText}] [**D**: ${QParsed.Questions[QRandom].possibleAnswers[3].answerText}]`});
        client.QuizGamePlayer.set(message.author.id + message.channel.id, QParsed.Questions[QRandom]);
    }
    else {
        message.reply({content: 'You win!'});
        client.QuizGamePlayer.delete(message.author.id + message.channel.id);
        client.QuizGameLevel.delete(message.author.id);
    }
};