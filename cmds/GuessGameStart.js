module.exports = {
    name: 'guess',
    categories: ['games'],
    description: ['Elindítja a *Gondoltam egy számra...* játékot.','Starts the *I tought of a number...* game.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (client.GuessGame.has(message.author.id + message.channel.id)) {
            message.channel.send(L.GuessGameNewNo);
        }
        else {
            let GuessPlayerID = message.author.id + message.channel.id;
            let GuessRdmNum = Math.floor(Math.random() * 11);
    
            message.channel.send(L.GuessGameStart);
    
            client.GuessGame.set(GuessPlayerID, GuessRdmNum);
            client.GuessTries.set(GuessPlayerID, 10);
        }
    }
}