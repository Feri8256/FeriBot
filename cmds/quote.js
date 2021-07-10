const fs = require('fs');

module.exports = {
    name:'quote',
    categories: ['fun'],
    aliases: ['citatum'],
    description: ['Küld egy idézetet.', 'Sends a quote.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let idezetek = require(`../json/idezetek-${langSetting}.json`);
        let rdmIdezetNum = Math.floor(Math.random() * idezetek.length);
    
        let QuoteEmbed = new Discord.MessageEmbed()
        QuoteEmbed.setColor('RANDOM')
        QuoteEmbed.setTitle(L.CitatumHereYouR)
        QuoteEmbed.setDescription(idezetek[rdmIdezetNum].szoveg)
        QuoteEmbed.setFooter(`${L.Source}: ${idezetek[rdmIdezetNum].forras}`)
        QuoteEmbed.setTimestamp()
    
        message.channel.send(QuoteEmbed);
    }
}