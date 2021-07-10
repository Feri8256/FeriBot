exports.getNapszak = () => {
    let date = new Date();
    let hours = date.getHours();

    if (hours >= 0 && hours < 3) return "éjjelt"
    if (hours >= 3 && hours < 6) return "hajnalt"
    if (hours >= 6 && hours < 10) return "reggelt"
    if (hours >= 10 && hours < 12) return "délelőttöt"
    if (hours >= 12 && hours < 14) return "napot"
    if (hours >= 14 && hours < 18) return "délutánt"
    if (hours >= 18 && hours <= 23) return "estét"
}