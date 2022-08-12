const arrShuffle = require('../../auto/module-arrayShuffle');
const findLanguage = require('../../findLanguage');
module.exports = {
    name:'word',
    categories: ['games'],
    description: ['Találj ki egy szót, aminek betűi össze lettek keverve.', '...'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let playerID = message.guild.id + message.author.id;
        if (client.wordGamePlayers.has(playerID)) {
            message.reply({content: L.WordGameNewNo});
        }
        else {
            let l = findLanguage(client, message.guild.id);
            let wordList = require(`../../json/words-${l}.json`);
            let rdmWordNum = Math.floor(Math.random() * wordList.length);
            let word = wordList[rdmWordNum];
    
            let playerObject = {
                normal: word,
                shuffled: arrShuffle(word).join(''),
                score: Math.round(word.length / 2) * 10,
                maxTries: Math.round(word.length / 2),
                tries: 0,
                hints: Math.round(word.length / 4),
                usedHints: []
            }
    
            client.wordGamePlayers.set(playerID, playerObject);
    
            message.reply({content: L.WordGameStart.replace('{0}',playerObject.shuffled).replace('{1}', playerObject.maxTries).replace('{2}', playerObject.hints)});
        }
    }
}