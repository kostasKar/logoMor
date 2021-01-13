




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


function sourceCodeLineOfCurrentIndex(){

  var sourceCode = myCodeMirror.getValue().toLowerCase();
  var tokenIndex = 0;
  var wholeSourceTokenIndex = indexOfSubArray(wholeSourceTokens, sourceTokens);
  var sourceCodeIndex = 0;

  if (wholeSourceTokenIndex !== -1){
    while (tokenIndex < wholeSourceTokenIndex + currentIndex){
      sourceCodeIndex = sourceCode.indexOf(wholeSourceTokens[tokenIndex], sourceCodeIndex);
      tokenIndex++;
    }
  } else {
    while (tokenIndex < currentIndex){
      sourceCodeIndex = sourceCode.indexOf(sourceTokens[tokenIndex], sourceCodeIndex);
      tokenIndex++;
    }
  }

  if (currentIndex <  sourceTokens.length){
    sourceCodeIndex = sourceCode.indexOf(sourceTokens[currentIndex], sourceCodeIndex);
  }
  
  sourceCode = sourceCode.substring(0, sourceCodeIndex);
  return (sourceCode.match(/\n/g)||[]).length + 1;
}