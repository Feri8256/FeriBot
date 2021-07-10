const variables = require('../variables.json');
module.exports = {
    name:'uri',
    categories: ['it'],
    description: ['Egységes eróforrás-azonosító (URI) kódolása/dekódolása (további segítség a parancson belül).', 'Encode/decode URI (more help in the command).'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let inputString;
        let outputString;
    
        if (!args[1]) {
            let URIembed = new Discord.MessageEmbed()
            URIembed.setColor('#f3f3f3')
            URIembed.setTitle('URI')
            URIembed.setDescription(L.URIdescription)
            URIembed.addFields(
                { name: `${variables.Prefix}uri e <${L.TextPlaceHolder}>`, value: L.URIeValue },
                { name: `${variables.Prefix}uri d <URI>`, value: L.URIdValue }
            )
            URIembed.setFooter(`[]: ${L.Optional} | <>: ${L.Required}`)
            message.channel.send(URIembed);
        }
        else {
            switch (args[1]) {
                case 'e':
                    if (args[2]) {
                        inputString = args.slice(2, args.length).join(' ');
                        outputString = encodeURI(inputString);
    
                        message.reply(`\`${outputString}\``);
                    }
                    else {
                        message.channel.send(ErrMessages.E_InvalidArgs(L));
                    }
                    break;
    
                case 'd':
                    if (args[2]) {
                        inputString = args.slice(2, args.length).join(' ');
                        outputString = decodeURI(inputString);
    
                        message.reply(`\`${outputString}\``);
                    }
                    else {
                        message.channel.send(ErrMessages.E_InvalidArgs(L));
                    }
                    break;
    
                default:
                    message.channel.send(ErrMessages.E_InvalidArgs(L));
            }
        }
    }
}