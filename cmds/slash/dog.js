const fetch = require('node-fetch');
module.exports = {
    commandData: {
        name: 'dog',
        description: 'Vau!'
    },

    execute(Discord, client, interaction, options, L) {
        function dogIsReady(d) {
            let dogEmbed = new Discord.MessageEmbed()
            dogEmbed.setColor('#9A4300')
            dogEmbed.setImage(d.link)
            dogEmbed.setFooter('some-random-api.ml')
            dogEmbed.setTimestamp()
    
            interaction.reply({embeds: [dogEmbed]});
        }

        fetch(`https://some-random-api.ml/img/dog`)
        .then(res => res.json())
        .then(data => dogIsReady(data))
    }
}