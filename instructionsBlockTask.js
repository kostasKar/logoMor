

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
    var bracketDepth = 0;
    
    if(sourceTokens[currentIndex] !== "[") {
      throwError("Skippig Instruction Block: Missing '['");
      return;
    }
    
    do {
      if (currentIndex == sourceTokens.length){
        throwError("Skippig Instruction Block: Missing ']'");
        return;
      }
      if (sourceTokens[currentIndex] === "[") {bracketDepth++;}
      else if (sourceTokens[currentIndex] === "]") {bracketDepth--;}
      currentIndex++;
    } 
    while (bracketDepth > 0);
  }

  static findEndOfBlockIndex(){
    var bracketDepth = 0;
    var index = currentIndex;
    
    while (sourceTokens[index] !== '['){
      index++;
      if (index == sourceTokens.length){
        throwError("Finding end of Instructions Block: Missing '['");
        return;
      }
    }

    index++;
    var bracketDepth = 1;
    
    do {
      if (index == sourceTokens.length){
        throwError("Finding end of Instruction Block: Missing ']'");
        return;
      }
      if (sourceTokens[index] === "[") {bracketDepth++;}
      else if (sourceTokens[index] === "]") {bracketDepth--;}
      index++;
    } 
    while (bracketDepth > 0);

    return index;
  }

}