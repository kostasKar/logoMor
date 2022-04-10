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
    let startIndex = i; //start index at 'to' token
    i++;//skip the 'to'
    if(sourceTokens[i] in LM.interpreter.procedurePrototypes){
      LM.throwError("Redefinition of function with name: " + sourceTokens[i]);
      return;
    }
    if(LM.commandsBuiltins.includes(sourceTokens[i])){
      LM.throwError("Cannot use keyword as function name: " + sourceTokens[i]);
      return;
    }
    this.procedureName = sourceTokens[i];
    i++;//skip the procedure name
    this.parameters = [];
    while (sourceTokens[i].match(":.*")){
      this.parameters.push(sourceTokens[i].replace(":", ""));
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
    LM.interpreter.procedurePrototypes[this.procedureName] = this;
    this.body = sourceTokens.splice(startIndex, (endIndex+1)-startIndex);//cut the body from sourceTokens and put it in body
    this.bodyLineNumbers = LM.interpreter.sourceTokensLineNumbers.splice(startIndex, (endIndex+1)-startIndex);
  }
}