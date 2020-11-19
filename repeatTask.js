



class RepeatTask{

  constructor(){
    tasksStack.push(this);
    var art = new ArgumentResolverTask();
    this.totalExecutionsSet = false;
    this.canBeResolved = false;
    this.executionsMade = 0;
    this.noRepeatsEndIndex = indexOfClosingBracket(currentIndex);
  }  

  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.totalExecutionsSet){
      if (!isNaN(arg)){
        this.totalExecutions = parseInt(arg);
        if (this.totalExecutions <= 0){
          currentIndex = this.noRepeatsEndIndex;
        }
      } else {
        console.log("Repeat block invalid execution times: ");
        console.log(arg);
      }
      this.totalExecutionsSet = true;
      return true;
    } else if (arg === "["){
      this.startIndex = currentIndex;
      return true;
    } else if (arg === "]"){
      this.executionsMade++;
      if (this.executionsMade >= this.totalExecutions){
        this.canBeResolved = true;
      } else {
        currentIndex = this.startIndex;
      }
      return true;
    } else {
      return false;  
    }
  }
  
  resolve(){
    tasksStack.pop();
    return "";
  }
  
} 





