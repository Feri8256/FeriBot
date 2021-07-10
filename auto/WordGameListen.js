module.exports = (client, message, DataMgr, L) => {
    let wgPlayerID = message.guild.id + message.author.id;

    if (client.wordGamePlayer.has(wgPlayerID)) {

        let wgPlayerData = client.wordGamePlayer.get(wgPlayerID);
        let wgPlayerTries = client.wordGamePlayerTries.get(wgPlayerID);
        let wgPlayerHints = client.wordGamePlayerHints.get(wgPlayerID);
        let msgContent = message.content.toLowerCase();

        function resetEverything (pid) {
            client.wordGamePlayer.delete(pid);
            client.wordGamePlayerTries.delete(pid);
            client.wordGamePlayerHints.delete(pid);
        }

        function calcReward (gid, pid, num) {
            let r = DataMgr.Read(`./data/${gid}/coin`, pid);
            let c;
            if (!r) {
                c = 0;
            }
            else {
                c = parseInt(r);
            }
            DataMgr.Write(`./data/${gid}/coin`, pid, c + num);
        }

        function giveRandomHint(normalW) {
            let WL = normalW.length;
            let outStr = '';
            let rHint = Math.floor(Math.random() * 7);

            switch (rHint) {
                case 1:
                case 4:
                    for (let i = 0; i < WL; i++) {
                        outStr += i+2 > Math.round(WL / 2) ? '-' : normalW.charAt(i);
                    }
                    break;

                case 2:
                case 5:
                    for (let i = 0; i < WL; i++) {
                        outStr += i-1 < WL / 2 ? '-' : normalW.charAt(i);
                    }
                    break;

                case 0:
                case 7:
                    for (let i = 0; i < WL; i++) {
                        let r = Math.floor(Math.random() * 4);
                        outStr += r === 2 ? normalW.charAt(i) : '-';
                    }
                    break;

                case 3:
                case 6:
                    for (let i = 0; i < WL; i++) {
                        let r = Math.floor(Math.random() * 3);
                        outStr += r === 2 ? normalW.charAt(i) : '-';
                    }
                    break;
            }

            return outStr;
        }

        if (msgContent.startsWith(client.prefix)) return;
 
        switch(msgContent) {
            case 'x':
                resetEverything(wgPlayerID);
                message.reply(L.WordGameExit);
                break;

            case 'g':
                message.reply(L.WordGameGiveUp.replace('{0}', wgPlayerData.normalWord));
                resetEverything(wgPlayerID);
                break;

            case 'h':
                if (wgPlayerHints === 0) {
                    message.reply(L.WordGameNoHelping);
                    client.wordGamePlayerHints.delete(wgPlayerID);
                }
                else {
                    message.reply(L.WordGameHelping.replace('{0}', giveRandomHint(wgPlayerData.normalWord)));
                }
                wgPlayerHints--
                client.wordGamePlayerHints.set(wgPlayerID, wgPlayerHints);
                break;

            default:
                if (msgContent.length < wgPlayerData.normalWord.length || msgContent.length > wgPlayerData.normalWord.length) return;
                if (msgContent === wgPlayerData.normalWord.toLowerCase() && wgPlayerTries > 0) {
                    let reward = wgPlayerTries * 10;
                    message.reply(L.WordGameCorrect.replace('{0}', reward));
                    calcReward(message.guild.id, message.author.id, reward);
                    resetEverything(wgPlayerID);
                }
                else {
                    wgPlayerTries--
                    if(wgPlayerTries === 0) {
                        message.reply(L.WordGameNoTriesAndCorrect.replace('{0}', wgPlayerData.normalWord));
                        resetEverything(wgPlayerID);
                    }
                    else {
                        client.wordGamePlayerTries.set(wgPlayerID, wgPlayerTries);
                        message.reply(L.WordGameWrongAndTries.replace('{0}', wgPlayerTries));
                    }
                        
                }
        }
    }
}