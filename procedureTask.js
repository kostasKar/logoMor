
class ProcedureTask {
  
  constructor(procedurePrototype){
    this.body = procedurePrototype.body;
    this.numOfParameters = procedurePrototype.numOfParameters;
    this.localVariables = Object.assign({}, procedurePrototype.localVariables);
    this.returnValue = "";
    
    tasksStack.push(this);
    if (this.numOfParameters > 0){
      var art = new ArgumentResolverTask();
    } else {
      variablesScopeStack.push(this.localVariables);
      this.returnIndex = currentIndex + 1;
      this.returnSourceTokens = sourceTokens;
      sourceTokens = this.body;
      currentIndex = 0;
    }
    this.numOfParametersSet = 0;
    this.canBeResolved = false;
    this.waitingReturnValue = false;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){ 
      return false;
    }
    if (this.numOfParametersSet < this.numOfParameters){
      this.localVariables[this.body[this.numOfParametersSet + 1].replace(":", "")]  = arg; 
      this.numOfParametersSet++;
      if (this.numOfParametersSet == this.numOfParameters){
        variablesScopeStack.push(this.localVariables);
        this.returnIndex = currentIndex;
        this.returnSourceTokens = sourceTokens;
        sourceTokens = this.body;
        currentIndex = this.numOfParametersSet + 1;
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
    sourceTokens = this.returnSourceTokens;
    currentIndex = this.returnIndex;
    return this.returnValue;
  }
  
}