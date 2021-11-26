
function throwError(text){
  interpreter.setError(true);
  consoleHandler.println("Error: " + text, "error");
  consoleHandler.println("Line number: " + interpreter.errorLineNumber);
  consoleHandler.print(interpreter.getStackTrace());
  consoleHandler.println(memoryController.getMemoryTrace());
  myCodeMirror.addLineClass(interpreter.errorLineNumber - 1, "background", "cm-error-line");
  myCodeMirror.scrollIntoView({line:interpreter.errorLineNumber - 1, char:1}, 200);
}

function clearError(){
  if (interpreter.error){
    myCodeMirror.removeLineClass(interpreter.errorLineNumber - 1, "background", "cm-error-line");
  }
  interpreter.setError(false);
}

