const shuffle = require('../../auto/module-arrayShuffle');

module.exports = {
    name: 'shuffle',
    aliases: ['sh','randomize'],
    usage: ['<szöveg>','<text>'],
    categories: ['fun'],
    description: ['Összekeveri a szövegben a betűket','Shuffles the letters in a piece of text'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var inputText = args.slice(1, args.length).join(' ');
        if (!inputText) return;
        let splittedText = inputText.split('');
        let outputText = shuffle(splittedText).join('');
        message.channel.send(outputText);
    }
}