module.exports = {
    name:'choose',
    aliases: ['c'],
    categories: ['fun'],
    description: ['Választ egyet a megadott opciók közül.', 'Randomly chooses one from multiple options.'],
    usage: ['<elem1/elem2/elem3>', '<item1/item2/item3>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let ChooseOptions = args.slice(1, args.length).join(' ');
    
        if (args.length >= 2) {
            let OptionsArray = ChooseOptions.split('/');
            let RdmOptions = Math.floor(Math.random() * OptionsArray.length);
    
            message.channel.send(`${L.ChooseChoice}: **${OptionsArray[RdmOptions]}**`);
        }
        else {
            message.channel.send(L.ChooseUse);
        }
    }
}