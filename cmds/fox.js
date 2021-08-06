module.exports = {
    name: 'fox',
    aliases: ['róka'],
    categories: ['animals'],
    description: ['Képet küld rókákról.', 'Sends a fox picture.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let foxImgLink = require('../json/animals/fox-images.json');
        let maxLength = foxImgLink.foxes.length
        let rdmFoxNum = 0;

        if (args[1]) {
            let numberInput = parseInt(args[1]);
            if (isNaN(numberInput) ||
                numberInput >= maxLength ||
                numberInput <= 0
            ) {
                rdmFoxNum = Math.floor(Math.random() * maxLength);
            }
            else {
                rdmFoxNum = numberInput;
            }
        }
        else {
            rdmFoxNum = Math.floor(Math.random() * maxLength);
        }
        
        const FoxEmbed = new Discord.MessageEmbed()
        FoxEmbed.setColor('#d86716')
        FoxEmbed.setImage(foxImgLink.foxes[rdmFoxNum])
        FoxEmbed.setTimestamp()
        FoxEmbed.setFooter(`#${rdmFoxNum}`)
    
        message.channel.send(FoxEmbed)
    }
}