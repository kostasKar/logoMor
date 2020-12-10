



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
      if (arg != 0){
        this.conditionValue = true;
        new InstructionsListTask();
      } else if (arg == 0){
        this.conditionValue = false;
        new InstructionsListTask(true);
        new InstructionsListTask();
      }
      this.conditionSet = true;
      return true;
    } else {
      if (this.conditionValue){
        new InstructionsListTask(true);
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