
class ProcedureTask {
  
  constructor(procedurePrototype){
    this.startIndex = procedurePrototype.startIndex;
    this.numOfParameters = procedurePrototype.numOfParameters;
    this.localVariables = {};
    this.localVariables = Object.assign({}, procedurePrototype.localVariables);
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