const variables = require('../variables.json');
const valaszok = [
    "Várjáál, megidézem. Biztos, hogy él még.",
    "Merre járhat éppen?",
    "Fogadni merek, hogy őt keresed:",
    "Nesze Feri, egy ping!",
    "Miért nem pingeled meg? Na várj, majd én!",
    "Szükségünk van rád",
    "ide süss",
    "Visszavonulás! Pillanatokon belül itt lehet",
    "Őőőőhmm...",
    "Ideje volna elvegyűlnöd a többiek között!",
    "Kevésbé kéne zárkózottnak lenned",
    "undefined 😛",
    "Nézd, találtam egy bugot!",
    "Van kekszem. Kérsz?",
    "*Jú níd mór szocializésön*",
    "Nem tudom, milyen frappáns mondattal lehetne még őt idecsalogatni.",
    "Ha már minden kötél szakad, akkor engedd meg, hogy segítsen neked",
    "Mindig megvárod, míg más szólít?",
    "Te jössz",
    "Elmondom neki, hogy eddig miről maradt le",
    "Gyeere ideee",
    "Ezt nézd, valaki épp rád gondolt!"
];

module.exports = {
    name: 'feri',
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let rdm = Math.floor(Math.random() * valaszok.length);

        message.channel.send(`${valaszok[rdm]} <@${variables.Creator_id}> 👀`);
    }
}