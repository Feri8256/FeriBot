module.exports = {
    commandData: {
        name: 'roll',
        description: 'Véletlenszám 0 és 100 között'
    },

    execute(Discord, client, interaction, options, L) {
        let n = Math.floor( Math.random() * 101);
        interaction.reply({
            content: String(n)
        });
    }
}