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

const foxThing = [
    'róka',
    '🦊',
    'fox'
];

const catThing = [
    'macska',
    'cica',
    'cat',
    '🐱',
    'kitty'
];

const dogThing = [
    'kutya',
    'dog',
    '🐶',
    'vau',
    'woof'
];

const wolfThing = [
    'farkas',
    'wolf',
    '🐺',
    'awoo',
    'awooo'
];

const goatThing = [
    'kecske',
    'mekmek',
    '🐐'
];

const otterThing = [
    'vidra',
    'otter',
    '🦦'
];

const potatoThing = [
    'potato',
    'krumpli',
    'burgonya',
    '🥔'
];

const lizardThing = [
    'lizard',
    'gyík',
    '🦎'
];

const butterThing = [
    'pillangó',
    'butterfly',
    '🦋'
];

const horseThing = [
    'ló',
    'horse',
    '🐴'
];

const fishThing = [
    'hal',
    'fish',
    '🐟'
];

const snakeThing = [
    'kígyó',
    'snake',
    '🐍'
];

const crocoThing = [
    'krokodil',
    '🐊'
]

module.exports = (message) => {
    let inputMsg    =   message.content.toLowerCase();
    let randomThing;

    if (foxThing.includes(inputMsg)) { //Ez mindenképpen kell :D
        message.react('🦊');
    }

    if (potatoThing.includes(inputMsg)) {
        message.react('🥔');
    }

    if (catThing.includes(inputMsg)) {
        message.react('🐱');
    }

    if (dogThing.includes(inputMsg)) {
        message.react('🐶');
    }

    if (wolfThing.includes(inputMsg)) {
        message.react('🐺');
    }

    if (lizardThing.includes(inputMsg)) {
        message.react('🦎');
    }

    if (butterThing.includes(inputMsg)) {
        message.react('🦋');
    }

    if (horseThing.includes(inputMsg)) {
        message.react('🐴');
    }

    if (fishThing.includes(inputMsg)) {
        message.react('🐟');
    }

    if (snakeThing.includes(inputMsg)) {
        message.react('🐍');
    }

    if (crocoThing.includes(inputMsg)) {
        message.react('🐊');
    }

    if (message.content.startsWith('👀') || inputMsg.startsWith('hey')) {

        randomThing = Math.floor(Math.random() * 4);
        if (randomThing === 2) {
            message.react('👀');
        }
        else {
            return;
        }
    }

    if (message.content.startsWith('🤔')) {

        randomThing = Math.floor(Math.random() * 4);
        if (randomThing === 2) {
            message.react('🤔');
        }
        else {
            return;
        }
    }

    if (goatThing.includes(inputMsg)) {
        message.react('🐐');
    }

    if (message.content.startsWith('o/') || message.content.startsWith('\\o')) {
        message.channel.send('👋🏼');
    }

    if (otterThing.includes(inputMsg)) {
        message.react('🦦');
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
        else {
            return;
        }
    }
};