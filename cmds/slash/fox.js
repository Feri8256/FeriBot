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
        function random(max) {
            return Math.floor( Math.random() * max );
        }

        const { foxes } = require('../../json/animals/fox-images.json');
        let l = foxes.length;
        let n = options.getNumber('num', false) ?? random(l);

        if (n > l || n < 0) {
            n = random(l);
        }

        const FoxEmbed = new Discord.MessageEmbed()
        FoxEmbed.setColor('#d86716')
        FoxEmbed.setImage(foxes[n])
        FoxEmbed.setTimestamp()
        FoxEmbed.setFooter(`#${n}`)
        
        interaction.reply({embeds: [FoxEmbed]});
    }
}