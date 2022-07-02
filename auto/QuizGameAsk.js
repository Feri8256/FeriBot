const fs = require('fs');
const findLanguage = require('../findLanguage')
module.exports = (message, client, L) => {
    let playerId = message.author.id + message.channel.id
    if (client.quizGamePlayers.has(playerId)) {
        let playersMap = client.quizGamePlayers;
        let d = playersMap.get(playerId);
        if (d.level <= 10) {
            let langSetting = findLanguage(client, message.guild.id);
            let QFile = fs.readFileSync(`./json/quiz/quiz-lvl${d.level}-${langSetting}.json`);
            let QParsed = JSON.parse(QFile);
            let QRandom = Math.floor(Math.random() * QParsed.Questions.length);
            message.reply({ content: `*${L.QuizQuestion}: ${d.level}/10*\n__**${QParsed.Questions[QRandom].questionText}**__\n[**A**: ${QParsed.Questions[QRandom].possibleAnswers[0].answerText}] [**B**: ${QParsed.Questions[QRandom].possibleAnswers[1].answerText}]\n[**C**: ${QParsed.Questions[QRandom].possibleAnswers[2].answerText}] [**D**: ${QParsed.Questions[QRandom].possibleAnswers[3].answerText}]` });

            d.question = QParsed.Questions[QRandom];
            playersMap.set(playerId, d);
        } else {
            message.reply({ content: 'You win!' });
            playersMap.delete(playerId);
        }
    }
};