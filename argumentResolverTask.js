/*
   ArgumentResolverTask is the task created by any command that expects argument(s).
   It's tryToTakeInput() method can accept variable values (local, global or static), string literals, numbers and operators
   The first argument it consumes is considered the left hand operand of a possible operation.
   Once the task has a left hand operand, it can be resolved, returning its value.
   However, the interpreter will first make sure that the argumentResolverTask can not consume any more inputs before it resolves it
   After the left hand operand, argumentResolverTask can accept an operator (arithmetic or comparison)
   Note: Minus and plus operators are also acceptable as unary operators.
   After accepting an operator, the argumentResolverTask becomes non-resolvable, until it receives another operand
   This process can continue for an arbitrary chained succession of operands and operators, before the initial resolver returns a value to the calling task
   If the task is expecting an operand and the token it receives is not one of the directly consumable cases, it does not consume it and it remains unresolvable
   That token will probably trigger the creation of a command task that produces a return value. Once that task is resolved, 
   it's return value will then be consumable by the argumentResolverTask.
   The precedence of the operators (highest to lowest): [["*", "/"], ["+", "-"], ["<", "<=", ">", ">="], ["="]]
   Among operators of the same precedence, left-to-right associativity is followed
 */

//These are all the allowed operators arranged in descending precedence groups.
// Within each group all operators have equal precedence
const operatorsPrecedence = [["*", "/"],
                             ["+", "-"],
                             ["<", "<=", ">", ">="],
                             ["="]];

const operators = operatorsPrecedence.flat();

class ArgumentResolverTask {
  
  constructor(){
    this.canBeResolved = false;
    this.stringArgumentSet = false;
    this.stringArgumentCanBeSet = true;
    this.negative = false;
    LM.interpreter.tasksStack.push(this);
    this.expression = [];
  }

  
  tryToTakeInput(arg){
    
    if (!this.canBeResolved){
      if (arg === ""){
        LM.throwError("Argument resolver was fed with the result of a no return value task");
        return false;
      }

      if (arg.startsWith(":")){
        arg = LM.memoryController.getVariable(arg.replace(":", ""));
      }

      if (!isNaN(arg)){
        this.expression.push((this.negative)? -Number(arg) : Number(arg));
        this.negative = false;
      } else if ((arg.startsWith("\"")) && (this.stringArgumentCanBeSet)){
        this.expression.push(arg);
        this.stringArgumentSet = true;
      } else if (arg === "-"){ //unary '-'
        this.negative = !this.negative;
        this.stringArgumentCanBeSet = false;
        return true;
      } else if (arg === "+"){ //unary '+'
        this.stringArgumentCanBeSet = false;
        return true;
      } else {
        return false;
      }
      this.stringArgumentCanBeSet = false;
      this.canBeResolved = true;
      return true;
    } else{
      if ((operators.includes(arg)) && (!this.stringArgumentSet)){
        this.expression.push(arg);
        this.canBeResolved = false;
        return true;
      } else {
        return false;
      }
    }
  }
  
  resolve(){
    var ret =  this.evaluateExpressionByPrecedence().toString();     
    LM.interpreter.tasksStack.pop();
    return ret; 
  }

  evaluateExpressionByPrecedence(){
    for(var i = 0; i < operatorsPrecedence.length; i++){
      var opIndex;
      while((opIndex = this.expression.findIndex((element) => operatorsPrecedence[i].includes(element))) !== -1){
        var result = this.doOperation(this.expression[opIndex], this.expression[opIndex-1], this.expression[opIndex+1]);
        this.expression.splice(opIndex-1, 3, result);
      }
    }
    if (this.expression.length !== 1){
      LM.throwError("Invalid final expression: " + this.expression.toString());
    }
    return this.expression[0];
  }

  doOperation(operator, left, right){
    if((isNaN(left)) || (isNaN(right)) || (!operators.includes(operator))){
      LM.throwError("Could not resolve operation: " + left + " " + operator + " " + right);
      return 0;
    }
    switch (operator){
      case "+":  return left + right;
      case "-":  return left - right;
      case "*":  return left * right;
      case "/":  return left / right;
      case "<":  return (left < right)?  1 : 0;
      case ">":  return (left > right)?  1 : 0;
      case "<=": return (left <= right)? 1 : 0;
      case ">=": return (left >= right)? 1 : 0;
      case "=":  return (left == right)? 1 : 0;
      default: 
        LM.throwError("Unimplemented operator: " + operator);
        return 0;
    }
  }

}