



function isArithmeticOperator(token){
  var arithmeticOperators = ["+", "-", "*", "/", "<", ">", "<=", ">=", "="];
  return arithmeticOperators.includes(token);
}


/*
   This version of ArgumentResolverTask creates an expression and then invokes eval() to evaluate it.
   It has the huge advantage that all operators are interpreted by javascript and all the operator precedence and associativity rules apply.
   However, calling eval() slows down the whole process a lot
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