module.exports = (message, L, client, DataMgr) => {
    let PlayerID = message.author.id + message.channel.id;

    if (client.GuessGamePlayers.has(PlayerID)) {
        let d = client.GuessGamePlayers.get(message.author.id + message.channel.id);
        switch (message.content.toLowerCase()) {
            case 'giveup':
                message.channel.send({content: `🙁 | ${L.GuessGameAnswer} ${d.number}`});
                client.GuessGamePlayers.delete(PlayerID);
                break;

            case 'cancel':
            case 'exit':
                message.channel.send({content: `${L.GuessGameClose} 👋🏼😄`});
                client.GuessGamePlayers.delete(PlayerID);
                break;
                
            default:
                if (message.content.length < 3 && !isNaN(parseInt(message.content))){
                    if (parseInt(message.content) === d.number) {
                        message.channel.send({content: `🎉 | ${L.GuessGameCongrats.replace('{0}',message.author.username)}\n${L.YourReward}: **${d.tries}** ${L.Cookies}! 🍪`});
                        
                        let TestRead = DataMgr.Read(`./data/${message.guild.id}/coin`, message.author.id);
                        let CoinBefore;
                        if (!TestRead) {
                            CoinBefore = 0;
                        }
                        else {
                            CoinBefore = parseInt(TestRead);
                        }
                        let coinsAfter = CoinBefore + d.tries;
                        DataMgr.Write(`./data/${message.guild.id}/coin`, message.author.id, coinsAfter);
                        client.GuessGamePlayers.delete(PlayerID);
                    }
                    else {
                        message.reply(`❌ | ${L.GuessGameNope}`);
                        if (d.tries > 0) {
                            d.tries--;
                            client.GuessGamePlayers.set(PlayerID, d);
                        }
                    }  
                }
                break;
        } 
    }
};