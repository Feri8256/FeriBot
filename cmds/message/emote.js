const { Util } = require('discord.js');
const variables = require('../../variables.json');
module.exports = {
    name: 'emote',
    categories: ['misc'],
    description: ['Szerver emotikont képként jelenít meg.', 'Displays an emote as an image.'],
    usage: ['<szerver emotikon>', '<server emote>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (!args[1]) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            let emote = Util.parseEmoji(args[1])
            if(emote.id !== null) {
                let emoteURLExt = emote.animated ? '.gif' : '.png'
                let emoteURL = variables.Emoji_BaseUrl + emote.id + emoteURLExt

                message.channel.send({ content: `\`${emote.name}\``, files: [emoteURL] })
            }
            else {
                message.channel.send({content: `❌ | ${L.EmoteNotValid}`});
            }
        }
    }
}