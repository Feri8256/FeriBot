const Discord = require('discord.js');

exports.E_NaNError = (L) => {
    let nanerror = new Discord.MessageEmbed()
    nanerror.setColor('#ff0000')
    nanerror.setTitle(L.NaNErrTitle)
    nanerror.setDescription(L.NaNErrDescription)

    return nanerror;
};

exports.E_InvalidArgs = (L) => {
    let invalidArgs = new Discord.MessageEmbed()
    invalidArgs.setColor('#ff0000')
    invalidArgs.setTitle(`❌ ${L.IncorrectArgsTitle}`)
    invalidArgs.setDescription(L.IncorrectArgsDescription)

    return invalidArgs;
};

exports.E_InvalidAPIRes = (L) => {
    let invalidAPIResponse = new Discord.MessageEmbed()
    invalidAPIResponse.setColor('#ff0000')
    invalidAPIResponse.setTitle(`❌ ${L.IncorrectAPIResponseTitle}`)
    invalidAPIResponse.setDescription(L.IncorrectAPIResponseDescription)

    return invalidAPIResponse;
};

exports.W_CooldownWait = (L) => {
    let CooldownWait = new Discord.MessageEmbed()
    CooldownWait.setColor('#ffff00')
    CooldownWait.setTitle(`⚠ ${L.CoolDownTitle}`)
    CooldownWait.setDescription(L.CoolDownDescription)

    return CooldownWait;
};

exports.W_UsrNoPermission = (Language, langSetting) => {
    let UsrNoPermission = new Discord.MessageEmbed()
    UsrNoPermission.setColor('#ff0000')
    UsrNoPermission.setTitle(`❌ ${L.UserNoPermissionTitle}`)
    UsrNoPermission.setDescription(L.UserNoPermissionDescription)

    return UsrNoPermission;
};

exports.W_BotNoPermisson = (Language, langSetting) => {
    let BotNoPermission = new Discord.MessageEmbed()
    BotNoPermission.setColor('#ff0000')
    BotNoPermission.setTitle(`❌ ${L.BotNoPermissionTitle}`)
    BotNoPermission.setDescription(L.BotNoPermissionDescription)

    return BotNoPermission;
};