module.exports = {
    name: 'guess',
    categories: ['games'],
    description: ['Elindítja a *Gondoltam egy számra...* játékot.','Starts the *I tought of a number...* game.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (client.GuessGamePlayers.has(message.author.id + message.channel.id)) {
            message.channel.send(L.GuessGameNewNo);
        }
        else {
            let playerObject = {
                number: Math.floor(Math.random() * 11),
                tries: 10
            }
    
            message.channel.send({content: L.GuessGameStart});
    
            client.GuessGamePlayers.set(message.author.id + message.channel.id, playerObject);
        }
    }
}