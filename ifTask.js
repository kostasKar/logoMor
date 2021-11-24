

class IfTask{

  constructor(){
    interpreter.tasksStack.push(this);
    new ArgumentResolverTask();
    this.canBeResolved = false;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){ 
      return false;
    } else {
      if (isNaN(arg)){
        throwError("Invalid if condition: " + arg);
        return false;
      }
      if (arg != 0){
        new InstructionsBlockTask();
      } else {
        InstructionsBlockTask.skipBlock();
      }
      this.canBeResolved = true;
      return true;
    }
  }
  
  resolve(){
    interpreter.tasksStack.pop();
    return "";
  }

}
  