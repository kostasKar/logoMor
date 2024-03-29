




class UntilTask {

  constructor(){
    LM.interpreter.tasksStack.push(this);
    new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
    this.conditionIndex = LM.interpreter.currentIndex + 1;
    this.endOfLoopBlockIndexSet = false;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.conditionSet){
      if (isNaN(arg)){
        LM.throwError("Invalid until condition: " + arg);
        return false;
      }
      if (!this.endOfLoopBlockIndexSet){
        this.endOfLoopBlockIndex = InstructionsBlockTask.findEndOfBlockIndex();
        this.endOfLoopBlockIndexSet = true;
      } 
      if (arg == 0){
        new InstructionsBlockTask(); 
      } else if (arg != 0){
        LM.interpreter.currentIndex = this.endOfLoopBlockIndex;
        this.canBeResolved = true;
      }
      this.conditionSet = true;
      return true;
    } else {
      LM.interpreter.currentIndex = this.conditionIndex;
      new ArgumentResolverTask();
      this.conditionSet = false;
      return false;
    }
  }
  
  resolve(){
    LM.interpreter.tasksStack.pop();
    return "";
  }

}