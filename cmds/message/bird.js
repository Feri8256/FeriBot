const fetch = require('node-fetch');
module.exports = {
    name:'bird',
    cooldown:true,
    aliases: ['madár'],
    categories: ['animals'],
    description: ['Képet küld madarakról', 'Sends a bird picture.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
   
        function birdIsReady(d) {
            let BirdEmbed = new Discord.MessageEmbed()
            BirdEmbed.setColor('RANDOM')
            BirdEmbed.setImage(d.link)
            BirdEmbed.setFooter('some-random-api.ml')
            BirdEmbed.setTimestamp()

            message.channel.send({embeds: [BirdEmbed]});
        }

        fetch('https://some-random-api.ml/img/bird')
        .then(res => res.json())
        .then(data => birdIsReady(data))
    }
}