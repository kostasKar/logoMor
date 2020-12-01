class ProcedurePrototype {
  
  constructor(){
    let i = currentIndex;
    if(sourceTokens.length < i + 3){//there should be at least a token for function name and a token for 'end'
      error = true;
      consolePrintln("Error: Incomplete function definition");
      return;
    }
    i++;//skip the 'to'
    let startIndex = i; //start index at procedure name
    i++;//skip the procedure name
    this.localVariables = {};
    this.numOfParameters = 0;
    while (sourceTokens[i].match(":.*")){
      this.localVariables[sourceTokens[i].replace(":", "")] = 0.0;
      this.numOfParameters++;
      i++;
      if (i == sourceTokens.length){
        error = true;
        consolePrintln("Error: Missing 'end'");
        return;
      }
    }
    while (sourceTokens[i] !== "end"){
      i++;
      if ((i == sourceTokens.length) || (sourceTokens[i] === "to")){
        error = true;
        consolePrintln("Error: Missing 'end'");
        return;
      }
    }
    let endIndex = i;
    procedurePrototypes[sourceTokens[startIndex]] = this;
    this.body = sourceTokens.splice(startIndex, (endIndex+1)-startIndex);//cut the body from sourceTokens and put it in body
    sourceTokens.splice(currentIndex, 1); //remove 'to'
  }
}