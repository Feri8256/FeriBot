module.exports = {
    name:'wolf',
    aliases: ['farkas', 'awoo'],
    categories: ['animals'],
    description: ['Képet küld farkasokról', 'Sends a wolf picture.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let wolfImgLink = require('../../json/animals/wolf-images.json');
        let rdmWolfNum = Math.floor(Math.random() * wolfImgLink.wolves.length);
    
        const WolfEmbed = new Discord.MessageEmbed()
        WolfEmbed.setColor('#979797')
        WolfEmbed.setImage(wolfImgLink.wolves[rdmWolfNum])
        WolfEmbed.setTimestamp()
        WolfEmbed.setFooter(`#${rdmWolfNum}`)
    
        message.channel.send({embeds: [WolfEmbed]});
    }
}