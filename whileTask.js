




class WhileTask {

  constructor(){
    tasksStack.push(this);
    var art = new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
    this.conditionIndex = currentIndex;
    this.falseCaseIndex = indexOfClosingBracket(currentIndex) + 1;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.conditionSet){
      if (arg != 0){
        //nothing to do 
      } else if (arg == 0){
        currentIndex = this.falseCaseIndex;
        this.canBeResolved = true;
      } else {
        console.log("While Statement invalid condition: ");
        console.log(arg);
      }
      this.conditionSet = true;
      return true;
    } else if (arg === "["){
      return true;
    } else if (arg === "]"){
      currentIndex = this.conditionIndex;
      var art = new ArgumentResolverTask();
      this.conditionSet = false;
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