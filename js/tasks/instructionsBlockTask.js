

class InstructionsBlockTask {

  constructor(){
    LM.interpreter.tasksStack.push(this);
    if (LM.interpreter.currentToken !== "["){
      LM.throwError("Missing '['");
    }
    this.opened = false;
    this.canBeResolved = false;
    this.breakWord = null;
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
    } else if (["return", "output", "stop", "break"].includes(arg)) {
      this.breakWord = arg;
      this.canBeResolved = true;
      return false;
    } else {
      return false;
    }
  }

  resolve(){
  	LM.interpreter.tasksStack.pop();
  	return (this.breakWord) ? this.breakWord : "";
  }

  static findEndOfBlockIndex(){
    var sourceTokens = LM.interpreter.sourceTokens;
    var index = LM.interpreter.currentIndex;
    var bracketDepth = 0;

    if (sourceTokens[index] !== '['){
      LM.throwError("Instruction block missing '['");
      return;
    }

    do {
      if (index == sourceTokens.length){
        LM.throwError("Instruction block missing ']'");
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
    LM.interpreter.currentIndex = InstructionsBlockTask.findEndOfBlockIndex();
  }
}