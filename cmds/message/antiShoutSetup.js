module.exports = {
    name: 'caps',
    aliases: ['capitals','shout','anticaps'],
    description: ['Törli az üzenetet, ha az a megadottnál több nagybetűs karaktert tartalmaz. A beállítás a szerver összes csatornájára érvényes. (0: kikapcsol).','Deletes a message, if it contains more than a given amount of capital characters. This setting applies to all channels of the server. (0: disable).'],
    categories: ['mod'],
    reqPerms: ['ADMINISTRATOR'],
    usage: ['<0 / 10-100>','<0 / 10-100>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var antiCapsEmbed = new Discord.MessageEmbed()

        let capsSetting = parseInt(args[1]);
        switch (capsSetting) {
            case 0:
                DataMgr.Delete(`./data/${message.guild.id}`,'caps');

                antiCapsEmbed.setTitle('Anti-Caps')
                antiCapsEmbed.setColor('#00FF00')
                antiCapsEmbed.setDescription(L.AntiCapsDisabled)
                message.channel.send({embeds: [antiCapsEmbed]});
                break;

            default:
                if (isNaN(capsSetting) || capsSetting < 10 || capsSetting > 100) {
                    message.channel.send({embeds: [ErrMessages.E_InvalidArgs(L)]});
                }
                else {
                    DataMgr.Write(`./data/${message.guild.id}`,'caps', String(capsSetting));

                    antiCapsEmbed.setTitle('Anti-Caps')
                    antiCapsEmbed.setColor('#00FF00')
                    antiCapsEmbed.setDescription(L.AntiCapsEnabled.replace('{0}', capsSetting))
                    message.channel.send({embeds: [antiCapsEmbed]});
                }
        }
    }
}