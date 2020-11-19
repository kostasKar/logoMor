



class IfElseTask {

  constructor(){
    tasksStack.push(this);
    var art = new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
    this.trueBlockClosingBracket = indexOfClosingBracket(currentIndex);
    this.falseBlockClosingBracket = indexOfClosingBracket(this.trueBlockClosingBracket);
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }
    if (!this.conditionSet){
      if (arg != 0){
        //nothing
      } else if (arg == 0){
        currentIndex = this.trueBlockClosingBracket + 1;
      } else {
        console.log("IfElse Statement invalid condition: ");
        console.log(arg);
      }
      this.conditionSet = true;
      return true;
    } else if (arg === "["){
      return true;
    } else if (arg === "]"){
      currentIndex = this.falseBlockClosingBracket;
      this.canBeResolved = true;
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