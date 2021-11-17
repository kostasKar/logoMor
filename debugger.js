var breakpointCounter;
var initialBreakPointCounter;
var commandsExecuted;
var commandsLimit;
var debugControl;
var debuggingLine = 0;



function debuggerInitForNewRun(){
  initialBreakPointCounter = 0;
  commandsLimit = 0;
  debugControl = "breakpoint";
}

function debuggerInitForNewFrame(){
  breakpointCounter = initialBreakPointCounter;
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
	initialBreakPointCounter++;
	debugControl = "breakpoint";
}

function breakPointOnToken(){
  var currentLine = sourceCodeLineOfTokenIndex(currentIndex) - 1;
  var lineOfPreviousToken = sourceCodeLineOfTokenIndex(currentIndex-1) - 1;
  return ((myCodeMirror.lineInfo(currentLine) != null) && 
      	  (myCodeMirror.lineInfo(currentLine).gutterMarkers) && 
      		(currentLine != lineOfPreviousToken));
}

function stopOnBreakpoint(){
	if (breakPointOnToken()){
		if (breakpointCounter === 0){
			return true;
		} else {
			breakpointCounter--;
		}
	}
	return false;
}

function stopOnStep(){
	if (commandsExecuted === commandsLimit){
		return true;
	}
}

function debugerStoppedNewCommand(){

	commandsExecuted++;

	if (debugControl === "breakpoint"){
		if(stopOnBreakpoint()){
			commandsLimit = commandsExecuted;
			consolePrintln("Debugger: Stopped on breakpoint");
    	consolePrintln("On line: " + sourceCodeLineOfTokenIndex((currentIndex)? currentIndex : 0));
    	consolePrintln("Next token: " + sourceTokens[currentIndex]);
    	variablesTrace();
    	colorDebuggingLine();
    	document.getElementById("debugContinueButton").disabled = false;
  	  document.getElementById("debugStepButton").disabled = false;
			return true;
		} else {
			return false;
		}
	}

	if (debugControl === "step"){
		if (stopOnStep()){
			consolePrintln("Debugger: Single-stepping");
    	consolePrintln("On line: " + sourceCodeLineOfTokenIndex((currentIndex)? currentIndex: 0));
    	consolePrintln("Next token: " + sourceTokens[currentIndex]);
    	variablesTrace();
    	colorDebuggingLine();
    	document.getElementById("debugContinueButton").disabled = false;
  	  document.getElementById("debugStepButton").disabled = false;
			return true;
		} else {
			return false;
		}
	} 

}

function colorDebuggingLine(){
	debuggingLine =  sourceCodeLineOfTokenIndex(currentIndex) - 1;
	myCodeMirror.addLineClass(debuggingLine, "background", "cm-debug-line");
}

function clearDebuggingLine(){
	myCodeMirror.removeLineClass(debuggingLine, "background", "cm-debug-line");
}







