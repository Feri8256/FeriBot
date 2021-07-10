module.exports = {
    name: 'factor',
    aliases:['!'],
    categories: ['math'],
    description: ['Visszaadja az adott szám faktoriális értékét.', 'Returns the factorial value of a number.'],
    usage: ['<#>', '<#>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if(args[1]){
            let NumberInput =   parseInt(args[1]);
            if(isNaN(NumberInput) || NumberInput > 100){
               message.reply(`❌ | ${L.IncorrectArgsDescription}`);
            }
            else{
                let result  =   1;
                for(var i = NumberInput; i > 1; i--){
                    result *= i;
                }
                message.reply(`${L.FactorialNumberIs}: **${result}**`);
            }
        }
        else{
            message.reply(`❌ | ${L.IncorrectArgsDescription}`);
        }
    }
}