module.exports = {
    commandData: {
        name: 'fox',
        description: 'Róóóóka!',
        options: [
            {
                name: 'num',
                type: 10,
                description: 'kép száma',
                required: false
            }
        ]
    },

    execute(Discord, client, interaction, options, L) {
        const { foxes } = require('../../json/animals/fox-images.json');
        let l = foxes.length;
        let n = options.getNumber('num', false) ?? Math.floor( Math.random() * l );
        if (n && (n > l || n < 0)) {
            n = Math.floor( Math.random() * l );
        }

        const FoxEmbed = new Discord.MessageEmbed()
        FoxEmbed.setColor('#d86716')
        FoxEmbed.setImage(foxes[n])
        FoxEmbed.setTimestamp()
        FoxEmbed.setFooter(`#${n}`)
        
        interaction.reply({embeds: [FoxEmbed]});
    }
}