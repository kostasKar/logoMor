

function consolePrintln(text, colorMode = "system"){
  consolePrint(text, colorMode);
  document.getElementById("consoleTextArea").innerHTML += "\n";
}

function consolePrint(text, colorMode = "system"){
  switch (colorMode){
    case "system":
    text = "<span class='system-output'>" +  text + "</span>";
    break;
    case "user":
    break;
  }
  document.getElementById("consoleTextArea").innerHTML += text 
}

function consoleClear(){
  document.getElementById("consoleTextArea").innerHTML = "";
}

function stackTrace(){
  consolePrintln("Stack trace (most recent task last):");
  for (let i=0; i<interpreter.tasksStack.length; i++){
    consolePrint("-" + interpreter.tasksStack[i].constructor.name);
    if (interpreter.tasksStack[i].constructor.name === 'ProcedureTask'){
      consolePrintln(" " + interpreter.tasksStack[i].body[0]);
    } else {
      consolePrintln("");
    }
  }
}

function throwError(text){
  interpreter.setError(true);
  consolePrintln("Error: " + text);
  consolePrintln("Line number: " + interpreter.errorLineNumber);
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

function variablesTrace(){
  consolePrint("\nVariables Info:");
  if(interpreter.variablesScopeStack.length > 1){
    consolePrintln("\nLocal variables:");
    for (const [key, value] of Object.entries(interpreter.variablesScopeStack[interpreter.variablesScopeStack.length-1])){
      consolePrint(key + " = " + value + "\n");
    }
  }
  consolePrintln("\nGlobal variables:");
  for (const [key, value] of Object.entries(interpreter.globalVariables)){
    consolePrint(key + " = " + value + "\n");
  }
  consolePrintln("\nStatic variables:");
  for (const [key, value] of Object.entries(interpreter.staticVariables)){
    consolePrint(key + " = " + value + "\n");
  }

}
