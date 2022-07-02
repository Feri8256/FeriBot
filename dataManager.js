//DataManager (FeriDB xdd)

const fs    =   require('fs-extra');

/**
 * Adat olvasás.
 * @param {String} path Honnan?
 * @param {String} key Mit?
 * @returns {String}
 */
exports.Read = (path, key) => {
    let fullPath = "";
    if(path && key){
        fullPath    =   path+"/"+key;
        if(fs.existsSync(fullPath)){
            let DataBuffer  =   fs.readFileSync(fullPath);
            let DataString  =   DataBuffer.toString();
            return DataString;
        }
    }
}

/**
 * Adat írás. Ha még nem létezik, akkor létrehozza azt. Meglévő állomány tartalmát teljesen felülírja!
 * @param {String} path Hová?
 * @param {String} key Mibe?
 * @param {String} value Micsodát?
 */
exports.Write = (path, key, value) => {
    if(path && key && value){
        if(fs.pathExistsSync(path+"/")){
            fs.writeFileSync(path+"/"+key, value.toString());
        }
        else{
            fs.ensureDir(path, 0o2775);
            fs.writeFileSync(path+"/"+key, value.toString());
        }
    }
}

/**
 * Tárolt szám érték módosítása. Ha még nem létezik, akkor létrehozza azt. Meglévő állomány tartalmát teljesen felülírja!
 * @param {String} path Hová?
 * @param {String} key Mibe?
 * @param {Number} value Mennyit?
 */
exports.AddToNumber = (path, key, value) => {
    function s(p, k, v) {
        let prevStr = fs.readFileSync(p+"/"+k).toString();
        let prevNum = parseInt(prevStr);

        if (isNaN(v) || isNaN(prevNum)) return;

        prevNum += v;

        fs.writeFileSync(p+"/"+k, prevNum.toString());
    }

    if(path && key && value){
        if(fs.pathExistsSync(path+"/")){
            s(path, key, value);
        }
        else{
            fs.ensureDir(path, 0o2775);
            s(path, key, value);
        }
    }
}

/**
 * Adat eltávolítás
 * @param {String} path Honnan?
 * @param {String} key Mit?
 */
exports.Delete = (path, key) => {
    let fullPath = "";
    if(path && key){
        fullPath    =   path+"/"+key;
        if(fs.existsSync(fullPath)){
            fs.unlinkSync(fullPath);
        }
    }
}

/**
 * Könyvtár eltávolítás
 * @param {String} path Teljes útvonal a törölendő könyvtár nevével együtt
 */
exports.RemoveDir = (path) => {
    if (fs.pathExistsSync(path)) {
        fs.removeSync(path)
    }
};

/**
 * Könyvtár létrehozás
 * @param {String} path Teljes útvonal a létrehozandó könyvtár nevével együtt
 */
exports.CreateDir = (path) => {
    fs.ensureDir(path, 0o2775);
}

/**
 * Ellenőrzi, hogy létezik-e az adott állomány a megadott helyen
 * @param {String} path Teljes ellenőrizendő útvonal
 */
exports.Exists = (path, key) => {
    if (!path || !key) return

    if (fs.pathExistsSync(path+"/"+key)) {
        return true
    }
    else {
        return false
    }
}

/**
 * Hozzáfűz adatot egy meglévő állományhoz. Ha még nem létezik, akkor létrehozza azt.
 * a Write metódushoz hasonlóan kell használni.
 * @param {String} path Hová?
 * @param {String} key Mibe?
 * @param {String} value Micsodát?
 */
exports.Append = (path, key, value) => {
    if(path && key && value){
        if(fs.pathExistsSync(path+"/")){
            fs.appendFileSync(path+"/"+key, value.toString());
        }
        else{
            fs.ensureDir(path, 0o2775);
            fs.appendFileSync(path+"/"+key, value.toString());
        }
    }
}