const fs = require('fs');
var template ={
    Questions:[]
};

//Kérdés fájl megnyitása, majd szöveggé alakítása
let openedFile = fs.readFileSync('01_5000.mjk', {encoding:'latin1'}).toString();

//Minden kérdés szövegét egy = jel előzi meg, Ezeknél fogva daraboljuk a szöveget. A stage1 egy tömb lesz
let stage1 = openedFile.split('=');

let stage2 = '';
for (i of stage1) {
    var checkA = i.split('^').join('\n')
    if (!checkA.includes('<' && '>')) stage2 += checkA;
}

//Első rész vége

let stage3 = stage2.split('\n')

stage3.pop()

let c = 0; //A külső for ciklus lefutását számoló változó
for (let i = 0; i < stage3.length; i+=5) {

    //QuestionText string és possibleAnswers tömb létrehozása
    template.Questions.push({
        questionText: stage3[i],
        possibleAnswers: []
    });

    //PossibleAnswers hozzáfűzése a kérdéshez
    for (let j = i + 1; j < i + 5; j++) {

        //Helyes válaszlehetőség egy & jellel van jelölve. 
        //Ha ez így van, szedje le azt a karaktert az elejéről
        //És a correct legyen igaz. Egyébként nem.
        if (stage3[j].startsWith('&')){
            template.Questions[c].possibleAnswers.push({
                answerText: stage3[j].slice(1,stage3[j].length),
                correct: true
            });
        }
        else {
            template.Questions[c].possibleAnswers.push({
                answerText: stage3[j],
                correct: false
            });
        }
    }
    c++;
}

//A módosított template fájlba írása
fs.writeFileSync('Output3.json', JSON.stringify(template));
console.log(c)