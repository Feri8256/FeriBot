module.exports = (message, L, variables, DataMgr) => {
    if (message.content.includes('' + variables.Invite_link)) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            return;
        }
        else {
            let RInvModSetting = DataMgr.Read(`./data/${message.guild.id}/mod_invite`, message.channel.id);

            if (!RInvModSetting) return;
            InvModSetting = RInvModSetting.split(';');

            if (InvModSetting[0] === "1") {
                message.delete();
                if (InvModSetting[1] === "1") message.reply(`⚠ | **${L.InvitesNotAllowed}**`);
            }
        }
    }
}