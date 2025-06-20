
LM.throwError = function(text){
  LM.interpreter.setError(true);
  LM.consoleHandler.println("<b>Error:</b> " + text, LM.consoleHandler.style.ERROR);
  LM.consoleHandler.println("Line number: " + LM.interpreter.errorLineNumber);
  LM.consoleHandler.print(LM.interpreter.getStackTrace());
  LM.consoleHandler.println(LM.memoryController.getMemoryTrace());
  LM.codeMirror.addLineClass(LM.interpreter.errorLineNumber - 1, "background", "cm-error-line");
  LM.codeMirror.scrollIntoView({line:LM.interpreter.errorLineNumber - 1, char:1}, 200);
}

LM.clearError = function(){
  if (LM.interpreter.error){
    LM.codeMirror.removeLineClass(LM.interpreter.errorLineNumber - 1, "background", "cm-error-line");
  }
  LM.interpreter.setError(false);
}

