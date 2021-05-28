

function createLineNumbersArrayForWholeProgram(){

  var text = myCodeMirror.getValue().toLowerCase().replace(/;.*\n/g, "\n");;
  var sourceCodeIndex = 0;
  var lineNumbersArray = [];
  
  for (i = 0; i < wholeSourceTokens.length; i++){
    sourceCodeIndex = text.indexOf(wholeSourceTokens[i], sourceCodeIndex);
    lineNumbersArray.push((text.substring(0, sourceCodeIndex).match(/\n/g)||[]).length + 1);
  }

  return lineNumbersArray;
}

function sourceCodeLineOfTokenIndex(index){
  return (index < sourceTokensLineNumbers.length) ? sourceTokensLineNumbers[index] : sourceTokensLineNumbers[sourceTokensLineNumbers.length - 1];
}