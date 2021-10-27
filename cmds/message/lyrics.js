const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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
                let xhttp = new XMLHttpRequest();
    
                xhttp.onreadystatechange = function lyricsRequire() {
                    if (this.readyState == 4 && this.status == 200) {
                        let textResponse = xhttp.responseText;
                        let lyricsjson = JSON.parse(textResponse);
    
                        if (lyricsjson.error) {
                            message.channel.send({content: `❌ | ${lyricsjson.error}`});
                        }
                        else {
                            let rawLyrics = lyricsjson.lyrics;
                            let trimmedLyrics = rawLyrics.slice(0, 700);
    
                            let LyricsEmbed = new Discord.MessageEmbed()
                            LyricsEmbed.setColor('RANDOM')
                            LyricsEmbed.setTitle(`${lyricsjson.author} - ${lyricsjson.title}`)
                            LyricsEmbed.addFields(
                                { name: L.LyricsLyricsOf, value: `${trimmedLyrics}\n[...]` }
                            )
                            LyricsEmbed.setThumbnail(lyricsjson.thumbnail.genius)
                            LyricsEmbed.setFooter(lyricsjson.links.genius)
                            LyricsEmbed.setURL(lyricsjson.links.genius)
                            LyricsEmbed.setTimestamp()
    
                            message.channel.send({embeds: [LyricsEmbed]});
                        }
                    }
                };
    
                xhttp.open("GET", `https://some-random-api.ml/lyrics/?title=${encodeURI(inputTitle)}`, true);
                xhttp.send();
    
        }
    }
}