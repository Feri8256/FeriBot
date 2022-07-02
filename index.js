//Legelső Discord bot próbálkozásom. Elkezdtem: 2020.04.07
const messageCommandsPath = './cmds/message';
const slashCommandsPath = './cmds/slash';

require('dotenv').config();
const fs = require('fs');

function logErrors(error) {
    console.log(`[Error ${new Date()}] ${error}`);
    fs.appendFileSync('./error.log', `[${new Date()}]\n${error.stack}\n\n`);
}

//Hibák globális kezelése
process.on('unhandledRejection', (error) => {
    logErrors(error);
});

process.on('warning', (w) => {
    //logErrors(error);
});

process.on('exit', (e) => {
    fs.appendFileSync('./process_exit.log', `[${new Date()}]\nExit code: ${e}\n\n`);
});

const Discord = require('discord.js');
var client = new Discord.Client(
    {
        intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
            Discord.Intents.FLAGS.GUILD_MEMBERS,
            Discord.Intents.FLAGS.GUILD_PRESENCES,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
        ],
        partials: [
            'MESSAGE',
            'REACTION',
            'USER'
        ]
    }
);

client.on('error', (error) => {
    logErrors(error);
});

client.messageCommands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.slashCommandsBody = [];

client.cachedLangSettings = new Map();
client.ExecutedCmdCount = 0;

const variables = require('./variables.json');
client.prefix = variables.Prefix;
const dMgr = require('./dataManager');
const findLanguage = require('./findLanguage');
const Language = require('./languages.json');
const slashUpdater = require('./updateSlashCommands');

//Üzenet alapú parancs betöltő
function loadMsgCommands() {
    let msgCmdFiles = fs.readdirSync(messageCommandsPath);
    for (let fileName of msgCmdFiles) {
        if(fileName.startsWith('x_')) continue;

        console.log(`${messageCommandsPath}/${fileName}`);
        let rCmdF = require(`${messageCommandsPath}/${fileName}`);
        client.messageCommands.set(rCmdF.name, rCmdF);
    }
}

//Slash betöltő
function loadSlashCommands() {
    let slashCmdFiles = fs.readdirSync(slashCommandsPath);
    for (let fileName of slashCmdFiles) {
        if(fileName.startsWith('x_')) continue;

        console.log(`${slashCommandsPath}/${fileName}`);
        let loaded = require(`${slashCommandsPath}/${fileName}`);
        client.slashCommands.set(loaded.commandData.name, loaded);
        client.slashCommandsBody.push(loaded.commandData);
    }
}

loadMsgCommands();
loadSlashCommands();

//Automatizált parancsok
const ErrMessages = require('./ErrorMessages');
const cmdReactionTo = require('./auto/reactions-to-messages');
const cmdQuizGameListen = require('./auto/QuizGameListenV2');
const autoRoleAction = require('./auto/autoRoleAction');
const memberWelcome = require('./auto/memberWelcome');
const memberLeave = require('./auto/memberLeave');
const pingMe = require('./auto/pingme');
const shoutingDetector = require('./auto/shoutingMessageDetector');
const emoteStatCollector = require('./auto/emoteStatCollector');
const wordGameListen = require('./auto/WordGameListen');

const CoolDown = new Set();
//client.guessGamePlayers = new Map();
client.guessGamePlayers = new Set();
client.quizGamePlayers = new Map();
client.wordGamePlayers = new Map();

//Készen állok!
client.on('ready', () => {
    console.clear();
    console.log(`Csatlakozva: ${client.user.tag}\nEkkor: ${client.readyAt}\nSzerverek: ${client.guilds.cache.size}\nÜzenet parancsok: ${client.messageCommands.size}\nSlash parancsok: ${client.slashCommands.size}`);
    client.user.setActivity(`👀 ${client.prefix}help | /`, { type: 'WATCHING' });
    slashUpdater(client, client.slashCommandsBody);
});

//Eltávolítanak egy szerverről
client.on('guildDelete', guild => {
    dMgr.RemoveDir(`./data/${guild.id}`);
});

//Hozzáadnak egy szerverhez
client.on('guildCreate', guild => {
    dMgr.CreateDir(`./data/${guild.id}`);
});

//Felhasználó csatlakozik egy szerverre
client.on('guildMemberAdd', async member => {
    autoRoleAction(member, dMgr);
    memberWelcome(member, client, dMgr);
});

//Felhasználó elhagy egy szervert
client.on('guildMemberRemove', async member => {
    memberLeave(member, client, dMgr);
});

//Reakciót érzékel
client.on('messageReactionAdd', async (reaction) => {
    emoteStatCollector(false, reaction);
});

function CmdExecuted() {
    client.ExecutedCmdCount++;
}

//Automatikus dolgok
client.on('messageCreate', async message => {
    if (message.guild === null) return; //Ha az üzenet DM-ként érkezik, akkor nincs guild, tehát ne csinálj semmit, különben hibával leállsz.
    if (!message.guild.available) return; //Ha az adott szerver nem elérhető, akkor ne is próbálkozz tovább
    if (message.author.bot) return; //Ha az üzenet küldője bot, akkor ne csinálj semmit!
    if (message.author.id === client.user.id) return; //Ha az üzenet küldője maga a bot, akkor se csinálj semmit! Bár, az előző feltételvizsgálatnál véget kell hogy érjen

    let Ls = findLanguage(client, message.guild.id);
    let L = Language[Ls];

    shoutingDetector(message, dMgr);
    cmdReactionTo(message);
    pingMe(message, L, client);
    emoteStatCollector(message, false);
    cmdQuizGameListen(message, client, L, dMgr, findLanguage);
    wordGameListen(client, message, dMgr, L);
});

//Prefixes parancsok
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(client.prefix)) return; //Ha az üzenet nem prefixel kezdődik, akkor ne csinálj semmit!
    if (message.guild === null) return; //Ha az üzenet DM-ként érkezik, akkor nincs guild, tehát ne csinálj semmit, különben hibával leállsz.
    //if (!message.guild.available) return; //Ha az adott szerver nem elérhető, akkor ne is próbálkozz tovább
    if (message.author.bot) return; //Ha az üzenet küldője bot, akkor ne csinálj semmit!
    if (message.author.id === client.user.id) return; //Ha az üzenet küldője maga a bot, akkor se csinálj semmit! Bár, az előző feltételvizsgálatnál véget kell hogy érjen

    let Ls = findLanguage(client, message.guild.id);
    let L = Language[Ls];

    //Üzenet tartalmának szóközönkénti felosztása apróbb kezelhetőbb részekre
    let args = message.content.substring(client.prefix.length).split(/ +/g);

    //Egy parancs lefuttatása előtt ki kell azt nyernünk a "client.cmds" collection-ból.
    //Ez kétféleképpen történhet: a neve, vagy egy alias alapján, amit meg kell persze keresni...
    let chkCmd = client.messageCommands.get(args[0].toLowerCase()) || client.messageCommands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));

    //Ha a chkCmd null, akkor azt jelenti, nincs meg az, amit kerestünk...
    if (!chkCmd) {
        return;
    }
    else {
        try {
            //Ha joghoz van kötve a parancs
            if (chkCmd.reqPerms != undefined) {
                if (message.member.permissions.has(chkCmd.reqPerms)) {
                    //Ha van joga, fogadj szót!...
                    chkCmd.execute(Discord, client, message, args, L, dMgr, ErrMessages);
                }
                else {
                    //Ha nincs joga, csak szólj, hogy nincs nyulkapiszka és return...
                    message.channel.send({ embeds: [ErrMessages.W_UsrNoPermission(L)] });
                    return;
                }
            }

            //Ha cooldown-hoz van kötve a parancs
            if (chkCmd.cooldown && chkCmd.cooldown != undefined) {
                //Ha benne van egy felhasználó a listában, tudassa vele.
                if (CoolDown.has(message.author.id)) {
                    message.channel.send({ embeds: [ErrMessages.W_CooldownWait(L)] });
                }
                //Egyébként futtassa le és adja hozzá a felhasználót a CoolDown-hoz, majd törölje x másodperc után
                else {
                    chkCmd.execute(Discord, client, message, args, L, dMgr, ErrMessages);
                    CoolDown.add(message.author.id);
                    setTimeout(() => { CoolDown.delete(message.author.id) }, variables.Default_cooldown);
                }
            }

            //nincs se cooldown-hoz, se jogokhoz kötve a parancs
            if (!chkCmd.reqPerms && !chkCmd.cooldown) {
                chkCmd.execute(Discord, client, message, args, L, dMgr, ErrMessages);
            }
            CmdExecuted();
        }
        catch (err) {
            logErrors(err);
            message.channel.send({ content: L.CommandsGeneralError });
        }
    }
});

//Slash
/*client.on('interactionCreate', (interaction) => {
    if (!interaction.isButton()) return;
    console.log(interaction.component);
});*/

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    let Ls = findLanguage(client, interaction.guild.id);
    let L = Language[Ls];

    let chkCommand = client.slashCommands.get(commandName);
    if (!chkCommand) return;

    try {
        chkCommand.execute(Discord, client, interaction, options, L, dMgr);
    }
    catch (err) {
        logErrors(err);
        interaction.reply({ content: L.CommandsGeneralError });
    }

    CmdExecuted();
});

client.login(process.env.BOT_TOKEN);