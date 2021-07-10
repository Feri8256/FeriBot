module.exports = {
    name: 'caps',
    aliases: ['capitals','shout','anticaps'],
    description: ['Törli az üzenetet, ha az túl sok nagybetűt tartalmaz. A beállítás a szerver összes csatornájára érvényes. 0: kikapcsol, 1: engedélyez','Deletes a message, if it contains too much capital letter. This setting applies to all channels of the server. 0: disable 1: enable'],
    categories: ['mod'],
    reqPerms: ['ADMINISTRATOR'],
    usage: ['<0/1>','<0/1>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var antiCapsEmbed = new Discord.MessageEmbed()

        let capsSetting = parseInt(args[1]);
        switch (capsSetting) {
            case 0:
                DataMgr.Write(`./data/${message.guild.id}`,'caps','0');

                antiCapsEmbed.setTitle('Anti-Caps')
                antiCapsEmbed.setColor('#00FF00')
                antiCapsEmbed.setDescription(L.AntiCapsDisabled)
                message.channel.send(antiCapsEmbed);
                break;

            case 1:
                DataMgr.Write(`./data/${message.guild.id}`,'caps','1');
                
                antiCapsEmbed.setTitle('Anti-Caps')
                antiCapsEmbed.setColor('#00FF00')
                antiCapsEmbed.setDescription(L.AntiCapsEnabled)
                message.channel.send(antiCapsEmbed);
                break;

            default:
                message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
    }
}