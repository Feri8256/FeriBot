module.exports = (str) => {
    if(!str) return;

    var splitted = str.trim().split('');
    var output = '';

    for (i in splitted) {
        var char = splitted[i].charCodeAt().toString(16)
        output += char + ' ';
    }

    return output;
}