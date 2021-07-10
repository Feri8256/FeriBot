module.exports = {
    name: 'average',
    aliases: ['avg'],
    categories: ['math'],
    description: ['Kiszámítja az adott számok átlagát.', 'Calculates the average value of multiple numbers.'],
    usage: ['<#> <#> [...]', '<#> <#> [...]'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let numArray =   args.slice(1, args.length);
    
        let numArrayLength  =   numArray.length;
    
        if(numArrayLength < 2){
            message.reply(`⚠ | ${L.AverageAtLeastTwo}`);
        }
        else{
            var summ    =   0;
            for(var i = 0; i < numArrayLength; i++){
                summ    +=  parseInt(numArray[i]);
            }
    
            var avgResult   =   summ / numArrayLength;
    
            if(isNaN(summ)){
                message.reply(`⚠ | ${L.AverageNotNumber}`)
            }
            else{
                message.reply(`${L.AverageResult}: **${avgResult}**`);
            }
        }
    }
}