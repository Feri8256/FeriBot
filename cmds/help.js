const findLanguage = require('../findLanguage');
const variables = require('../variables.json')
module.exports = {
    name: 'help',
    aliases: ['commands', 'parancsok', 'segítség'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let ArrOfCmds = client.cmds.array();
        let langSetting = findLanguage(client, message.guild.id);
        if (!args[1]) {
            //Kategóriák listája
            let HelpCategories = new Discord.MessageEmbed()
            HelpCategories.setTitle(L.HelpTitle)
            HelpCategories.setColor('#f7f7f7')
            HelpCategories.setDescription(L.HelpText1)
            HelpCategories.addFields(
                { name: L.HelpCategoriesTitle, value: `\`${client.prefix}help animals\`\n\`${client.prefix}help fun\`\n\`${client.prefix}help games\`\n\`${client.prefix}help math\`\n\`${client.prefix}help mod\`\n\`${client.prefix}help it\`\n\`${client.prefix}help info\`\n\`${client.prefix}help misc\`` },
                { name: 'More about language setting:', value: `\`${client.prefix}language\`` },
                { name: L.BotInvitesText, value: `[${L.BotInviteTextLink}](${variables.Bot_invite})${variables.Bot_support_server_invite ? ` • [${L.BotSupportServerTextLink}](${variables.Bot_support_server_invite})` : ''}` },
            )
            HelpCategories.setFooter(`${ArrOfCmds.length} ${L.CmdModuleCount}`)
            message.channel.send(HelpCategories)
        }
        else {
            let HelpCategoryEmbed = new Discord.MessageEmbed()
            HelpCategoryEmbed.setColor('#f7f7f7')
    
            let CategoryName = args[1].toLowerCase();
            
            let CategoryArr = ArrOfCmds.filter(elem => elem.categories && elem.categories.includes(CategoryName));
           
            HelpCategoryEmbed.setFooter(`[]: ${L.Optional} | <>: ${L.Required}`)
            
            let CategoryL = CategoryArr.length;

            if (CategoryL === 0) {
                message.reply(`🤷‍♂️ | ${L.UnknownHelpCategory}`)
                return;
            }

            HelpCategoryEmbed.setTitle(`help 👉🏼 ${CategoryName} (${CategoryL})`)
            //Kategória mezőket létrehozza
            for(var i=0; i<CategoryL; i++){

                //parancs aliases mezőt létrehozza
                let CmdAliases = `\`${client.prefix + CategoryArr[i].name}${CategoryArr[i].usage ? "" : "\`"}`;

                if(CategoryArr[i].usage) CmdAliases += " "+CategoryArr[i].usage[langSetting]+"`";

                let AliasL = 0;
                if (CategoryArr[i].aliases) AliasL = CategoryArr[i].aliases.length;

                for(var j=0; j<AliasL; j++) {
                    CmdAliases += " • `";
                    CmdAliases += `${client.prefix + CategoryArr[i].aliases[j]}${CategoryArr[i].usage ? "" : "\`"}`;
                    if(CategoryArr[i].usage) CmdAliases += " "+CategoryArr[i].usage[langSetting]+"`";
                }

                HelpCategoryEmbed.addField(CmdAliases, CategoryArr[i].description[langSetting])
               
            }
            
            message.channel.send(HelpCategoryEmbed);
        }
    }
}