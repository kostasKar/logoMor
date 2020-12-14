




function indexOfClosingBracket(startIndex){
  
  var bracketDepth = 1;
  var i = startIndex;
  
  while(sourceTokens[i] !== "[") {
    i++;
    if (i == sourceTokens.length){
      throwError("Missing '['");
      return 0;
    }
  }
  i++;
  
  while (bracketDepth > 0){
    if (i == sourceTokens.length){
      throwError("Missing ']'");
      return 0;
    }
    if (sourceTokens[i] === "[") {bracketDepth++;}
    else if (sourceTokens[i] === "]") {bracketDepth--;}
    i++;
  }
  return i - 1;
}








class InstructionsBlockTask {

  constructor(){		
    tasksStack.push(this);
    if (sourceTokens[currentIndex] !== "["){
      throwError("Missing '['");
    }
    this.opened = false;
		this.canBeResolved = false;
	}

	tryToTakeInput(arg){
    if (this.canBeResolved){ 
      return false;
    } else if ((!this.opened) && (arg === "[")){
      this.opened = true;
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

  static skipBlock(){
    currentIndex = indexOfClosingBracket(currentIndex) + 1;
  }
}