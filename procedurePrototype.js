class ProcedurePrototype {
  
  constructor(){
    if(sourceTokens.length < currentIndex + 3){//there should be at least a token for function name and a token for 'end'
      error = true;
      consolePrintln("Error: Incomplete function definition");
      return;
    }
    procedures[sourceTokens[++currentIndex]] = this;
    this.startIndex = currentIndex++; //start index at name of procedure
    this.localVariables = {};
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
  }
}