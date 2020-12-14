



function isArithmeticOperator(token){
  var arithmeticOperators = ["+", "-", "*", "/", "<", ">", "<=", ">=", "="];
  return arithmeticOperators.includes(token);
}


/*
   ArgumentResolverTask is the task created by any command that expects argument(s).
   It's tryToTakeInput() method can accept variable values (local, global or static), string literals, numbers and operators
   The first argument it consumes is considered the left hand operand of a possible operation.
   Once the task has a left hand operand, it can be resolved, returning its value.
   However, the interpreter will first make sure that the argumentResolverTask can not consume any more inputs before it resolves it
   After the left hand operand, argumentResolverTask can accept an operator (arithmetic or comparison)
   Note: The minus operator is also acceptable as the first argument, for negative values. In that case '0' is considered as left-hand operand and '-' as operator
   After accepting an operator, the argumentResolverTask recursively opens another ArgumentResolverTask, 
   whose return value will be considered it's right hand operand and the task will again be resolvable
   This way, an arbitrary number of chained operations can be performed before the initial resolver returns a value to the calling task
   If the task is expecting an operand and the token it receives is not one of the directly consumable cases, it does not consume it and it remains unresolvable
   That token will probably trigger the creation of a command task that produces a return value. Once that task is resolved, 
   it's return value will be then be consumable by the argumentResolverTask.
 */


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
        throwError("Argument resolver was fed with the result of a no return value task");
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
          throwError("Undefined variable: " + arg.replace(":", ""));
          return false;
      	}
      } else if (arg.startsWith("\"")){
        this.stringArgument = arg;
        this.stringArgumentSet = true;
      } else {
      	if (!isNaN(arg)){
      		this.leftArgument = Number(arg);
      	} else if (arg === "-") { //negative number input
      		this.leftArgument = 0;
      		this.leftArgumentAvailable = true;
      		this.operator = "-";
      		this.operatorAvailable = true;
      		this.canBeResolved = false;
      		new ArgumentResolverTask();
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
        new ArgumentResolverTask();
        return true;
      } else {
        return false;
      }
    } else if (!this.rightArgumentAvailable){
      if (!isNaN(arg)){
      	this.rightArgument = Number(arg);
	  } else {
	  	throwError("Invalid right argument: " + arg);
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
        throwError("Arithmetic resolver cannot resolve operator: " + this.operator);
        return "";
      }
    }
  }

}