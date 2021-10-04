const capsTestPrimary = /[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŰŐ\ +\/]{10,}/g

module.exports = (message, DataMgr) => {
    let msg = message.content;

    if (capsTestPrimary.test(msg)) {
        let d = DataMgr.Read(`./data/${message.guild.id}`,'caps');

        if (d != null && d != undefined) {
            let capsTestSecondary = new RegExp("[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŰŐ\\ +\\/]{" + d + ",}", "g");
            if (capsTestSecondary.test(msg)) message.delete();
        }
    }
}