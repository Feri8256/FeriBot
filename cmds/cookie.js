module.exports = {
    name: 'cookies',
    aliases: ['keksz'],
    categories: ['info','fun'],
    description: ['A beépített játékokban megszerzett összes jutalom (keksz) megjelenítése.', 'Displays rewards earned in the built-in games.'],
    usage: ['[@Felhasználó#0000]', '[@User#0000]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let usr;
        let usrname;
    
        if (message.mentions.users.first()) {
            usr = message.mentions.users.first();
            usrname = `**${usr.username}**`;
        }
        else {
            usr = message.author;
            usrname = `<@${message.author.id}>`;
        }
    
        let cookieRead = parseInt(DataMgr.Read(`./data/${message.guild.id}/coin`,usr.id));


        if (usr.id === client.user.id) {
            message.channel.send(L.CookiesMeNo);
            return;
        }
        if (usr.bot) {
            message.channel.send(L.CookiesBotsNo);
            return;
        }
        if(!cookieRead){
            message.channel.send(`${usrname} ${L.CookiesNotHave} 🙁`);
        }
        else{
            message.channel.send(`${usrname} ${L.CookiesHave}: **${cookieRead}** ${L.Cookies} 🍪`);
        }
    }
}