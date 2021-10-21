//Legelső Discord bot próbálkozásom. Elkezdtem: 2020.04.07

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({
    disableMentions: "everyone"
});

client.cmds = new Discord.Collection();
client.cachedLangSettings = new Map();
client.ExecutedCmdCount = 0;

const variables = require('./variables.json');
const prefix = variables.Prefix;
client.prefix = prefix
const fs = require('fs-extra');
const DataMgr = require('./dataManager');
const findLanguage = require('./findLanguage');
const Language = require('./languages.json');

const messageCommandsPath = './cmds/message';
const slashCommandPath = '';

//Parancs betöltő
let CmdFiles = fs.readdirSync(messageCommandsPath);
for (const f of CmdFiles) {
    console.log(f);
    const rCmdF = require(`${messageCommandsPath}/${f}`);
    client.cmds.set(rCmdF.name, rCmdF);
}

//Hibák globális kezelése
process.on('unhandledRejection', (error) => {
    console.log(`[Error ${new Date()}] ${error}`);
    fs.appendFileSync('./error.log', `[${new Date()}]\n${error.stack}\n\n`);
});

client.on('error', (error) => {
    console.log(`[Error ${new Date()}] ${error}`);
    fs.appendFileSync('./error.log', `[${new Date()}]\n${error.stack}\n\n`);
});

process.on('warning', (w) => {
    console.log(`[Warning ${new Date()}] ${w}`);
    fs.appendFileSync('./error.log', `[${new Date()}]\n${w}\n\n`);
});

process.on('exit', (e) => {
    fs.appendFileSync('./process_exit.log', `[${new Date()}]\nExit code: ${e}\n\n`);
})

//Automatizált parancsok
const ErrMessages = require('./ErrorMessages');
const cmdReactionTo = require('./auto/reactions-to-messages');
const cmdGuessGameProgress = require('./auto/GuessGameProgress');
const cmdQuizGameListen = require('./auto/QuizGameListenV2');
const autoRoleAction = require('./auto/autoRoleAction');
const memberWelcome = require('./auto/memberWelcome');
const memberLeave = require('./auto/memberLeave');
const pingMe = require('./auto/pingme');
const shoutingDetector = require('./auto/shoutingMessageDetector');
const emoteStatCollector = require('./auto/emoteStatCollector');
const wordGameListen = require('./auto/WordGameListen')

const CoolDown = new Set();
client.GuessGame = new Map();
client.GuessTries = new Map();
client.QuizGamePlayer = new Map();
client.QuizGameLevel = new Map();
client.wordGamePlayer = new Map();
client.wordGamePlayerTries = new Map();
client.wordGamePlayerHints = new Map();

//Készen állok!
client.on('ready', () => {
    console.clear();
    console.log(`Csatlakozva: ${client.user.tag}\nEkkor: ${client.readyAt}\nSzerverek: ${client.guilds.cache.size}\nParancsok: ${CmdFiles.length}`);
    //client.user.setActivity(`${prefix}help | ${prefix}segítség`, {type: 'LISTENING'});
    client.user.setStatus('invisible');
});

//Eltávolítanak egy szerverről
client.on('guildDelete', guild => {
    DataMgr.RemoveDir(`./data/${guild.id}`);
});

//Hozzáadnak egy szerverhez
client.on('guildCreate', guild => {
    DataMgr.CreateDir(`./data/${guild.id}`);
});

//Felhasználó csatlakozik egy szerverre
client.on('guildMemberAdd', async member => {
    autoRoleAction(member, DataMgr);
    memberWelcome(member, client, DataMgr);
});

//Felhasználó elhagy egy szervert
client.on('guildMemberRemove', async member => {
    memberLeave(member, client, DataMgr);
});

//Reakciót érzékel (csak cache-elt üzenetnél)
client.on('messageReactionAdd', reaction => {
    emoteStatCollector(false, reaction);
});

function CmdExecuted () {
    client.ExecutedCmdCount++;
}

//Automatikus dolgok
client.on('message', async message => {
    if (message.guild === null) return; //Ha az üzenet DM-ként érkezik, akkor nincs guild, tehát ne csinálj semmit, különben hibával leállsz.
    if (!message.guild.available) return; //Ha az adott szerver nem elérhető, akkor ne is próbálkozz tovább
    if (message.author.bot) return; //Ha az üzenet küldője bot, akkor ne csinálj semmit!
    if (message.author.id === client.user.id) return; //Ha az üzenet küldője maga a bot, akkor se csinálj semmit! Bár, az előző feltételvizsgálatnál véget kell hogy érjen
    
    let Ls = findLanguage(client, message.guild.id);
    let L = Language[Ls];

    shoutingDetector(message, DataMgr);
    cmdReactionTo(message);
    pingMe(message, L, client);
    emoteStatCollector(message, false);
    cmdGuessGameProgress(message, L, client, DataMgr);
    cmdQuizGameListen(message, client, L, DataMgr, findLanguage);
    wordGameListen(client, message, DataMgr, L);
});

//Prefixes parancsok
client.on('message', (message) => {
    if (!message.content.startsWith(prefix)) return; //Ha az üzenet nem prefixel kezdődik, akkor ne csinálj semmit!
    if (message.guild === null) return; //Ha az üzenet DM-ként érkezik, akkor nincs guild, tehát ne csinálj semmit, különben hibával leállsz.
    if (!message.guild.available) return; //Ha az adott szerver nem elérhető, akkor ne is próbálkozz tovább
    if (message.author.bot) return; //Ha az üzenet küldője bot, akkor ne csinálj semmit!
    if (message.author.id === client.user.id) return; //Ha az üzenet küldője maga a bot, akkor se csinálj semmit! Bár, az előző feltételvizsgálatnál véget kell hogy érjen

    let Ls = findLanguage(client, message.guild.id);
    let L = Language[Ls];

    //Üzenet tartalmának szóközönkénti felosztása apróbb kezelhetőbb részekre
    let args = message.content.substring(prefix.length).split(/ +/g);

    //Egy parancs lefuttatása előtt ki kell azt nyernünk a "client.cmds" collection-ból.
    //Ez kétféleképpen történhet: a neve, vagy egy alias alapján, amit meg kell persze keresni...
    let chkCmd = client.cmds.get(args[0].toLowerCase()) || client.cmds.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));
        
    //Ha a chkCmd null, akkor azt jelenti, nincs meg az, amit kerestünk...
    if (!chkCmd) {
        return;
    }
    else {
        //Ha joghoz van kötve a parancs
        if (chkCmd.reqPerms != undefined) {
            if (message.member.hasPermission(chkCmd.reqPerms)) {
                //Ha van joga, fogadj szót!...
                chkCmd.execute(Discord, client, message, args, L, DataMgr, ErrMessages);
            }
            else {
                //Ha nincs joga, csak szólj, hogy nincs nyulkapiszka és return...
                message.channel.send(ErrMessages.W_UsrNoPermission(L));
                return;
            }
        }

        //Ha cooldown-hoz van kötve a parancs
        if (chkCmd.cooldown && chkCmd.cooldown != undefined) {
            //Ha benne van egy felhasználó a listában, tudassa vele.
            if(CoolDown.has(message.author.id)) {
                message.channel.send(ErrMessages.W_CooldownWait(L));
            }
            //Egyébként futtassa le és adja hozzá a felhasználót a CoolDown-hoz, majd törölje x másodperc után
            else {
                chkCmd.execute(Discord, client, message, args, L, DataMgr, ErrMessages);
                CoolDown.add(message.author.id);
                setTimeout(()=> { CoolDown.delete(message.author.id) }, variables.Default_cooldown);
            }
        }

        //nincs se cooldown-hoz, se jogokhoz kötve a parancs
        if (!chkCmd.reqPerms && !chkCmd.cooldown) {
            chkCmd.execute(Discord, client, message, args, L, DataMgr, ErrMessages);
        }
        CmdExecuted();
    }
});

client.login(process.env.BOT_TOKEN);