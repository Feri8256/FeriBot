const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const {Prefix} = require('../variables.json');
module.exports = {
    name:'base64',
    aliases: ['b64'],
    categories: ['it'],
    cooldown:true,
    description: ['Base64 kódolása/dekódolása (további segítség a parancson belül).', 'Encode/decode Base64 code (more help in the command).'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let inputString;
        let outputString;
    
        if (!args[1]) {
            let B64embed = new Discord.MessageEmbed()
            B64embed.setColor('#f3f3f3')
            B64embed.setTitle('B64')
            B64embed.setDescription(L.B64description)
            B64embed.addFields(
                { name: `${Prefix}b64 e <${L.TextPlaceHolder}> | ${Prefix}base64 e <${L.TextPlaceHolder}>`, value: L.B64eValue },
                { name: `${Prefix}b64 d <base64> | ${Prefix}base64 d <base64>`, value: L.B64dValue }
            )
            B64embed.setFooter(`[]: ${L.Optional} | <>: ${L.Required}`)
            message.channel.send(B64embed);
        }
        else {
            let xhttp = new XMLHttpRequest();
    
            switch (args[1]) {
                case 'e':
                    if (args[2]) {
                        inputString = args.slice(2, args.length).join(' ');
    
                        xhttp.onreadystatechange = function encodeb64Require() {
                            if (this.readyState == 4 && this.status == 200) {
                                let textResponse = xhttp.responseText;
                                let b64json = JSON.parse(textResponse);
                                outputString = b64json.base64;
    
                                message.reply(`\`${outputString}\``);
                            }
                        };
                        xhttp.open("GET", `https://some-random-api.ml/base64?encode=${encodeURI(inputString)}`, true);
                        xhttp.send();
                    }
                    else {
                        message.channel.send(ErrMessages.E_InvalidArgs(L));
                    }
                    break;
    
                case 'd':
                    if (args[2]) {
                        inputString = args.slice(2, args.length).join(' ');
    
                        xhttp.onreadystatechange = function decodeb64Require() {
                            if (this.readyState == 4 && this.status == 200) {
                                let textResponse = xhttp.responseText;
                                let b64json = JSON.parse(textResponse);
                                outputString = b64json.text;
    
                                message.reply(`\`${outputString}\``);
                            }
                        };
                        xhttp.open("GET", `https://some-random-api.ml/base64?decode=${encodeURI(inputString)}`, true);
                        xhttp.send();
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