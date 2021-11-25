
function throwError(text){
  interpreter.setError(true);
  consoleHandler.println("Error: " + text);
  consoleHandler.println("Line number: " + interpreter.errorLineNumber);
  stackTrace();
  variablesTrace();
  myCodeMirror.addLineClass(interpreter.errorLineNumber - 1, "background", "cm-error-line");
  myCodeMirror.scrollIntoView({line:interpreter.errorLineNumber - 1, char:1}, 200);
}

function clearError(){
  if (interpreter.error){
    myCodeMirror.removeLineClass(interpreter.errorLineNumber - 1, "background", "cm-error-line");
  }
  interpreter.setError(false);
}

function stackTrace(){
  consoleHandler.println("Stack trace (most recent task last):");
  for (let i=0; i<interpreter.tasksStack.length; i++){
    consoleHandler.print("-" + interpreter.tasksStack[i].constructor.name);
    if (interpreter.tasksStack[i].constructor.name === 'ProcedureTask'){
      consoleHandler.println(" " + interpreter.tasksStack[i].body[0]);
    } else {
      consoleHandler.println("");
    }
  }
}

function variablesTrace(){
  consoleHandler.print("\nVariables Info:");
  if(interpreter.variablesScopeStack.length > 1){
    consoleHandler.println("\nLocal variables:");
    for (const [key, value] of Object.entries(interpreter.variablesScopeStack[interpreter.variablesScopeStack.length-1])){
      consoleHandler.print(key + " = " + value + "\n");
    }
  }
  consoleHandler.println("\nGlobal variables:");
  for (const [key, value] of Object.entries(interpreter.globalVariables)){
    consoleHandler.print(key + " = " + value + "\n");
  }
  consoleHandler.println("\nStatic variables:");
  for (const [key, value] of Object.entries(interpreter.staticVariables)){
    consoleHandler.print(key + " = " + value + "\n");
  }

}