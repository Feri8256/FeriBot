module.exports = {
    commandData: {
        name: 'say',
        description: 'Kimondja, amit akarsz.',
        options: [
            {
                name: 'uzenet',
                description: 'Valami szöveg',
                type: 3,
                required: true
            }
        ]
    },

    execute(Discord, client, interaction, options, L) {
        let szoveg = options.getString('uzenet');
        interaction.reply({
            content: szoveg
        });
    }
}