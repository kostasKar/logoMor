
class ProcedureTask {
  
  constructor(procedurePrototype){
    this.procedureName = procedurePrototype.procedureName;
    this.body = procedurePrototype.body;
    this.bodyLineNumbers = procedurePrototype.bodyLineNumbers;
    this.parameters = procedurePrototype.parameters;
    this.localVariables = {};
    this.returnValue = "";
    
    LM.interpreter.tasksStack.push(this);
    if (this.parameters.length > 0){
      new ArgumentResolverTask();
    } else {
      LM.memoryController.pushScope(this.localVariables);
      this.returnIndex = LM.interpreter.currentIndex + 1;
      this.returnSourceTokens = LM.interpreter.sourceTokens;
      LM.interpreter.sourceTokens = this.body;
      this.returnSourceTokensLineNumbers = LM.interpreter.sourceTokensLineNumbers;
      LM.interpreter.sourceTokensLineNumbers = this.bodyLineNumbers;
      LM.interpreter.currentIndex = 1;
    }
    this.numOfParametersSet = 0;
    this.canBeResolved = false;
    this.waitingReturnValue = false;
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){ 
      return false;
    }
    if (this.numOfParametersSet < this.parameters.length){
      this.localVariables[this.parameters[this.numOfParametersSet]]  = arg;
      this.numOfParametersSet++;
      if (this.numOfParametersSet == this.parameters.length){
        LM.memoryController.pushScope(this.localVariables);
        this.returnIndex = LM.interpreter.currentIndex;
        this.returnSourceTokens = LM.interpreter.sourceTokens;
        LM.interpreter.sourceTokens = this.body;
        this.returnSourceTokensLineNumbers = LM.interpreter.sourceTokensLineNumbers;
        LM.interpreter.sourceTokensLineNumbers = this.bodyLineNumbers;
        LM.interpreter.currentIndex = this.numOfParametersSet + 2;
      } else {
        new ArgumentResolverTask();
      }
      return true;
    } else if (this.waitingReturnValue){
      this.returnValue = arg;
      this.canBeResolved = true;
      this.waitingReturnValue = false;
      return true;
    } else if ((arg === "return") || (arg === "output")){
      this.waitingReturnValue = true;
      new ArgumentResolverTask();
      return true;
    }  else if ((arg === "end") || (arg === "stop")){
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