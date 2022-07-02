module.exports = {
    commandData: {
        name: 'guess',
        description: 'Gondolok egy számra 1 és 10 között. Találd ki!'
    },

    execute(Discord, client, interaction, options, L, dMgr) {
        const playerId = interaction.user.id;

        if (client.guessGamePlayers.has(playerId)) return interaction.reply({ content: L.GuessGameNewNo, ephemeral: true }); // Már játszik

        const myNumber = Math.floor(Math.random() * 10) + 1;
        const buttonFilter = i => i.customId === `guess-${myNumber}` && i.user.id === playerId;
        const buttonCollector = interaction.channel.createMessageComponentCollector({ buttonFilter, time: 60000});
        buttonCollector.on('collect', async i => {
            if (i.customId === `guess-${myNumber}`) {
                dMgr.AddToNumber(`./data/${i.guild.id}/coin`, i.user.id, 10);
                await i.update({
                    content: `${L.GuessGameCongrats}\n${L.YourReward}: **10** ${L.Cookies}! 🍪`,
                    components: [],
                    ephemeral: true
                });
            }

            if (i.customId !== `guess-${myNumber}`) {
                await i.update({
                    content: `${L.GuessGameNope}`,
                    components: [],
                    ephemeral: true
                });
            }

            buttonCollector.stop();
        });

        buttonCollector.on('end', () => client.guessGamePlayers.delete(playerId));

        function createButton(number) {
            let b = new Discord.MessageButton();
            b.setCustomId(`guess-${number}`);
            b.setLabel(String(number));
            b.setStyle('PRIMARY');
            return b;
        }

        let buttons = [];
        for (let i=0; i<10; i++) buttons.push(createButton(i+1));

        let oneToFiveRow = new Discord.MessageActionRow();
        oneToFiveRow.addComponents(buttons.slice(0,5));

        let sixToTenRow = new Discord.MessageActionRow();
        sixToTenRow.addComponents(buttons.slice(5,10));

        client.guessGamePlayers.add(playerId);

        interaction.reply({
            content: L.GuessGameStart,
            components: [oneToFiveRow, sixToTenRow],
            ephemeral: true
        });
    }
}