

class IfTask{

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
        throwError("Invalid if condition: " + arg);
        return false;
      }
      if (arg != 0){
        new InstructionsBlockTask();
      } else if (arg == 0){
        InstructionsBlockTask.skipBlock();
      }
      this.conditionSet = true;
      return true;
    } else {
      this.canBeResolved = true;
      return false;
    }
  }
  
  resolve(){
    tasksStack.pop();
    return "";
  }

}
  