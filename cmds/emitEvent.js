const v = require('../variables.json')
module.exports = {
    name: 'emit',
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let msg = args[1];
        if(msg && v.Creator_id === message.author.id) {
            client.emit(msg, message.member);
            message.react('☑');
        }
    }
}