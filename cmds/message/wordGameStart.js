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
            let wordList = require(`../../json/words-${findLanguage(client, message.guild.id)}.json`);
            let rdmWordNum = Math.floor(Math.random() * wordList.length);
            let word = wordList[rdmWordNum];
    
            let playerObject = {
                normal: word,
                shuffled: arrShuffle(word).join(''),
                tries: Math.round(word.length / 2),
                hints: Math.round(word.length / 5)
            }
    
            client.wordGamePlayers.set(playerID, playerObject);
    
            message.reply({content: L.WordGameStart.replace('{0}',playerObject.shuffled).replace('{1}', playerObject.tries).replace('{2}', playerObject.hints)});
        }
    }
}