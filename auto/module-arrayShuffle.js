module.exports = (inputArr) => {
	if(!inputArr) return
	outputArray = []
	var arrL = inputArr.length
	var usedIndexes = []
	for (var i in inputArr) { 
		var rIndex = Math.floor(Math.random()*arrL)
		while (usedIndexes.includes(rIndex)) rIndex = Math.floor(Math.random()*arrL)
		usedIndexes.push(rIndex)
		outputArray.push(inputArr[rIndex])
	}
	return outputArray
}