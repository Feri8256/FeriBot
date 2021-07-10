module.exports = {
    name:'love',
    categories: ['fun'],
    description: ['Nincs értelme...', '.'],
    usage: ['<@Felhasználó#0000]> [@Felhasználó#0000]', '<@User#0000]> [@User#0000]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let userA;
        let userB;
        let randomNumber    =   Math.floor(Math.random() * 101);
        let loveText;
    
        if(randomNumber <= 10) loveText =   L.LoveText1;
        if(randomNumber >= 11 && randomNumber <= 39) loveText =   L.LoveText2;
        if(randomNumber >= 40 && randomNumber <= 49) loveText =   L.LoveText3;
        if(randomNumber === 50) loveText =   L.LoveText4;
        if(randomNumber >= 51 && randomNumber <= 65) loveText =   L.LoveText5;
        if(randomNumber >= 66 && randomNumber <= 70) loveText =   L.LoveText6;
        if(randomNumber >= 71 && randomNumber <= 79) loveText =   L.LoveText7;
        if(randomNumber >= 80 && randomNumber <= 90) loveText =   L.LoveText8;
        if(randomNumber >= 91 && randomNumber <= 99) loveText =   L.LoveText9;
        if(randomNumber === 100) loveText =   L.LoveText10;
    
        if(message.mentions.users.first() && message.mentions.users.size == 1){
            //Van említett felhasználó
            userA   =   message.author;
            userB   =   message.mentions.users.first();
    
            message.channel.send(`**${userA.tag}** (${randomNumber}%) **${userB.tag}**\n*${loveText}*`);
    
        }
        if(message.mentions.users.first() && message.mentions.users.size == 2){
            userA   =   message.mentions.users.first();
            userB   =   message.mentions.users.last();
    
            message.channel.send(`**${userA.tag}** (${randomNumber}%) **${userB.tag}**\n*${loveText}*`);
    
        }
    }
}