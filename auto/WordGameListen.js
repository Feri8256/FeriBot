module.exports = (client, message, DataMgr, L) => {
    let wgPlayerID = message.guild.id + message.author.id;

    if (client.wordGamePlayers.has(wgPlayerID)) {

        let d = client.wordGamePlayers.get(wgPlayerID);
        let msgContent = message.content.toLowerCase();

        function reset(pid) {
            client.wordGamePlayers.delete(pid);
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
                reset(wgPlayerID);
                message.reply({content: L.WordGameExit});
                break;

            case 'g':
                message.reply({content: L.WordGameGiveUp.replace('{0}', d.normal)});
                reset(wgPlayerID);
                break;

            case 'h':
                if (d.hints === 0) {
                    message.reply({content: L.WordGameNoHelping});
                }
                else {
                    d.hints--;
                    message.reply({content: L.WordGameHelping.replace('{0}', giveRandomHint(d.normal)).replace('{1}', d.hints)});
                    client.wordGamePlayers.set(wgPlayerID, d);
                }
                break;

            default:
                if (msgContent.length < d.normal.length-2 || msgContent.length > d.normal.length) return;
                if (msgContent === d.normal.toLowerCase() && d.tries > 0) {
                    let reward = d.tries * 10;
                    message.reply({content: L.WordGameCorrect.replace('{0}', reward)});
                    calcReward(message.guild.id, message.author.id, reward);
                    reset(wgPlayerID);
                }
                else {
                    d.tries--;
                    if(d.tries === 0) {
                        message.reply({content: L.WordGameNoTriesAndCorrect.replace('{0}', d.normal)});
                        reset(wgPlayerID);
                    }
                    else {
                        client.wordGamePlayers.set(wgPlayerID, d);
                        message.reply({content: L.WordGameWrongAndTries.replace('{0}', d.tries)});
                    }
                        
                }
        }
    }
}