const fs = require('fs-extra');
module.exports = {
    name: 'rob',
    categories: ['fun', 'games'],
    description: ['Segítek kekszet lopni felhasználóktól!', 'I help you rob cookies from users!'],
    usage: ['<@Felhasználó#0000>', '<@User#0000>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {

        let guildID = message.guild.id;
        let dateNow = Date.now();
        let robberUser = message.author;
        let robTargetUser = message.mentions.users.first();

        if (!robTargetUser) return message.reply({ content: 'Meg kell említened egy felhasználót!' });
        if (robTargetUser === client.user || robTargetUser.bot) return message.reply({ content: 'Nem tudsz engem, se más botokat kirabolni!' });
        if (robTargetUser === robberUser) return message.reply({ content: 'Nem tudod magad kirabolni!' });
        
        let robberUserCookies = parseInt(DataMgr.Read(`./data/${guildID}/coin`, robberUser.id) ?? 0);
        let robTargetCookies = parseInt(DataMgr.Read(`./data/${guildID}/coin`, robTargetUser.id) ?? 0);
        if (robTargetCookies < 500) return message.reply({ content: L.RobNotWorth });

        fs.ensureDir(`./data/${guildID}/robs`, 0o2775);
        let robbedDataExists = fs.existsSync(`./data/${guildID}/robs/${robberUser.id}.json`);

        function saveRobData(robber, robbed, date) {     
            let check = fs.pathExistsSync(`./data/${guildID}/robs/${robber}.json`);
            let loaded = check ? JSON.parse(fs.readFileSync(`./data/${guildID}/robs/${robber}.json`)) : [];
            //Keres
            let found = loaded.find(r => r.robbed === robbed);
            //Hozzáad/módosít
            if (found === undefined) {
                loaded.push({ robbed, date });
            }
            if (found) {
                found.date = date;
            }
            //mentés
            fs.writeFileSync(`./data/${guildID}/robs/${robber}.json`, JSON.stringify(loaded));
            
        }

        function saveNewCookies(robberUser, robberValue, robbedUser, robbedValue) {
            DataMgr.Write(`./data/${guildID}/coin`, robberUser, robberValue);
            DataMgr.Write(`./data/${guildID}/coin`, robbedUser, robbedValue);
        }

        function performRob() {
            //20-50%
            let minimum = 0.2;
            let maximum = 0.5;
            let gain = Math.random() * (maximum - minimum) + minimum;
            let range = Math.round(robTargetCookies * (gain/10));

            let robberNew = robberUserCookies + range;
            let robbedNew = robTargetCookies - range;

            saveRobData(robberUser.id, robTargetUser.id, dateNow);
            saveNewCookies(robberUser.id, robberNew, robTargetUser.id, robbedNew);
            message.reply({content: L.RobSuccess.replace("%0", range).replace("%1", robTargetUser.tag).replace("%2", robberNew)});
        }

        if (robbedDataExists) {
            let d = JSON.parse(fs.readFileSync(`./data/${guildID}/robs/${robberUser.id}.json`));
            let foundRobbedUser = d.find(r => r.robbed === robTargetUser.id);
            //Fura megoldás, de teszi a dolgát
            let robbedDate = new Date(foundRobbedUser ? dateNow - foundRobbedUser.date : 86400000).getTime();
            //86400000 ms = 1 nap
            if (robbedDate < 86400000 && robTargetUser.id === foundRobbedUser.robbed) return message.reply({ content: L.RobNotOneDay });
            else performRob();
        }
        else {
            performRob();
        }
    }
}