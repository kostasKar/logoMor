


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

function throwError(text){
  error = true;
  consolePrintln("Error: " + text);
  consolePrintln("Line number: " + sourceCodeLineOfCurrentIndex());
  stackTrace();
}