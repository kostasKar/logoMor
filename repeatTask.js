



class RepeatTask{

  constructor(){
    tasksStack.push(this);
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
        throwError("Invalid repeat execution times: " + arg);
        return false;
      }
      this.totalExecutions = parseInt(arg);
      if (this.totalExecutions <= 0){
        InstructionsBlockTask.skipBlock();
        this.canBeResolved = true;
      } else {
        this.startIndex = currentIndex;
        new InstructionsBlockTask();
      }
      this.totalExecutionsSet = true;
      return true;
    } else {
      this.executionsMade++;
      if (this.executionsMade >= this.totalExecutions){
        this.canBeResolved = true;
      } else {
        currentIndex = this.startIndex;
        new InstructionsBlockTask();
      }
      return false;
    }
  }
  
  resolve(){
    tasksStack.pop();
    return "";
  }
  
} 














class RepCountTask{
  constructor(){
    tasksStack.push(this);
    this.canBeResolved = true;
  }

  tryToTakeInput(){
    return false;
  }

  resolve(){
    tasksStack.pop();
    for (let i = tasksStack.length-1; i>=0; i--){
      if (tasksStack[i].constructor.name === 'RepeatTask'){
        return (tasksStack[i].executionsMade+1).toString();
      }
    }
    return "0";
  }

}