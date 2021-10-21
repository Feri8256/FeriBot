let nap = require('./module-daytime');

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
    let randomThing;

    if (message.content.startsWith('👀') || inputMsg.startsWith('hey')) {

        randomThing = Math.floor(Math.random() * 4);
        if (randomThing === 2) {
            message.react('👀');
        }
    }

    if (message.content.startsWith('🤔')) {
        randomThing = Math.floor(Math.random() * 4);
        if (randomThing === 2) {
            message.react('🤔');
        }
    }

    if (message.content.startsWith('o/') || message.content.startsWith('\\o')) {
        message.channel.send('👋🏼');
    }

    if (greet.includes(inputMsg.toLowerCase())) {
        randomThing = Math.floor(Math.random() * 2);
        if (randomThing === 1) {
            const welcomeText = [
                "Szia",
                `Jó ${nap.getNapszak()} kívánok`,
                "Üdvözöllek",
                `Szép jó ${nap.getNapszak()} kedves`,
                "Helló",
                "Hali",
                "Szia helló"
            ];

            let rdmWelcome = Math.floor(Math.random() * (welcomeText.length * 1));
            message.channel.send(`**${welcomeText[rdmWelcome]} ${message.author.username}!** 👋🏼😄`);
        }
    }
};