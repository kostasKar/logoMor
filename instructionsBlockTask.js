

class InstructionsBlockTask {

  constructor(){
    interpreter.tasksStack.push(this);
    if (interpreter.currentToken !== "["){
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
  	interpreter.tasksStack.pop();
  	return "";
  }

  static skipBlock(){
    var bracketDepth = 0;
    
    if(interpreter.currentToken !== "[") {
      throwError("Skippig Instruction Block: Missing '['");
      return;
    }
    
    do {
      if (interpreter.currentIndex == interpreter.sourceTokens.length){
        throwError("Skippig Instruction Block: Missing ']'");
        return;
      }
      if (interpreter.currentToken === "[") {bracketDepth++;}
      else if (interpreter.currentToken === "]") {bracketDepth--;}
      interpreter.currentIndex++;
    } 
    while (bracketDepth > 0);
  }

  static findEndOfBlockIndex(){
    var sourceTokens = interpreter.sourceTokens;
    var bracketDepth = 0;
    var index = interpreter.currentIndex;
    
    while (sourceTokens[index] !== '['){
      index++;
      if (index == sourceTokens.length){
        throwError("Instruction block missing '['");
        return;
      }
    }

    index++;
    var bracketDepth = 1;
    
    do {
      if (index == sourceTokens.length){
        throwError("Instruction block missing ']'");
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