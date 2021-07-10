fileName = 'a változó neve hazudik, ide valójában teljes útvonal kell. Ajánlatos UTF-8 kódolt szövegfájlokat használni!'

import json

input('Nyomj meg egy billentyűt a műveletek megkezdéséhez!')

openedFile = open(fileName, 'r', 1, 'utf-8')

readedList = openedFile.readlines()

outputList = []

for l in readedList:
    if (len(l) > 4) and ('-' not in l):
        outputList.append(l.replace('\n',''))

with open(fileName+'.json', 'x', 1, 'utf-8') as j:
    json.dump(outputList, j, ensure_ascii=False)

openedFile.close()

print(f'Beolvasott szavak száma: {len(readedList)}')
print(f'Érvényes szavak száma: {len(outputList)}')
print('kész!')
input('Nyomj meg egy billentyűt a befejezéshez!')