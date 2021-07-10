const fetch = require('node-fetch');
module.exports = {
    name: 'dog',
    aliases: ['kutya', 'woof', 'puppy', 'vau'],
    cooldown:true,
    categories: ['animals'],
    description: ['Képet küld kutyákról.', 'Sends a dog picture.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
       function dogIsReady(d) {
            const DogEmbed = new Discord.MessageEmbed()
            DogEmbed.setColor('#9A4300')
            DogEmbed.setImage(d.link)
            DogEmbed.setTimestamp()
                
            message.channel.send(DogEmbed)
       }
    
       fetch('https://some-random-api.ml/img/dog')
       .then(res => res.json())
       .then(data => dogIsReady(data))
    }
}