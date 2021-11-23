

function sourceCodeLineOfTokenIndex(index){
  return (index < sourceTokensLineNumbers.length) ? sourceTokensLineNumbers[index] : sourceTokensLineNumbers[sourceTokensLineNumbers.length - 1];
}