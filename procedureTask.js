
class ProcedureTask {
  
  constructor(procedurePrototype){
    this.body = procedurePrototype.body;
    this.bodyLineNumbers = procedurePrototype.bodyLineNumbers;
    this.numOfParameters = procedurePrototype.numOfParameters;
    this.localVariables = Object.assign({}, procedurePrototype.localVariables);
    this.returnValue = "";
    
    interpreter.tasksStack.push(this);
    if (this.numOfParameters > 0){
      var art = new ArgumentResolverTask();
    } else {
      interpreter.variablesScopeStack.push(this.localVariables);
      this.returnIndex = interpreter.currentIndex + 1;
      this.returnSourceTokens = interpreter.sourceTokens;
      interpreter.sourceTokens = this.body;
      this.returnSourceTokensLineNumbers = interpreter.sourceTokensLineNumbers;
      interpreter.sourceTokensLineNumbers = this.bodyLineNumbers;
      interpreter.currentIndex = 0;
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
        interpreter.variablesScopeStack.push(this.localVariables);
        this.returnIndex = interpreter.currentIndex;
        this.returnSourceTokens = interpreter.sourceTokens;
        interpreter.sourceTokens = this.body;
        this.returnSourceTokensLineNumbers = interpreter.sourceTokensLineNumbers;
        interpreter.sourceTokensLineNumbers = this.bodyLineNumbers;
        interpreter.currentIndex = this.numOfParametersSet + 1;
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
    interpreter.tasksStack.pop();
    interpreter.variablesScopeStack.pop();
    interpreter.sourceTokens = this.returnSourceTokens;
    interpreter.currentIndex = this.returnIndex;
    interpreter.sourceTokensLineNumbers = this.returnSourceTokensLineNumbers;
    return this.returnValue;
  }
  
}