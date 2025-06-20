



class IfElseTask {

  constructor(){
    LM.interpreter.tasksStack.push(this);
    new ArgumentResolverTask();
    this.canBeResolved = false;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    } else {
      if (isNaN(arg)){
        LM.throwError("Invalid ifelse condition: " + arg);
        return false;
      }
      if (arg != 0){
        this.conditionValue = true;
        new InstructionsBlockTask();
      } else {
        this.conditionValue = false;
        InstructionsBlockTask.skipBlock();
        new InstructionsBlockTask();
      }
      this.canBeResolved = true;
      return true;
    }
  }
  
  
  resolve(){
    if (this.conditionValue){
      InstructionsBlockTask.skipBlock();
    }
    LM.interpreter.tasksStack.pop();
    return "";
  }

}