const fetch = require('node-fetch');

module.exports = {
    name:'lyrics',
    aliases: ['l'],
    cooldown:true,
    categories: ['info'],
    description: ['Megkeresi a megadott című dal zeneszövegét.', 'Searches lyrics of a song by title.'],
    usage: ['<dal cím>', '<song title>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (!args[1]) {
            message.channel.send({embeds: [ErrMessages.E_InvalidArgs(L)]});
        }
        else {
            let inputTitle = args.slice(1, args.length).join(' ');

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

                    message.channel.send({embeds: [LyricsEmbed]});
                }
            }

            fetch(`https://some-random-api.ml/lyrics/?title=${encodeURI(inputTitle)}`)
            .then(response => response.json())
            .then(data => lyricsReady(data))
        }
    }
}