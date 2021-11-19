var debugOn;
var commandsExecuted;
var commandsLimit;
var debugControl;
var debuggingLine = 0;
var previousDebuggingLine;


function debuggerInitForNewRun(){
  commandsLimit = 0;
  debugControl = "step";
}

function debuggerInitForNewFrame(){
  commandsExecuted = -1;
  clearDebuggingLine();
  document.getElementById("debugContinueButton").disabled = true;
  document.getElementById("debugStepButton").disabled = true;
}

function debuggerStepPressed(){
	commandsLimit++;
	debugControl =  "step";
}

function debuggerContinuePressed(){
	commandsLimit++;
	debugControl = "breakpoint";
}

function breakPointOnToken(){
  return ((myCodeMirror.lineInfo(debuggingLine) != null) && 
      	  (myCodeMirror.lineInfo(debuggingLine).gutterMarkers) && 
      		(debuggingLine != previousDebuggingLine));
}


function debugerStoppedNewCommand(){

	//function definitions are only parsed on first pass and are not actually commands
	if (sourceTokens[currentIndex] === "to"){
		return false;
	}

	commandsExecuted++;

	debuggingLine = sourceCodeLineOfTokenIndex(currentIndex) - 1;

	var ret;
	if ((debugControl === "step") && (commandsExecuted === commandsLimit)){
		showDebuggerOutput();
		ret = true;
	} else if ((debugControl === "breakpoint") && (commandsExecuted >= commandsLimit) && (breakPointOnToken())){
		commandsLimit = commandsExecuted;
		showDebuggerOutput();
		ret = true;
	} else {
		ret = false;
	}

	previousDebuggingLine = debuggingLine;

	return ret;
}

function colorDebuggingLine(){
	myCodeMirror.addLineClass(debuggingLine, "background", "cm-debug-line");
}

function clearDebuggingLine(){
	myCodeMirror.removeLineClass(debuggingLine, "background", "cm-debug-line");
}

function showDebuggerOutput(){
	consolePrintln("Debugger: Paused on line " + sourceCodeLineOfTokenIndex((currentIndex)? currentIndex: 0));
	consolePrintln("Next token: " + sourceTokens[currentIndex]);
	variablesTrace();
	colorDebuggingLine();
	document.getElementById("debugContinueButton").disabled = false;
  document.getElementById("debugStepButton").disabled = false;
}





