module.exports = {
    name:'roulette',
    aliases: ['r'],
    categories: ['games'],
    description: ['Tippelj meg elsőre egy véletlenszámot.', 'Guess a number for the first time.'],
    usage: ['<1-100>', '<1-100>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let rdmNum = Math.floor(Math.random() * 100) + 1;
        let input = parseInt(args[1]);
        let difference = Math.abs(input - rdmNum);
        let playerId = message.author.id;
        let maxPoints = 100;

        if (isNaN(input) || !input || input > 100 || input < 1) {
            message.channel.send({embeds: [ErrMessages.E_InvalidArgs(L)]});
        }
        else {
            let reward = 0;

            if (difference === 0) { //1
                message.reply({content: `🎉 | **${L.RouletteGameText1}**\n${L.YourReward}: **${maxPoints}** ${L.Cookies}! 🍪`});
                reward = maxPoints;
            }
            else if (difference >= 1 && difference <= 5) { //2
                reward = ((maxPoints/2) - difference);
                message.reply({content: `**${L.RouletteGameText2}**\n${L.RouletteGameTextNumWas}: **${rdmNum}**\n${L.RouletteGameTextDifference}: **${difference}**\n${L.YourReward}: **${reward}** ${L.Cookies}! 🍪`});

            }
            else if (difference >= 6 && difference <= 10) { //3
                reward = ((maxPoints/2) - difference);
                message.reply({content: `**${L.RouletteGameText3}**\n${L.RouletteGameTextNumWas}: **${rdmNum}**\n${L.RouletteGameTextDifference}: **${difference}**\n${L.YourReward}: **${reward}** ${L.Cookies}! 🍪`});
            }
            else if (difference >= 11 && difference <= 19) { //4
                reward = ((maxPoints/2) - difference);
                message.reply({content: `**${L.RouletteGameText4}**\n${L.RouletteGameTextNumWas}: **${rdmNum}**\n${L.RouletteGameTextDifference}: **${difference}**\n${L.YourReward}: **${reward}** ${L.Cookies}! 🍪`});
            }
            else if (difference >= 20 && difference <= 40) { //5
                message.reply({content: `**${L.RouletteGameText5}**\n${L.RouletteGameTextNumWas}: **${rdmNum}**\n${L.RouletteGameTextDifference}: **${difference}**`});
            }
            else if (difference >= 41 && difference <= 60) { //6
                message.reply({content: `**${L.RouletteGameText6}**\n${L.RouletteGameTextNumWas}: **${rdmNum}**\n${L.RouletteGameTextDifference}: **${difference}**`});
            }
            else { //7
                message.reply({content: `**${L.RouletteGameText7}**\n${L.RouletteGameTextNumWas}: **${rdmNum}**\n${L.RouletteGameTextDifference}: **${difference}**`});
            }

            if (reward > 0) DataMgr.AddToNumber(`./data/${message.guild.id}/coin`, playerId, reward);
        }
    }
}