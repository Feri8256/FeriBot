module.exports = (message, L, client, DataMgr) => {
    let PlayerID = message.author.id + message.channel.id;

    if (client.GuessGame.has(PlayerID)) {
        switch (message.content.toLowerCase()) {
            case 'giveup':
                message.channel.send(`🙁 | ${L.GuessGameAnswer} ${client.GuessGame.get(message.author.id + message.channel.id)}`);
                client.GuessGame.delete(PlayerID);
                client.GuessTries.delete(PlayerID);
                break;

            case 'cancel':
            case 'exit':
                message.channel.send(`${L.GuessGameClose} 👋🏼😄`);
                client.GuessGame.delete(PlayerID);
                client.GuessTries.delete(PlayerID);
                break;
                
            default:
                if (message.content.length < 3 && !isNaN(parseInt(message.content))){
                    let CompareNumber = client.GuessGame.get(message.author.id + message.channel.id);
                    if (parseInt(message.content) === CompareNumber) {
                        message.channel.send(`🎉 | ${L.GuessGameCongrats.replace('{0}',message.author.username)}\n${L.YourReward}: **${client.GuessTries.get(PlayerID)}** ${L.Cookies}! 🍪`);
                        client.GuessGame.delete(PlayerID);
                        let TestRead = DataMgr.Read(`./data/${message.guild.id}/coin`, message.author.id);
                        let CoinBefore;
                        if (!TestRead) {
                            CoinBefore = 0;
                        }
                        else {
                            CoinBefore = parseInt(TestRead);
                        }
                        let coinsAfter = CoinBefore + client.GuessTries.get(PlayerID);
                        DataMgr.Write(`./data/${message.guild.id}/coin`, message.author.id, coinsAfter);
                        client.GuessTries.delete(PlayerID);
                    }
                    else {
                        message.reply(`❌ | ${L.GuessGameNope}`);
                        let triesBefore = client.GuessTries.get(PlayerID);
                        if (triesBefore > 0) {
                            let triesAfter = triesBefore - 1;
                            client.GuessTries.set(PlayerID, triesAfter);
                        }
                    }  
                }
                break;
        } 
    }
};