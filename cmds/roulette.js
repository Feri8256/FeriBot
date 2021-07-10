module.exports = {
    name:'roulette',
    aliases: ['r'],
    categories: ['games'],
    description: ['Tippelj meg elsőre egy véletlenszámot.', 'Guess a number for the first time.'],
    usage: ['<1-100>', '<1-100>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let RouletteRdmNum = Math.floor(Math.random() * 100) + 1;
        let RouletteInput = parseInt(args[1]);
        let RouletteDifference = Math.abs(RouletteInput - RouletteRdmNum);
        let RoulettePlayer = message.author.id;
        let RouletteMaxPoints = 100;
        let TestRead = DataMgr.Read(`./data/${message.guild.id}/coin`, RoulettePlayer);
        let CoinBefore = 0;

        if (!TestRead){
            CoinBefore = 0;
        }
        else {
            CoinBefore = parseInt(TestRead);
        }

        if (isNaN(RouletteInput) || !RouletteInput || RouletteInput > 100 || RouletteInput < 1) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            let reward = 0;

            if (RouletteDifference === 0) { //1
                message.reply(`🎉 | **${L.RouletteGameText1}**\n${Language[langSetting].YourReward}: **${RouletteMaxPoints}** ${Language[langSetting].Cookies}! 🍪`);
                reward = CoinBefore + RouletteMaxPoints;
            }
            else if (RouletteDifference >= 1 && RouletteDifference <= 5) { //2
                message.reply(`**${L.RouletteGameText2}**\n${L.RouletteGameTextNumWas}: **${RouletteRdmNum}**\n${L.RouletteGameTextDifference}: **${RouletteDifference}**\n${Language[langSetting].YourReward}: **${RouletteMaxPoints - RouletteDifference}** ${Language[langSetting].Cookies}! 🍪`);
                reward = CoinBefore + ((RouletteMaxPoints/2) - RouletteDifference);
            }
            else if (RouletteDifference >= 6 && RouletteDifference <= 10) { //3
                message.reply(`**${L.RouletteGameText3}**\n${L.RouletteGameTextNumWas}: **${RouletteRdmNum}**\n${L.RouletteGameTextDifference}: **${RouletteDifference}**\n${Language[langSetting].YourReward}: **${RouletteMaxPoints - RouletteDifference}** ${Language[langSetting].Cookies}! 🍪`);
                reward = CoinBefore + ((RouletteMaxPoints/2) - RouletteDifference);
            }
            else if (RouletteDifference >= 11 && RouletteDifference <= 19) { //4
                message.reply(`**${L.RouletteGameText4}**\n${L.RouletteGameTextNumWas}: **${RouletteRdmNum}**\n${L.RouletteGameTextDifference}: **${RouletteDifference}**\n${Language[langSetting].YourReward}: **${RouletteMaxPoints - RouletteDifference}** ${Language[langSetting].Cookies}! 🍪`);
                reward = CoinBefore + ((RouletteMaxPoints/2) - RouletteDifference);
            }
            else if (RouletteDifference >= 20 && RouletteDifference <= 40) { //5
                message.reply(`**${L.RouletteGameText5}**\n${L.RouletteGameTextNumWas}: **${RouletteRdmNum}**\n${L.RouletteGameTextDifference}: **${RouletteDifference}**`);
            }
            else if (RouletteDifference >= 41 && RouletteDifference <= 60) { //6
                message.reply(`**${L.RouletteGameText6}**\n${L.RouletteGameTextNumWas}: **${RouletteRdmNum}**\n${L.RouletteGameTextDifference}: **${RouletteDifference}**`);
            }
            else { //7
                message.reply(`**${L.RouletteGameText7}**\n${L.RouletteGameTextNumWas}: **${RouletteRdmNum}**\n${L.RouletteGameTextDifference}: **${RouletteDifference}**`);
            }

            if(reward > 0) DataMgr.Write(`./data/${message.guild.id}/coin`, RoulettePlayer, reward);
        }
    }
}