const fetch = require('node-fetch');
const { Hug_GIF_API, Hug_GIF_API_Property } = require('../variables.json');
module.exports = {
    name:'hug',
    cooldown:true,
    categories: ['fun'],
    description: ['Ingyen ölelés mindenkinek! (gif)', 'Free hug to everyone! (gif)'],
    usage: ['[@Felhasználó#0000]', '[@User#0000]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var hugEmbedText;
        var hugEmbedColor;
        if (!message.mentions.users.first()) {
            hugEmbedText = `${L.IHug} <@${message.author.id}> 🤗`;
            hugEmbedColor = '#FF94BC';
        }
        else if (message.mentions.users.first() === client.user) {
            hugEmbedText = `<@${message.author.id}> ${L.AHugMe} 😊`;
            hugEmbedColor = '#FF5795';
        }
        else if (message.mentions.users.first() === message.author) {
            hugEmbedText = `<@${message.author.id}> ${L.AHugA} 😄`;
            hugEmbedColor = '#1EC4FF';
        }
        else if (message.mentions.users.first()) {
            hugEmbedText = `<@${message.author.id}> ${L.AHugB} <@${message.mentions.users.first().id}>`;
            hugEmbedColor = '#FF94BC';
        }
    
        function hugIsReady(d) {
            let HugEmbed = new Discord.MessageEmbed()
            HugEmbed.setDescription(hugEmbedText)
            HugEmbed.setColor(hugEmbedColor)
            HugEmbed.setImage(d[Hug_GIF_API_Property])

            message.channel.send(HugEmbed);
        }

        fetch(Hug_GIF_API)
        .then(res => res.json())
        .then(data => hugIsReady(data))
    }
}