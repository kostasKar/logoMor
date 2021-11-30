class ProcedurePrototype {
  
  constructor(){
    let i = LM.interpreter.currentIndex;
    let sourceTokens = LM.interpreter.sourceTokens;
    if (LM.interpreter.tasksStack.length > 0){
      LM.throwError("Cannot define a function inside another task");
      return;
    }
    if(sourceTokens.length < i + 3){//there should be at least a token for function name and a token for 'end'
      LM.throwError("Incomplete function definition");
      return;
    }
    i++;//skip the 'to'
    if(sourceTokens[i] in LM.interpreter.procedurePrototypes){
      LM.throwError("Redefinition of function with name: " + sourceTokens[i]);
      return;
    }
    if(LM.commandsBuiltins.includes(sourceTokens[i])){
      LM.throwError("Cannot use keyword as function name: " + sourceTokens[i]);
      return;
    }
    let startIndex = i; //start index at procedure name
    i++;//skip the procedure name
    this.localVariables = {};
    this.numOfParameters = 0;
    while (sourceTokens[i].match(":.*")){
      this.localVariables[sourceTokens[i].replace(":", "")] = 0.0;
      this.numOfParameters++;
      i++;
      if (i == sourceTokens.length){
        LM.throwError("Missing 'end'");
        return;
      }
    }
    while (sourceTokens[i] !== "end"){
      if ((i == sourceTokens.length) || (sourceTokens[i] === "to")){
        LM.throwError("Missing 'end'");
        return;
      }
      i++;
    }
    let endIndex = i;
    LM.interpreter.procedurePrototypes[sourceTokens[startIndex]] = this;
    this.body = sourceTokens.splice(startIndex, (endIndex+1)-startIndex);//cut the body from sourceTokens and put it in body
    sourceTokens.splice(LM.interpreter.currentIndex, 1); //remove 'to'
    this.bodyLineNumbers = LM.interpreter.sourceTokensLineNumbers.splice(startIndex, (endIndex+1)-startIndex);
    LM.interpreter.sourceTokensLineNumbers.splice(LM.interpreter.currentIndex, 1);
  }
}