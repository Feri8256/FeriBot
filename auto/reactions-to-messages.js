let nap = require('./module-daytime');
const helloRegexp = /^h{1,}[ae]{1,}[ly]{1,}[ioó]{1,}/i;

function rdm(max) {
    return Math.floor(Math.random() * max);
}

const greet =  [
    'sziasztok',
    'sziasztok!',
    'helló',
    'szevasz',
    'szervusz',
    'szoszi',
    'csá',
    'cső',
    'hali',
    'halihó',
    'üdv',
    'üdvözletem',
    'szióka',
    'szia'
];

module.exports = (message) => {
    let inputMsg    =   message.content.toLowerCase();

    if (
        message.content.startsWith('👀') || 
        inputMsg.startsWith('hey') || 
        inputMsg.includes('@everyone') || 
        inputMsg.includes('@here')
    ) {
        if (rdm(2) === 1) {
            message.react('👀');
        }
    }

    if (message.content.startsWith('🤔')) {
        if (rdm(2) === 1) {
            message.react('🤔');
        }
    }

    if (message.content.startsWith('o/') || message.content.startsWith('\\o')) {
        message.channel.send('👋🏼');
    }

    if (greet.includes(inputMsg.toLowerCase()) || helloRegexp.test(inputMsg.toLowerCase())) {
        if (rdm(2) === 1) {
            const welcomeText = [
                "Szia",
                `Jó ${nap.getNapszak()} kívánok`,
                "Üdvözöllek",
                `Szép jó ${nap.getNapszak()} kedves`,
                "Helló",
                "Hali",
                "Szia helló",
                "Hellószia",
                "Örvendek",
                "Neked is"
            ];

            let rdmWelcome = Math.floor(Math.random() * welcomeText.length);
            message.channel.send({content: `**${welcomeText[rdmWelcome]} ${message.author.username}!** 👋🏼😄`});
        }
    }
};