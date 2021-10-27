const fetch = require('node-fetch');
module.exports = {
    name:'red-panda',
    cooldown:true,
    aliases: ['redpanda','vörös-panda'],
    categories: ['animals'],
    description: ['Képet küld vörös pandákról', 'Sends a red panda picture.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
   
        function rPandaisReady(d) {
            let RedPandaEmbed = new Discord.MessageEmbed()
            RedPandaEmbed.setColor('RANDOM')
            RedPandaEmbed.setImage(d.link)
            RedPandaEmbed.setFooter('some-random-api.ml')
            RedPandaEmbed.setTimestamp()

            message.channel.send({embeds: [RedPandaEmbed]});
        }

        fetch('https://some-random-api.ml/img/red_panda')
        .then(res => res.json())
        .then(data => rPandaisReady(data))
    }
}