


function consolePrintln(text){
  document.getElementById("consoleTextArea").value += text + "\n";
}

function consolePrint(text){
  document.getElementById("consoleTextArea").value += text;
}

function consoleClear(){
  document.getElementById("consoleTextArea").value = "";
}

function stackTrace(){
  consolePrintln("Stack trace (most recent task last):");
  for (let i=0; i<tasksStack.length; i++){
    consolePrint("-" + tasksStack[i].constructor.name);
    if (tasksStack[i].constructor.name === 'ProcedureTask'){
      consolePrintln(" " + tasksStack[i].body[0]);
    } else {
      consolePrintln("");
    }
  }
}

var errorLineNumber;
function throwError(text){
  error = true;
  errorLineNumber = sourceCodeLineOfTokenIndex(currentIndex);
  consolePrintln("Error: " + text);
  consolePrintln("Line number: " + errorLineNumber);
  stackTrace();
  variablesTrace();
  myCodeMirror.addLineClass(errorLineNumber - 1, "background", "cm-error-line");
  myCodeMirror.scrollIntoView({line:errorLineNumber - 1, char:1}, 200);
}

function clearError(){
  if (error){
    myCodeMirror.removeLineClass(errorLineNumber - 1, "background", "cm-error-line");
  }
  error = false;
}

function variablesTrace(){
  consolePrint("\nVariables Info:");
  if(variablesScopeStack.length > 1){
    consolePrintln("\nLocal variables:");
    for (const [key, value] of Object.entries(variablesScopeStack[variablesScopeStack.length-1])){
      consolePrint(key + " = " + value + "\n");
    }
  }
  consolePrintln("\nGlobal variables:");
  for (const [key, value] of Object.entries(globalVariables)){
    consolePrint(key + " = " + value + "\n");
  }
  consolePrintln("\nStatic variables:");
  for (const [key, value] of Object.entries(staticVariables)){
    consolePrint(key + " = " + value + "\n");
  }

}
