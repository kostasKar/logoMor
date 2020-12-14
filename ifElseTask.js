



class IfElseTask {

  constructor(){
    tasksStack.push(this);
    new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.conditionSet){
      if (isNaN(arg)){
        throwError("Invalid ifelse condition: " + arg);
        return false;
      }
      if (arg != 0){
        this.conditionValue = true;
        new InstructionsBlockTask();
      } else if (arg == 0){
        this.conditionValue = false;
        InstructionsBlockTask.skipBlock();
        new InstructionsBlockTask();
      }
      this.conditionSet = true;
      return true;
    } else {
      if (this.conditionValue){
        InstructionsBlockTask.skipBlock();
      }
      this.canBeResolved = true;
      return false;
    }
  }
  
  
  resolve(){
    tasksStack.pop();
    return "";
  }

}