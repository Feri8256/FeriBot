const fetch = require('node-fetch');
module.exports = {
    name:'meme',
    cooldown: true,
    categories: ['fun'],
    description: ['Reddit mémet küld.', 'Sends a Reddit meme.'],
    //usage: ['', ''],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        function memeIsReady(d) {
            let MemeEmbed = new Discord.MessageEmbed()
            MemeEmbed.setColor('RANDOM')
            MemeEmbed.setTitle(d.title)
            MemeEmbed.setDescription(d.postLink)
            MemeEmbed.setFooter(`${L.RequestedBy}: ${message.author.tag}`)
            MemeEmbed.setTimestamp()

            if (d.nsfw) {
                MemeEmbed.addFields({ name: '⚠ NSFW ⚠', value: d.url })
            }
            else {
                MemeEmbed.setImage(d.url)
            }

            message.channel.send({embeds: [MemeEmbed]});
        }

        fetch("https://meme-api.herokuapp.com/gimme")
        .then(res => res.json())
        .then(data => memeIsReady(data))
    }
}