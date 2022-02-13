const findLanguage = require('../../findLanguage');
const variables = require('../../variables.json')
module.exports = {
    name: 'help',
    aliases: ['commands', 'parancsok', 'segítség'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let prefix = client.prefix;
        let arrOfCmds = [...client.messageCommands.values()];
        let categoryList = [...new Set([].concat(...arrOfCmds.map((value)=> value.categories)))];

        let langSetting = findLanguage(client, message.guild.id);
        if (!args[1]) {
            //Kategóriák listája
            let categoryListString = "";
            for (c of categoryList) {
                if (!c) continue;
                categoryListString += `\`${prefix}help ${c}\`\n`;
            } 

            let helpCategories = new Discord.MessageEmbed()
            helpCategories.setTitle(L.HelpTitle)
            helpCategories.setColor('#f7f7f7')
            helpCategories.setDescription(L.HelpText1)
            helpCategories.addFields(
                { name: L.HelpCategoriesTitle, value: categoryListString },
                { name: 'More about language setting:', value: `\`${prefix}language\`` },
                { name: L.BotInvitesText, value: `[${L.BotInviteTextLink}](${variables.Bot_invite})${variables.Bot_support_server_invite ? ` • [${L.BotSupportServerTextLink}](${variables.Bot_support_server_invite})` : ''}` },
            )
            helpCategories.setFooter(`${arrOfCmds.length} ${L.CmdModuleCount}`)
            message.channel.send({embeds: [helpCategories]})
        }
        else {
            let categoryName = args[1].toLowerCase();
            let categoryArr = arrOfCmds.filter(elem => elem.categories && elem.categories.includes(categoryName));
            let categoryL = categoryArr.length;

            if (categoryL === 0) {
                message.reply({content: L.UnknownHelpCategory})
                return;
            }

            let helpCategoryEmbed = new Discord.MessageEmbed()
            helpCategoryEmbed.setColor('#f7f7f7')
            helpCategoryEmbed.setFooter(`[]: ${L.Optional} | <>: ${L.Required}`)

            helpCategoryEmbed.setTitle(`help 👉🏼 ${categoryName} (${categoryL})`)
            //Kategória mezőket létrehozza
            for(var i=0; i<categoryL; i++){
                //parancs aliases mezőt létrehozza
                let cmdAliases = `\`${prefix + categoryArr[i].name}${categoryArr[i].usage ? "" : "\`"}`;
                if(categoryArr[i].usage) cmdAliases += " "+categoryArr[i].usage[langSetting]+"`";
                let AliasL = 0;
                if (categoryArr[i].aliases) AliasL = categoryArr[i].aliases.length;
                for(var j=0; j<AliasL; j++) {
                    cmdAliases += " • `";
                    cmdAliases += `${prefix + categoryArr[i].aliases[j]}${categoryArr[i].usage ? "" : "\`"}`;
                    if(categoryArr[i].usage) cmdAliases += " "+categoryArr[i].usage[langSetting]+"`";
                }
                helpCategoryEmbed.addField(cmdAliases, categoryArr[i].description[langSetting])
            }
            
            message.channel.send({embeds: [helpCategoryEmbed]});
        }
    }
}