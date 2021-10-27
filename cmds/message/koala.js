const fetch = require('node-fetch');
module.exports = {
    name:'koala',
    cooldown:true,
    categories: ['animals'],
    description: ['Képet küld koalákról', 'Sends a koala picture.'],
    //usage: ['', ''],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
   
        function koalaIsReady(d) {
            let KoalaEmbed = new Discord.MessageEmbed()
            KoalaEmbed.setColor('#FFFF00')
            KoalaEmbed.setImage(d.link)
            KoalaEmbed.setFooter('some-random-api.ml')
            KoalaEmbed.setTimestamp()

            message.channel.send({embeds: [KoalaEmbed]});
        }

        fetch('https://some-random-api.ml/img/koala')
        .then(res => res.json())
        .then(data => koalaIsReady(data))
    }
}