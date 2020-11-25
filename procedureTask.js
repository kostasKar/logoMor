
class ProcedureTask {
  
  constructor(copyFromProcedure){
    if (copyFromProcedure === undefined){ //called by the word "TO" - local manipulation of currentIndex to navigate out of the procedure definition
      if(sourceTokens.length < currentIndex + 3){//there should be at least a token for function name and a token for 'end'
        error = true;
        consolePrintln("Error: Incomplete function definition");
        return;
      }
      procedures[sourceTokens[++currentIndex]] = this;
      this.startIndex = currentIndex++; //start index at name of procedure
      this.localVariables = {};
      this.returnValue = "";
      this.numOfParameters = 0;
      while (sourceTokens[currentIndex].match(":.*")){
        this.localVariables[sourceTokens[currentIndex].replace(":", "")] = 0.0;
        this.numOfParameters++;
        currentIndex++;
        if (currentIndex == sourceTokens.length){
          error = true;
          consolePrintln("Error: Missing 'end'");
          return;
        }
      }
      while (sourceTokens[currentIndex] !== "end"){

        currentIndex++;
        if ((currentIndex == sourceTokens.length) || (sourceTokens[currentIndex] === "to")){
          error = true;
          consolePrintln("Error: Missing 'end'");
          return;
        }
      }
    } else {//CCtor. Called every time the function name is found in the code and we want to call it, based on the prototype object found in procedures list
      this.startIndex = copyFromProcedure.startIndex;
      this.numOfParameters = copyFromProcedure.numOfParameters;
      this.localVariables = {};
      this.localVariables = Object.assign({}, copyFromProcedure.localVariables);
      this.returnValue = "";
      
      tasksStack.push(this);
      if (this.numOfParameters > 0){
        var art = new ArgumentResolverTask();
      } else {
        variablesScopeStack.push(this.localVariables);
        this.returnIndex = currentIndex + 1;
        currentIndex = this.startIndex;
      }
      this.numOfParametersSet = 0;
      this.canBeResolved = false;
      this.waitingReturnValue = false;
    }
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){ 
      return false;
    }
    if (this.numOfParametersSet < this.numOfParameters){
      this.localVariables[sourceTokens[this.startIndex + this.numOfParametersSet + 1].replace(":", "")]  = Number(arg); 
      this.numOfParametersSet++;
      if (this.numOfParametersSet == this.numOfParameters){
        this.returnIndex = currentIndex;
        currentIndex = this.startIndex + this.numOfParametersSet + 1;
        variablesScopeStack.push(this.localVariables);
      } else {
        var art = new ArgumentResolverTask();
      }
      return true;
    } else if (this.waitingReturnValue){
      this.returnValue = arg;
      this.canBeResolved = true;
      this.waitingReturnValue = false;
      return true;
    } else if (arg === "return"){
      this.waitingReturnValue = true;
      var art = new ArgumentResolverTask();
      return true;
    }  else if (arg === "end"){
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
    
  }
  
  resolve(){
    tasksStack.pop();
    variablesScopeStack.pop();
    currentIndex = this.returnIndex;
    return this.returnValue;
  }
  
}