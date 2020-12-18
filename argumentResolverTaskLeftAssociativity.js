



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
   Note: The minus operator is also acceptable as the first argument, for negative values.
   After accepting an operator, the argumentResolverTask becomes non-resolvable, unless it receives another operand
   whose return value will be considered it's right hand operand the value of the initial operand will be updated with the result of the operation
   This process can continue for an arbitrary chained succession of operands and operators, before the initial resolver returns a value to the calling task
   If the task is expecting an operand and the token it receives is not one of the directly consumable cases, it does not consume it and it remains unresolvable
   That token will probably trigger the creation of a command task that produces a return value. Once that task is resolved, 
   it's return value will be then be consumable by the argumentResolverTask.
   This implementation of the argument resolver yields left-to-right associativity for all operators. There is no operation precedence!
 */





class ArgumentResolverTask {
  
  constructor(){
    this.canBeResolved = false;
    this.stringArgumentSet = false;
    this.stringArgumentCanBeSet = true;
    this.negative = false;
    this.operator = "";
    tasksStack.push(this);
  }

  
  tryToTakeInput(arg){
    
    if (!this.canBeResolved){
      if (arg === ""){
        throwError("Argument resolver was fed with the result of a no return value task");
        return false;
      }
      if (!isNaN(arg)){
        this.operand = this.evaluateInput(Number(arg));
      } else if (arg.startsWith(":")){
        this.operand = this.evaluateInput(resolveVariable(arg.replace(":", "")));
      } else if ((arg.startsWith("\"")) && (this.stringArgumentCanBeSet)){
        this.operand = arg;
        this.stringArgumentSet = true;
      } else if (arg === "-"){
        this.negative = !this.negative;
        this.stringArgumentCanBeSet = false;
        return true;
      } else {
        return false;
      }
      this.stringArgumentCanBeSet = false;
      this.canBeResolved = true;
      return true;
    } else{
      if ((isArithmeticOperator(arg)) && (!this.stringArgumentSet)){
        this.operator = arg;
        this.canBeResolved = false;
        return true;
      } else {
        return false;
      }
    }
  }
  
  resolve(){
    tasksStack.pop();
    return this.operand.toString();      
  }


  evaluateInput(input){
    if (this.negative){
      input = -input;
      this.negative = false;
    }

    if (this.operator === ""){
      return input;
    }

    if (this.operator === "+"){
      return (this.operand + input);
    } else if (this.operator === "-"){
      return (this.operand - input);
    } else if (this.operator === "*"){
      return (this.operand * input);
    } else if (this.operator === "/"){
      return (this.operand / input);
    } else if (this.operator === ">"){
      return (this.operand > input) ? 1 : 0;
    } else if (this.operator === "<"){
      return (this.operand < input) ? 1 : 0;
    } else if (this.operator === ">="){
      return (this.operand >= input) ? 1 : 0;
    } else if (this.operator === "<="){
      return (this.operand <= input) ? 1 : 0;
    } else if (this.operator === "="){
      return (this.operand == input) ? 1 : 0;
    } else {
      throwError("Arithmetic resolver cannot resolve operator: " + this.operator);
      return "";
    }
  }

}


function resolveVariable(name){

  var localVariables = variablesScopeStack[variablesScopeStack.length-1];
  if (name in localVariables){
    return localVariables[name];
  } else if (name in globalVariables){
    return globalVariables[name];
  } else if (name in staticVariables){
    return staticVariables[name];
  } else {
    throwError("Undefined variable: " + name);
    return "";
  }

}