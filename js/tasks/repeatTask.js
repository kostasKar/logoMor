



class RepeatTask{

  constructor(){
    LM.interpreter.tasksStack.push(this);
    new ArgumentResolverTask();
    this.totalExecutionsSet = false;
    this.canBeResolved = false;
    this.executionsMade = 0;
  }  

  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.totalExecutionsSet){
      if (isNaN(arg)){
        LM.throwError("Invalid repeat execution times: " + arg);
        return false;
      }
      this.totalExecutions = parseInt(arg);
      if (this.totalExecutions <= 0){
        InstructionsBlockTask.skipBlock();
        this.canBeResolved = true;
      } else {
        this.startIndex = LM.interpreter.currentIndex;
        this.endOfLoopBlockIndex = InstructionsBlockTask.findEndOfBlockIndex();
        new InstructionsBlockTask();
      }
      this.totalExecutionsSet = true;
      return true;
    } else if (arg === "break") {
      LM.interpreter.currentIndex = this.endOfLoopBlockIndex;
      this.canBeResolved = true;
      return false;
    } else if (["return", "output", "stop"].includes(arg)){
      this.canBeResolved = true;
      return false;
    } else {
      this.executionsMade++;
      if (this.executionsMade >= this.totalExecutions){
        this.canBeResolved = true;
      } else {
        LM.interpreter.currentIndex = this.startIndex;
        new InstructionsBlockTask();
      }
      return false;
    }
  }
  
  resolve(){
    LM.interpreter.tasksStack.pop();
    return "";
  }
  
} 














class RepCountTask{
  constructor(){
    LM.interpreter.tasksStack.push(this);
    this.canBeResolved = true;
  }

  tryToTakeInput(){
    return false;
  }

  resolve(){
    LM.interpreter.tasksStack.pop();
    for (let i = LM.interpreter.tasksStack.length-1; i>=0; i--){
      if ((LM.interpreter.tasksStack[i].constructor.name === 'RepeatTask') && (LM.interpreter.tasksStack[i].totalExecutionsSet)){
        return (LM.interpreter.tasksStack[i].executionsMade+1).toString();
      }
    }
    return "0";
  }

}