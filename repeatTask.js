



class RepeatTask{

  constructor(){
    interpreter.tasksStack.push(this);
    new ArgumentResolverTask();
    this.totalExecutionsSet = false;
    this.canBeResolved = false;
    this.executionsMade = 0;
    this.endOfLoopBlockIndex = InstructionsBlockTask.findEndOfBlockIndex();
  }  

  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.totalExecutionsSet){
      if (isNaN(arg)){
        throwError("Invalid repeat execution times: " + arg);
        return false;
      }
      this.totalExecutions = parseInt(arg);
      if (this.totalExecutions <= 0){
        interpreter.currentIndex = this.endOfLoopBlockIndex;
        this.canBeResolved = true;
      } else {
        this.startIndex = interpreter.currentIndex;
        new InstructionsBlockTask();
      }
      this.totalExecutionsSet = true;
      return true;
    } else {
      this.executionsMade++;
      if (this.executionsMade >= this.totalExecutions){
        this.canBeResolved = true;
      } else {
        interpreter.currentIndex = this.startIndex;
        new InstructionsBlockTask();
      }
      return false;
    }
  }
  
  resolve(){
    interpreter.tasksStack.pop();
    return "";
  }
  
} 














class RepCountTask{
  constructor(){
    interpreter.tasksStack.push(this);
    this.canBeResolved = true;
  }

  tryToTakeInput(){
    return false;
  }

  resolve(){
    interpreter.tasksStack.pop();
    for (let i = interpreter.tasksStack.length-1; i>=0; i--){
      if ((interpreter.tasksStack[i].constructor.name === 'RepeatTask') && (interpreter.tasksStack[i].totalExecutionsSet)){
        return (interpreter.tasksStack[i].executionsMade+1).toString();
      }
    }
    return "0";
  }

}