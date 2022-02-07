module.exports = {
    commandData: {
        name: 'roll',
        description: 'Véletlenszám 0 és 100 között'
    },

    execute(Discord, client, interaction, options, L) {
        interaction.reply({
            content: String(Math.floor( Math.random() * 101))
        });
    }
}