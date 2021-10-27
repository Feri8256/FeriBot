const fetch = require('node-fetch');
module.exports = {
    name:'panda',
    cooldown:true,
    categories: ['animals'],
    description: ['Képet küld pandákról.', 'Sends a panda picture.'],
    //usage: ['', ''],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        
        function pandaIsReady(d) {
            let PandaEmbed = new Discord.MessageEmbed()
            PandaEmbed.setColor('#f5f5f5')
            PandaEmbed.setImage(d.link)
            PandaEmbed.setFooter('some-random-api.ml')
            PandaEmbed.setTimestamp()

            message.channel.send({embeds: [PandaEmbed]});
        }

        fetch('https://some-random-api.ml/img/panda')
        .then(res => res.json())
        .then(data => pandaIsReady(data))
    }
}