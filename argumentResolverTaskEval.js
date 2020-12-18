



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
    this.stringArgumentSet = false;
    this.expression = "";
    tasksStack.push(this);
  }

  
  tryToTakeInput(arg){
    
    if (!this.canBeResolved){
      if (arg === ""){
        throwError("Argument resolver was fed with the result of a no return value task");
        return false;
      }
      if (arg.startsWith(":")){
        this.expression += resolveVariable(arg.replace(":", "")).toString();
      } else if (!isNaN(arg)){
        this.expression += arg.toString();
      } else if ((arg.startsWith("\"")) && (this.expression === "")){
        this.expression = arg;
        this.stringArgumentSet = true;
      } else if (arg === "-"){
        this.expression += "- ";
        return true;
      } else {
        return false;
      }
      this.canBeResolved = true;
      return true;
    } else {
      if ((isArithmeticOperator(arg)) && (!this.stringArgumentSet)){
        if (arg === "="){
          this.expression += "==";
        } else {
          this.expression += arg + " ";
        }
        this.canBeResolved = false;
        return true;
      } else {
        return false;
      }
    }
  }
  
  resolve(){
    tasksStack.pop();
    return this.evaluate();      
  }


  evaluate(){
    if (this.stringArgumentSet){
      return this.expression;
    }

    try{
      var ret = eval(this.expression);
      if (isNaN(ret)){
        throw "is NaN: ";
      }
      return Number(ret).toString();
    } catch (err){
      throwError("Invalid argument expression: " + err + this.expression);
      return"";
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