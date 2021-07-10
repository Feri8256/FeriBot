module.exports = (member, DataMgr) => {
    let AutoRoleString    =   DataMgr.Read(`./data/${member.guild.id}`, 'role');

    if(AutoRoleString){
        member.roles.add(AutoRoleString, 'auto');
    }
};