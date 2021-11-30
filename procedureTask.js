
class ProcedureTask {
  
  constructor(procedurePrototype){
    this.body = procedurePrototype.body;
    this.bodyLineNumbers = procedurePrototype.bodyLineNumbers;
    this.numOfParameters = procedurePrototype.numOfParameters;
    this.localVariables = Object.assign({}, procedurePrototype.localVariables);
    this.returnValue = "";
    
    LM.interpreter.tasksStack.push(this);
    if (this.numOfParameters > 0){
      var art = new ArgumentResolverTask();
    } else {
      LM.memoryController.pushScope(this.localVariables);
      this.returnIndex = LM.interpreter.currentIndex + 1;
      this.returnSourceTokens = LM.interpreter.sourceTokens;
      LM.interpreter.sourceTokens = this.body;
      this.returnSourceTokensLineNumbers = LM.interpreter.sourceTokensLineNumbers;
      LM.interpreter.sourceTokensLineNumbers = this.bodyLineNumbers;
      LM.interpreter.currentIndex = 0;
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
        LM.memoryController.pushScope(this.localVariables);
        this.returnIndex = LM.interpreter.currentIndex;
        this.returnSourceTokens = LM.interpreter.sourceTokens;
        LM.interpreter.sourceTokens = this.body;
        this.returnSourceTokensLineNumbers = LM.interpreter.sourceTokensLineNumbers;
        LM.interpreter.sourceTokensLineNumbers = this.bodyLineNumbers;
        LM.interpreter.currentIndex = this.numOfParametersSet + 1;
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
    LM.interpreter.tasksStack.pop();
    LM.memoryController.popScope();
    LM.interpreter.sourceTokens = this.returnSourceTokens;
    LM.interpreter.currentIndex = this.returnIndex;
    LM.interpreter.sourceTokensLineNumbers = this.returnSourceTokensLineNumbers;
    return this.returnValue;
  }
  
}