



function isArithmeticOperator(token){
  var arithmeticOperators = ["+", "-", "*", "/", "<", ">", "<=", ">=", "="];
  return arithmeticOperators.includes(token);
}



class ArgumentResolverTask {
  
  constructor(){
    this.canBeResolved = false;
    this.leftArgumentAvailable = false;
    this.operatorAvailable = false;
    this.rightArgumentAvailable = false;
    this.stringArgumentSet = false;
    this.stringArgument = "";
    this.leftArgument = "";
    this.rightArgument = "";
    tasksStack.push(this);
    
  }
  
  tryToTakeInput(arg){
    
    if (!this.leftArgumentAvailable){
      if (arg === ""){
        error = true;
        consolePrintln("Error: Argument resolver was fed with the result of a non-number returning task");
        return false;
      }
      var varscope = variablesScopeStack[variablesScopeStack.length-1];
      var globalScope = variablesScopeStack[0];
      if (arg.startsWith(":")){
      	if (arg.replace(":", "") in varscope){
      		this.leftArgument = varscope[arg.replace(":", "")];
      	} else if (arg.replace(":", "") in globalScope){
          this.leftArgument = globalScope[arg.replace(":", "")];
        } else if (arg.replace(":", "") in staticVariables){
          this.leftArgument = staticVariables[arg.replace(":", "")];
        } else {
          error = true;
      		consolePrint("Error: Undefined variable: ");
          consolePrintln(arg.replace(":", ""));
          return false;
      	}
      } else if (arg.startsWith("\"")){
        this.stringArgument = arg;
        this.stringArgumentSet = true;
      } else {
      	if (!isNaN(arg)){
      		this.leftArgument = Number(arg);
      	} else if (arg === "-") { //negative number input with a space between '-' and the number
      		this.leftArgument = 0;
      		this.leftArgumentAvailable = true;
      		this.operator = "-";
      		this.operatorAvailable = true;
      		this.canBeResolved = false;
      		var art = new ArgumentResolverTask();
      		return true;
      	} else {
      		return false;
      	}
      }
      this.leftArgumentAvailable = true;
      this.canBeResolved = true;
      return true;
    } else if (!this.operatorAvailable){
      if ((isArithmeticOperator(arg)) && (!this.stringArgumentSet)){
        this.operator = arg;
        this.operatorAvailable = true;
        this.canBeResolved = false;
        var art = new ArgumentResolverTask();
        return true;
      } else {
        return false;
      }
    } else if (!this.rightArgumentAvailable){
      if (!isNaN(arg)){
      	this.rightArgument = Number(arg);
	  } else {
      error = true;
	  	consolePrint("Error: Invalid right argument: ");
      consolePrintln(arg);
	  }	
      this.rightArgumentAvailable = true;
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
  }
  
  resolve(){
    tasksStack.pop();
    if (!this.operatorAvailable){
      if (this.stringArgumentSet){
        return this.stringArgument;
      } else {
        return this.leftArgument.toString();
      }
    } else {
      if (this.operator === "+"){
        return (this.leftArgument + this.rightArgument).toString();
      } else if (this.operator === "-"){
        return (this.leftArgument - this.rightArgument).toString();
      } else if (this.operator === "*"){
        return (this.leftArgument * this.rightArgument).toString();
      } else if (this.operator === "/"){
        return (this.leftArgument / this.rightArgument).toString();
      } else if (this.operator === ">"){
        return (this.leftArgument > this.rightArgument) ? "1" : "0";
      } else if (this.operator === "<"){
        return (this.leftArgument < this.rightArgument) ? "1" : "0";
      } else if (this.operator === ">="){
        return (this.leftArgument >= this.rightArgument) ? "1" : "0";
      } else if (this.operator === "<="){
        return (this.leftArgument <= this.rightArgument) ? "1" : "0";
      } else if (this.operator === "="){
        return (this.leftArgument == this.rightArgument) ? "1" : "0";
      } else {
        error = true;
        consolePrint("Error: Arithmetic resolver cannot resolve operator: ");
        consolePrintln(this.operator);
        return "";
      }
    }
  }

}