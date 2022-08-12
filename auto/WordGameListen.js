module.exports = (client, message, DataMgr, L) => {
    let wgPlayerID = message.guild.id + message.author.id;

    if (client.wordGamePlayers.has(wgPlayerID)) {

        let d = client.wordGamePlayers.get(wgPlayerID);

        let msgContent = message.content.toLowerCase();

        function reset(pid) {
            client.wordGamePlayers.delete(pid);
        }

        function calcReward (gid, pid, num) {
            DataMgr.AddToNumber(`./data/${gid}/coin`, pid, num);
        }

        function giveRandomHint(normalW) {
            let WL = normalW.length;
            let outStr = '';
            let rHint = Math.floor(Math.random() * 3);
            // Ne adja egymás után ugyan azokat a segítségeket, mert az nem igazán segítség
            while (d.usedHints.includes(rHint)) rHint = Math.floor(Math.random() * 3);
            d.usedHints.push(rHint);

            switch (rHint) {
                case 0:
                    for (let i = 0; i < WL; i++) {
                        outStr += i+2 > Math.round(WL / 2) ? '-' : normalW.charAt(i);
                    }
                    break;

                case 1:
                    for (let i = 0; i < WL; i++) {
                        outStr += i-1 < WL / 2 ? '-' : normalW.charAt(i);
                    }
                    break;

                case 2:
                    for (let i = 0; i < WL; i++) {
                        let r = Math.floor(Math.random() * 4);
                        outStr += r === 2 ? normalW.charAt(i) : '-';
                    }
                    break;

                case 3:
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

                    let matchCheck = giveRandomHint(d.normal);
                    while (matchCheck === d.normal) matchCheck = giveRandomHint(d.normal);

                    message.reply({content: L.WordGameHelping.replace('{0}', matchCheck).replace('{1}', d.hints)});
                    client.wordGamePlayers.set(wgPlayerID, d);
                }
                break;

            default:
                if (msgContent.length < d.normal.length-2 || msgContent.length > d.normal.length) return;
                if (msgContent === d.normal.toLowerCase() && d.tries > 0) {
                    let reward = d.score - (d.tries - d.usedHints.length)*10;
                    message.reply({content: L.WordGameCorrect.replace('{0}', reward)});
                    calcReward(message.guild.id, message.author.id, reward);
                    reset(wgPlayerID);
                }
                else {
                    d.tries++;
                    if(d.tries === d.maxTries) {
                        message.reply({content: L.WordGameNoTriesAndCorrect.replace('{0}', d.normal)});
                        reset(wgPlayerID);
                    }
                    else {
                        client.wordGamePlayers.set(wgPlayerID, d);
                        message.reply({content: L.WordGameWrongAndTries.replace('{0}', d.maxTries - d.tries)});
                    }
                        
                }
        }


    }
}