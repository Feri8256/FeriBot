module.exports = {
    name:'ping',
    categories: ['info'],
    description: ['Bot pillanatnyi válaszideje.', 'Current response time of the bot.'],
    async execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        let checkMsg   =   await message.channel.send({content: 'Ping...'});
        let msgPing =   checkMsg.createdTimestamp - message.createdTimestamp;
        let pingMsg   =   `🏓 **| Pong!**\n${L.PingMessage}: \`${msgPing} ms\`\nWS: \`${client.ws.ping} ms\``;

        checkMsg.edit({content: pingMsg});
    }
}