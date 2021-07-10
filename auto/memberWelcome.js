/**
 * '@User' = felhasználó tag-el
 * 'UserName' = felhasználó neve
 * 'ServerName' = Szerver neve
 */
module.exports  =   (member, client, DataMgr) => {
    let welcomeData =   DataMgr.Read(`./data/${member.guild.id}`,'welcome');

    if(welcomeData){
        let PWelcomeData    =   welcomeData.split(';');
        let wMsgID   =   PWelcomeData[0];
        let wMsgText    =   String(PWelcomeData.slice(1, PWelcomeData.lenth));
        let wMsgCh  =   client.channels.cache.get(wMsgID);

        if(wMsgCh){
            wMsgCh.send(
                wMsgText.replace(/@User/g, `<@${member.user.id}>`)
                .replace(/UserName/g, member.user.name)
                .replace(/ServerName/g, member.guild)
            );
        }
    }
};