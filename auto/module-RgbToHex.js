module.exports = string => {
    let RGBArray = string.split(',');

    let Red = parseInt(RGBArray[0]);
    let Green = parseInt(RGBArray[1]);
    let Blue = parseInt(RGBArray[2]);

    let HexRed = Red.toString(16);
    let HexGreen = Green.toString(16);
    let HexBlue = Blue.toString(16);

    //====================Red====================
    if (Red < 9) {
        var zHexRed = `0${HexRed.toString()}`;
    }
    else if (Red >= 9 && Red <= 15) {
        var zHexRed = `0${HexRed.toString()}`;
    }
    else {
        zHexRed = HexRed.toString();
    }

    //====================Green====================
    if (Green < 9) {
        var zHexGreen = `0${HexGreen.toString()}`;
    }
    else if (Green >= 9 && Green <= 15) {
        var zHexGreen = `0${HexGreen.toString()}`;
    }
    else {
        zHexGreen = HexGreen.toString();
    }

    //====================Blue====================
    if (Blue < 9) {
        var zHexBlue = `0${HexBlue.toString()}`;
    }
    else if (Blue >= 9 && Blue <= 15) {
        var zHexBlue = `0${HexBlue.toString()}`;
    }
    else {
        zHexBlue = HexBlue.toString();
    }

    let output = `#${zHexRed}${zHexGreen}${zHexBlue}`;

    return output;
};
//2020-06-26