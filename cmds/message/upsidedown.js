const charMap = { 'a':'ɐ', 'b':'q', 'c':'ɔ',
    'd':'p', 'e':'ǝ', 'f':'ɟ', 'g':'ƃ',
    'h':'ɥ', 'i':'ᴉ', 'j':'ɾ', 'k':'ʞ',
    'l':'l', 'm':'ɯ', 'n':'u', 'o':'o',
    'p':'d', 'q':'b', 'r':'ɹ', 's':'s',
    't':'ʇ', 'u':'n', 'v':'ʌ', 'w':'ʍ',
    'x':'x', 'y':'ʎ', 'z':'z',
    'A':'∀', 'B':'B', 'C':'Ɔ', 'D':'D', 'E':'Ǝ', 
    'F':'Ⅎ', 'G':'פ', 'H':'H', 'I':'I', 'J':'ſ', 
    'K':'K', 'L':'˥', 'M':'W', 'N':'N', 'O':'O', 
    'P':'Ԁ', 'Q':'Q', 'R':'R', 'S':'S', 'T':'┴', 
    'U':'∩', 'V':'Λ', 'W':'M', 'X':'X', 'Y':'⅄',
    'Z':'Z',
    '0':'0', '1':'Ɩ', '2':'ᄅ', '3':'Ɛ', '4':'ㄣ', '5':'ϛ', '6':'9', 
    '7':'ㄥ', '8':'8', '9':'6', 
    ',':'\'', '.':'˙', '?':'¿', '!':'¡', '"':',,', '\'':',', '`':',', 
    '(':')', ')':'(', '[':']', ']':'[', '{':'}', '}':'{', '<':'>', 
    '>':'<', '&':'⅋', '_':'‾', ' ':' '
}
const AA = ['á'];
const AAA = ['Á'];
const EE = ['é'];
const EEE = ['É'];
const II = ['í'];
const III = ['Í'];
const OO = ['ó', 'ö', 'ő'];
const OOO = ['Ó', 'Ö', 'Ő'];
const UU = ['ú', 'ü', 'ű'];
const UUU = ['Ú', 'Ü', 'Ű'];

module.exports = {
    name: 'upsidedown',
    aliases: ['u', 'mirror'],
    categories: ['fun'],
    description: ['Fejjel lefelé tükrözi a szöveget (fordítva nem működik)', ''],
    usage: ['<szöveg>', '<text>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        var uzenet = args.slice(1, args.length).join(' ');

        if (!uzenet) return;

        var splitted = uzenet.trim().split('').reverse();
        var output = '';
    
        for (i in splitted) {
            var char = splitted[i];
    
            if (AA.includes(char)) char = 'a';
            if (AAA.includes(char)) char = 'A';
            if (EE.includes(char)) char = 'e';
            if (EEE.includes(char)) char = 'E';
            if (II.includes(char)) char = 'i';
            if (III.includes(char)) char = 'I';
            if (OO.includes(char)) char = 'o';
            if (OOO.includes(char)) char = 'O';
            if (UU.includes(char)) char = 'u';
            if (UUU.includes(char)) char = 'U';
    
            output += charMap[char] || char;
        }

        message.channel.send({content: output});
    }
}