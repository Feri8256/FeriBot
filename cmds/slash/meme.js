//import fetch from 'node-fetch';
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetch = require('node-fetch');
module.exports = {
    commandData: {
        name: 'meme',
        description: 'Mém...'
    },

    execute (Discord, client, interaction, options, L) {
        interaction.deferReply();
        function memeReady(d) {
            let MemeEmbed = new Discord.MessageEmbed()
            MemeEmbed.setColor('RANDOM')
            MemeEmbed.setTitle(d.title)
            MemeEmbed.setDescription(d.postLink)
            MemeEmbed.setFooter(`${L.RequestedBy}: ${interaction.user.tag}`)
            MemeEmbed.setTimestamp()

            if (d.nsfw) {
                MemeEmbed.addFields({ name: '⚠ NSFW ⚠', value: d.url })
            }
            else {
                MemeEmbed.setImage(d.url)
            }

            interaction.editReply({embeds: [MemeEmbed]});
        }

        fetch("https://meme-api.herokuapp.com/gimme")
        .then(res => res.json())
        .then(data => memeReady(data))
    }
}