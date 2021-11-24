




class UntilTask {

  constructor(){
    interpreter.tasksStack.push(this);
    new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
    this.conditionIndex = interpreter.currentIndex + 1;
    this.endOfLoopBlockIndex = InstructionsBlockTask.findEndOfBlockIndex();
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.conditionSet){
      if (isNaN(arg)){
        throwError("Invalid until condition: " + arg);
        return false;
      }
      if (arg == 0){
        new InstructionsBlockTask(); 
      } else if (arg != 0){
        interpreter.currentIndex = this.endOfLoopBlockIndex;
        this.canBeResolved = true;
      }
      this.conditionSet = true;
      return true;
    } else {
      interpreter.currentIndex = this.conditionIndex;
      new ArgumentResolverTask();
      this.conditionSet = false;
      return false;
    }
  }
  
  resolve(){
    interpreter.tasksStack.pop();
    return "";
  }

}