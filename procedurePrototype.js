class ProcedurePrototype {
  
  constructor(){
    let i = currentIndex;
    if (tasksStack.length > 0){
      throwError("Cannot define a function inside another task");
      return;
    }
    if(sourceTokens.length < i + 3){//there should be at least a token for function name and a token for 'end'
      throwError("Incomplete function definition");
      return;
    }
    i++;//skip the 'to'
    if(sourceTokens[i] in procedurePrototypes){
      throwError("Redefinition of function with name: " + sourceTokens[i]);
      return;
    }
    if(logomorBuiltins.includes(sourceTokens[i])){
      throwError("Cannot use keyword as function name: " + sourceTokens[i]);
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
        throwError("Missing 'end'");
        return;
      }
    }
    while (sourceTokens[i] !== "end"){
      if ((i == sourceTokens.length) || (sourceTokens[i] === "to")){
        throwError("Missing 'end'");
        return;
      }
      i++;
    }
    let endIndex = i;
    procedurePrototypes[sourceTokens[startIndex]] = this;
    this.body = sourceTokens.splice(startIndex, (endIndex+1)-startIndex);//cut the body from sourceTokens and put it in body
    sourceTokens.splice(currentIndex, 1); //remove 'to'
    this.bodyLineNumbers = sourceTokensLineNumbers.splice(startIndex, (endIndex+1)-startIndex);
    sourceTokensLineNumbers.splice(currentIndex, 1);
  }
}