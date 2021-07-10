const arrShuffle = require('../auto/module-arrayShuffle');
const findLanguage = require('../findLanguage');
module.exports = {
    name:'word',
    //aliases: ['farkas', 'awoo'],
    categories: ['games'],
    description: ['...', '...'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
    //////////
        let wordGamePlayerID = message.guild.id + message.author.id;
        if (client.wordGamePlayer.has(wordGamePlayerID)) {
            message.reply(L.WordGameNewNo);
        }
        else {
            let wordList = require(`../json/words-${findLanguage(client, message.guild.id)}.json`);
            let rdmWordNum = Math.floor(Math.random() * wordList.length);
    
            let shWord = arrShuffle(wordList[rdmWordNum]).join('');
    
            client.wordGamePlayer.set(wordGamePlayerID, { normalWord: wordList[rdmWordNum], shuffledWord: shWord })

            let allowedTries = Math.round(wordList[rdmWordNum].length / 2);
            client.wordGamePlayerTries.set(wordGamePlayerID, allowedTries);
    
            let allowedHints = Math.round(wordList[rdmWordNum].length / 5);
            client.wordGamePlayerHints.set(wordGamePlayerID, allowedHints)
    
            message.reply(L.WordGameStart.replace('{0}',shWord).replace('{1}',allowedTries).replace('{2}',allowedHints));
        }
    }
}