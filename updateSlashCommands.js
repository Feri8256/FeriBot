require('dotenv').config();
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

module.exports = async function(c, b) {
    try {
        console.log('Slash: looking for changes...')
        await rest.get(Routes.applicationGuildCommands(c.user.id, '697161337049972778'))

        .then(async (data) => {
            if (!data || data.length !== b.length) {
                console.log('Slash: changes found! Updating...')
                await rest.put(
                    Routes.applicationGuildCommands(c.user.id, '697161337049972778'), { body: b }
                );
                console.log('Slash: update finished!')
            }
            else {
                console.log('Slash: no changes has been made!')
            }
        });

        //console.log('Slash: frissítése...')
        //await rest.put(
        //    Routes.applicationGuildCommands(c.user.id, '697161337049972778'), { body: b }
        //);
        //console.log('Slash: frissítése befejeződött!')    
    }
    catch (error) {
        console.error(error);
    }
}