LM.debugger = (function () {

	var enabled;
	var commandsExecuted;
	var commandsLimit;
	var debugControl;
	var debuggingLine = 0;
	var previousDebuggingLine;

	function breakPointOnToken(){
 		return ((LM.codeMirror.lineInfo(debuggingLine) != null) &&
      	  	(LM.codeMirror.lineInfo(debuggingLine).gutterMarkers) &&
      			(debuggingLine !== previousDebuggingLine));
	}

	function colorDebuggingLine(){
		LM.codeMirror.addLineClass(debuggingLine, "background", "cm-debug-line");
	}

	function clearDebuggingLine(){
		LM.codeMirror.removeLineClass(debuggingLine, "background", "cm-debug-line");
	}

	function showDebuggerOutput(){
		LM.consoleHandler.println("Debugger: Paused on line " + LM.interpreter.currentTokenLineNumber);
		LM.consoleHandler.println("Next token: <b>" + LM.interpreter.currentToken + "</b>");
		LM.consoleHandler.println(LM.memoryController.getMemoryTrace());
		colorDebuggingLine();
		document.getElementById("debugContinueButton").disabled = false;
	  document.getElementById("debugStepButton").disabled = false;
	}

	return {

		setEnabled: function(setValue){
			enabled = setValue;
		},

		isEnabled: function(){
			return enabled;
		},

		initForNewRun: function(){
			commandsLimit = 0;
  		debugControl = "step";
		},

		initForNewFrame: function(){
			commandsExecuted = -1;
		  clearDebuggingLine();
		  document.getElementById("debugContinueButton").disabled = true;
		  document.getElementById("debugStepButton").disabled = true;
		},

		stepPressed: function(){
			commandsLimit++;
			debugControl =  "step";
		},

		continuePressed: function(){
			commandsLimit++;
			debugControl = "breakpoint";
		},

		stoppedNewCommand: function(){

			//function definitions are only parsed on first pass and are not actually commands
			if (LM.interpreter.currentToken === "to"){
				return false;
			}

			commandsExecuted++;
			debuggingLine = LM.interpreter.currentTokenLineNumber - 1;

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

	};

})(); 
