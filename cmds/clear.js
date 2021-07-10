module.exports = {
    name: 'clear',
    aliases: ['clr','purge','bulkdelete'],
    categories: ['mod'],
    description: ['Megadott számú üzenet törlése.', 'Bulk deleting messages.'],
    reqPerms: ['MANAGE_MESSAGES'],
    usage: ['<1-100>', '<1-100>'],
    async execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let ClrAmount = parseInt(args[1]);
        
        if (!ClrAmount || isNaN(ClrAmount) || ClrAmount < 1 || ClrAmount > 100) {
            message.channel.send(ErrMessages.E_InvalidArgs(L));
        }
        else {
            message.channel.messages.fetch({ limit: ClrAmount });

            /*function sendClearCompleted() {
                
            }*/
    
            await message.channel.bulkDelete(ClrAmount)
            .catch(err => {
                message.channel.send(ErrMessages.W_BotNoPermisson(L));
            })

            let ClearCompleted = new Discord.MessageEmbed()
            ClearCompleted.setColor('#00ff00')
            ClearCompleted.setTitle(`☑ | ${ClrAmount} ${L.MsgClearCompleted}`)
            ClearCompleted.setTimestamp()
        
            //Eltakarítja maga után a beágyazást 5 másodperc elteltével
            let deletDis = await message.channel.send(ClearCompleted);
            deletDis.delete({timeout:5000});
            
        }
    }
}