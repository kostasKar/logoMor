




class UntilTask {

  constructor(){
    tasksStack.push(this);
    new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
    this.conditionIndex = currentIndex + 1;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.conditionSet){
      if (isNaN(arg)){
        error = true;
        consolePrintln("Error: Invalid until condition: " + arg);
        return false;
      }
      if (arg == 0){
        new InstructionsBlockTask(); 
      } else if (arg != 0){
        new InstructionsBlockTask(true);
        this.canBeResolved = true;
      }
      this.conditionSet = true;
      return true;
    } else {
      currentIndex = this.conditionIndex;
      new ArgumentResolverTask();
      this.conditionSet = false;
      return false;
    }
  }
  
  resolve(){
    tasksStack.pop();
    return "";
  }

}