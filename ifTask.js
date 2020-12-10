

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
      if (arg != 0){
        new InstructionsListTask();
      } else if (arg == 0){
        new InstructionsListTask(true);
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
  