const fetch = require('node-fetch');
module.exports = {
    commandData: {
        name: 'findlyrics',
        description: 'Dalszöveg keresés a cím alapján',
        options: [
            {
                name: 'song-title',
                description: 'dal címe',
                required: true,
                type: 3
            }
        ]
    },
    execute(Discord, client, interaction, options, L) {
        let inputTitle = options.getString('song-title');
        interaction.deferReply()
        function lyricsReady(d) {
            if (d.error) {
                message.channel.send({content: `❌ | ${d.error}`});
            }
            else {
                let rawLyrics = d.lyrics;
                let trimmedLyrics = rawLyrics.slice(0, 700);

                let LyricsEmbed = new Discord.MessageEmbed()
                LyricsEmbed.setColor('RANDOM')
                LyricsEmbed.setTitle(`${d.author} - ${d.title}`)
                LyricsEmbed.addFields(
                    { name: L.LyricsLyricsOf, value: `${trimmedLyrics}\n[...]` }
                )
                LyricsEmbed.setThumbnail(d.thumbnail.genius)
                LyricsEmbed.setFooter(d.links.genius)
                LyricsEmbed.setURL(d.links.genius)
                LyricsEmbed.setTimestamp()

                interaction.editReply({embeds: [LyricsEmbed]});
            }
        }

        fetch(`https://some-random-api.ml/lyrics/?title=${encodeURI(inputTitle)}`)
        .then(response => response.json())
        .then(data => lyricsReady(data))
    }
}