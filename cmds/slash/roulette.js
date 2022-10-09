module.exports = {
    commandData: {
        name: 'roulette',
        description: 'Tippelj meg elsőre egy véletlenszámot 1 és 100 között.',
        options: [
            {
                name: 'num',
                type: 10,
                description: 'tipped',
                required: true
            }
        ]
    },

    execute(Discord, client, interaction, options, L, dMgr) {
        let playerId = interaction.user.id;
        let myNum = Math.floor(Math.random() * 100) + 1;
        let yourNum = options.getNumber('num', false);
        let difference = Math.abs(yourNum - myNum);
        let maxPoints = 100;


        if (yourNum > 100 || yourNum < 1) {
            interaction.reply({ content: "Nemjó! 1 és 100 között!" });
        }
        else {

            let reward = 0;
            let title = "";
            let desc = "";

            if (difference === 0) { //1
                title = `🎉 | **${L.RouletteGameText1}**`;
                desc = `${L.YourReward}: **${maxPoints}** ${L.Cookies}! 🍪`;
                reward = maxPoints;
            }
            else if (difference >= 1 && difference <= 5) { //2
                reward = Math.floor(maxPoints / 1.5) - difference;
                title = `**${L.RouletteGameText2}**`;
                desc = `${L.RouletteGameTextNumWas}: **${myNum}**\n${L.RouletteGameTextDifference}: **${difference}**\n${L.YourReward}: **${reward}** ${L.Cookies}! 🍪`;
            }
            else if (difference >= 6 && difference <= 10) { //3
                reward = (maxPoints / 2) - difference;
                title = `**${L.RouletteGameText3}**`;
                desc = `${L.RouletteGameTextNumWas}: **${myNum}**\n${L.RouletteGameTextDifference}: **${difference}**\n${L.YourReward}: **${reward}** ${L.Cookies}! 🍪`;
            }
            else if (difference >= 11 && difference <= 19) { //4
                reward = Math.floor(maxPoints / 2.5) - difference;
                title = `**${L.RouletteGameText4}**`;
                desc = `${L.RouletteGameTextNumWas}: **${myNum}**\n${L.RouletteGameTextDifference}: **${difference}**\n${L.YourReward}: **${reward}** ${L.Cookies}! 🍪`;
            }
            else if (difference >= 20 && difference <= 40) { //5
                title = `**${L.RouletteGameText5}**`;
                desc = `${L.RouletteGameTextNumWas}: **${myNum}**\n${L.RouletteGameTextDifference}: **${difference}**`;
            }
            else if (difference >= 41 && difference <= 60) { //6
                title = `**${L.RouletteGameText6}**`;
                desc = `${L.RouletteGameTextNumWas}: **${myNum}**\n${L.RouletteGameTextDifference}: **${difference}**`;
            }
            else { //7
                title = `**${L.RouletteGameText7}**`;
                desc = `${L.RouletteGameTextNumWas}: **${myNum}**\n${L.RouletteGameTextDifference}: **${difference}**`;
            }

            if (reward > 0) dMgr.AddToNumber(`./data/${interaction.guild.id}/coin`, playerId, reward);

            let RouletteEmbed = new Discord.MessageEmbed()
            RouletteEmbed.setColor('#dddddd')
            RouletteEmbed.setTitle(title)
            RouletteEmbed.setDescription(desc)
            RouletteEmbed.setTimestamp();            

            interaction.reply({ embeds: [RouletteEmbed] });
        }
    }
}