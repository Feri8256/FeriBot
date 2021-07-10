const fetch = require('node-fetch');
const { Pat_GIF_API, Pat_GIF_API_Property } = require('../variables.json');
module.exports = {
    name:'pat',
    cooldown:true,
    categories: ['fun'],
    description: ['Ingyen simogatás mindenkinek! (gif)', 'Free pat to everyone! (gif)'],
    usage: ['[@Felhasználó#0000]', '[@User#0000]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var patEmbedText;
        var patEmbedColor;
        if (!message.mentions.users.first()) {
            patEmbedText = `${L.IPat} <@${message.author.id}> 😊`;
            patEmbedColor = '#FF94BC';
        }
        else if (message.mentions.users.first() === client.user) {
            patEmbedText = `<@${message.author.id}> ${L.APatMe} 😊`;
            patEmbedColor = '#FF5795';
        }
        else if (message.mentions.users.first() === message.author) {
            patEmbedText = `<@${message.author.id}> ${L.APatA} 😄`;
            patEmbedColor = '#1EC4FF';
        }
        else if (message.mentions.users.first()) {
            patEmbedText = `<@${message.author.id}> ${L.APatB} <@${message.mentions.users.first().id}>`;
            patEmbedColor = '#FF94BC';
        }
    
        function patIsReady(d) {
            let PatEmbed = new Discord.MessageEmbed()
            PatEmbed.setDescription(patEmbedText)
            PatEmbed.setColor(patEmbedColor)
            PatEmbed.setImage(d[Pat_GIF_API_Property])

            message.channel.send(PatEmbed);
        }
        
        fetch(Pat_GIF_API)
        .then(res => res.json())
        .then(data => patIsReady(data))
    }
}