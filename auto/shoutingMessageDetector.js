const CapitalLetterRegExp = /[A-Z\ +\/]{10,}/

module.exports = (message, DataMgr) => {
    let msgContent = message.content;

    if (CapitalLetterRegExp.test(msgContent)) {
        let testRead = DataMgr.Read(`./data/${message.guild.id}`,'caps')
        if (testRead != null && testRead === '1') {
            message.delete();
        }
    }
}