const fetch = require('node-fetch');
module.exports = {
    commandData: {
        name: 'cat',
        description: 'Miáú...'
    },

    execute(Discord, client, interaction, options, L) {
        function catIsReady(d) {
            let catEmbed = new Discord.MessageEmbed()
            catEmbed.setColor('#FFFF00')
            catEmbed.setImage(d.link)
            catEmbed.setFooter('some-random-api.ml')
            catEmbed.setTimestamp()
    
            interaction.reply({embeds: [catEmbed]});
        }

        fetch(`https://some-random-api.ml/img/cat`)
        .then(res => res.json())
        .then(data => catIsReady(data))
    }
}