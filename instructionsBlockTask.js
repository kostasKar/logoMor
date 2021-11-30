

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

  static findEndOfBlockIndex(){
    var sourceTokens = interpreter.sourceTokens;
    var index = interpreter.currentIndex;
    var bracketDepth = 0;

    if (sourceTokens[index] !== '['){
      throwError("Instruction block missing '['");
      return;
    }

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

  static skipBlock(){
    interpreter.currentIndex = InstructionsBlockTask.findEndOfBlockIndex();
  }
}