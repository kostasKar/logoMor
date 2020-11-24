



function indexOfClosingBracket(startIndex){
  
  var bracketDepth = 1;
  var i = startIndex;
  
  while(sourceTokens[i] !== "[") {
    i++;
    if (i == sourceTokens.length){
      error = true;
      consolePrintln("Error: Missing '['");
      return 0;
    }
  }
  i++;
  
  while (bracketDepth > 0){
    if (sourceTokens[i] === "[") {bracketDepth++;}
    else if (sourceTokens[i] === "]") {bracketDepth--;}
    i++;
    if (i == sourceTokens.length){
      error = true;
      consolePrintln("Error: Missing ']'");
      return 0;
    }
  }
  return i - 1;
}



class IfTask{

  constructor(){
    tasksStack.push(this);
    var art = new ArgumentResolverTask();
    this.canBeResolved = false;
    this.conditionSet = false;
    this.falseCaseIndex = indexOfClosingBracket(currentIndex);
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
      } else {
        consolePrint("If Statement invalid condition: ");
        consolePrintln(arg);
      }
      this.conditionSet = true;
      return true;
    } else if (arg === "["){
      return true;
    } else if (arg === "]"){
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
  