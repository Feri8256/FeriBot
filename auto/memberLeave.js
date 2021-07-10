module.exports  =   (member, client, DataMgr) => {
    let leaveData =   DataMgr.Read(`./data/${member.guild.id}`,'leave');

    if(leaveData){
        let PLeaveData    =   leaveData.split(';');
        let lMsgID   =   PLeaveData[0];
        let lMsgText    =   PLeaveData.slice(1, PLeaveData.lenth);
        let lMsgCh  = client.channels.cache.get(lMsgID)

        if(lMsgCh){
            lMsgCh.send(`<@${member.user.id}> - ${lMsgText}`);
        }
        else{
            return;
        }
    } 
};