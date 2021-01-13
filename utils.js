




function indexOfSubArray(array, subArray){

	var arrayIndex = 0;
	var subArrayIndex = 0;

	while ((subArrayIndex < subArray.length) && (arrayIndex + subArrayIndex < array.length)){
		if (array[arrayIndex + subArrayIndex] !== subArray[subArrayIndex]){
			arrayIndex++;
			subArrayIndex = 0;
		} else {
			subArrayIndex++;
		}
	}

	return (subArrayIndex === subArray.length) ? arrayIndex : -1;

}