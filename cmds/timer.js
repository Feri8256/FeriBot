module.exports = {
    name:'timer',
    aliases: ['időzítő', 'countdown'],
    categories: ['misc'],
    description: ['A megadott perc lejártakor értesít', 'Notifies, when a given amount of minutes over'],
    usage: ['<perc>', '<minutes>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let minIn = parseInt(args[1]);
    
        if (!minIn || minIn < 1 || minIn > 100) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else if (isNaN(minIn)) {
            message.channel.send(ErrMessages.E_NaNError(L));
        }
        else {
            if (client.OngoingTimers.has(message.guild.id)) {
                message.reply('Már fut egy időzítő!')
            }
            else {
                let time = (minIn * 60) * 1000;
                client.OngoingTimers.add(message.guild.id);

                message.reply(`A(z) **${minIn} perces** visszaszámlálás megkezdődött!`);

                function timeIsOver() {
                    message.channel.send('⏲ **Lejárt az idő!**');
                    client.OngoingTimers.delete(message.guild.id);
                }

                setTimeout(timeIsOver, time)
            }
        }
    }
}