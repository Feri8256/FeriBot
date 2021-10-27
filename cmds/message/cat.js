const fetch = require('node-fetch');
module.exports = {
    name: 'cat',
    aliases: ['macska', 'cica', 'meow'],
    categories: ['animals'],
    cooldown:true,
    description: ['Képet küld macskákról.', 'Sends a cat picture.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {

        function catIsReady(d) {
            let CatEmbed = new Discord.MessageEmbed()
            CatEmbed.setColor('#FFFF00')
            CatEmbed.setImage(d.link)
            CatEmbed.setFooter('some-random-api.ml')
            CatEmbed.setTimestamp()
    
            message.channel.send({embeds: [CatEmbed]});
        }

        fetch(`https://some-random-api.ml/img/cat`)
        .then(res => res.json())
        .then(data => catIsReady(data))
            
    }
}