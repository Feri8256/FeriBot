module.exports = {
    name:'roll',
    categories: ['fun'],
    description: ['Véletlenszám 0 és 100 között.', 'Random number between 0 and 100.'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let rdm = Math.floor(Math.random() * 101);
        message.reply(rdm);
    }
}