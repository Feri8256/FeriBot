module.exports = {
    commandData: {
        name: 'wolf',
        description: 'Awooooo!'
    },
    execute(Discord, client, interaction, options, L) {
        let { wolves } = require('../../json/animals/wolf-images.json');
        let rdmWolfNum = Math.floor(Math.random() * wolves.length);
    
        const WolfEmbed = new Discord.MessageEmbed()
        WolfEmbed.setColor('#979797')
        WolfEmbed.setImage(wolves[rdmWolfNum])
        WolfEmbed.setTimestamp()
        WolfEmbed.setFooter(`#${rdmWolfNum}`)
    
        interaction.reply({embeds: [WolfEmbed]});
    }
}