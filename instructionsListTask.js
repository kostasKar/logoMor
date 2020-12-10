




function indexOfClosingBracket(startIndex){
  
  var bracketDepth = 1;
  var i = startIndex;
  
  while(sourceTokens[i] !== "[") {
    i++;
    if (i == sourceTokens.length){
      error = true;
      consolePrintln("Error: Missing '['");
      return 0;
    }
  }
  i++;
  
  while (bracketDepth > 0){
    if (i == sourceTokens.length){
      error = true;
      consolePrintln("Error: Missing ']'");
      return 0;
    }
    if (sourceTokens[i] === "[") {bracketDepth++;}
    else if (sourceTokens[i] === "]") {bracketDepth--;}
    i++;
  }
  return i - 1;
}








class InstructionsListTask {

  constructor(skip = false){
		tasksStack.push(this);
		if (skip){
			currentIndex = indexOfClosingBracket(currentIndex) + 1;
			this.canBeResolved = true;
		} else {
      if (sourceTokens[currentIndex] !== "["){
        error = true;
        consolePrintln("Error: Missing '['");
      }
			this.canBeResolved = false;
		}
	}

	tryToTakeInput(arg){
    if (this.canBeResolved){ 
      return false;
    } else if (arg === "["){
      return true;
    } else if (arg === "]"){
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
  }

  resolve(){
  	tasksStack.pop();
  	return "";
  }
}