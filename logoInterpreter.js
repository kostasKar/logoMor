

var sourceTokens        //the array of the tokens for the currently executed code body
var sourceTokensLineNumbers;  //an array that keeps the text line nimbers for the currently executing body tokens
var currentIndex;			  //the int index of current token
var tasksStack;			    //the stack with all the tasks
var globalVariables;	  //an object with all the global variables name-value pairs
var variablesScopeStack;//the stack with the variables scopes
var staticVariables;    //an object with all ste static variables name-value pairs
var procedurePrototypes;//an object with all the functions name-object pairs
var error;              //boolean indicating error in execution
var startTime;          //used for time command
var startFrame;         //used for frame command
var returnFromMain;     //used to stop execution of the program with the return statement

function parseLogo(sourceCode = null, setDebugOn = false){
  
  logoParser.parse(sourceCode);

  logoRandomGenerator.initForNewRun();
  procedurePrototypes = {};
  staticVariables = {};
  clearSliders();
  clearListItems();

  startTime = millis();
  startFrame = frameCount;
  clearError();
  logoDebugger.initForNewRun();
  logoDebugger.setEnabled(setDebugOn);

  if(!isLooping()){
    redraw();
  }
}

function initLogoExecution(){
  sourceTokens = logoParser.mainSourceTokens;
  sourceTokensLineNumbers = logoParser.mainSourceTokensLineNumbers;
  currentIndex = 0;
  CommandTask.movesCount = 0;;
  logoRandomGenerator.initForNewFrame();
  tasksStack = [];
  globalVariables = {};
  variablesScopeStack = [];
  variablesScopeStack.push(globalVariables);
  if (!error) {consoleClear();}
  returnFromMain = false;
  logoDebugger.initForNewFrame();
}

function executeLogo(){
  var movesLimit = document.getElementById("movesLimitInput").value;
  while (((currentIndex < sourceTokens.length) || (tasksStack.length > 0)) && (!error) && (!returnFromMain) && (CommandTask.movesCount < movesLimit)){
    checkNextToken();
  }
  if (CommandTask.movesCount >= movesLimit){
    consolePrintln("Stopped: Reached Moves Limit");
    consolePrintln("On line: " + sourceCodeLineOfTokenIndex((currentIndex)? currentIndex - 1 : 0));
  }
}

function checkNextToken(){
  
  //first try to feed the task at the head of the stack with the currently examined token as input. If it consumes it, return to check the next token
  if ((tasksStack.length > 0) && (currentIndex < sourceTokens.length) && (tasksStack[tasksStack.length-1].tryToTakeInput(sourceTokens[currentIndex]))){
    currentIndex++;
    return;
  }
  
  //If the task stack head did not consume the input, check if the task can be resolved. If so, resolve it and feed its result to the following task on the stack
  if ((tasksStack.length > 0) && (tasksStack[tasksStack.length-1].canBeResolved)){
    var ret = tasksStack[tasksStack.length-1].resolve();
    if (tasksStack.length > 0){
      tasksStack[tasksStack.length-1].tryToTakeInput(ret);
    }
    return;
  }
  
  //Here only new tokens should arrive
  if (currentIndex >= sourceTokens.length){
    throwError("Unresolved task expects argument");
    return;
  }

  //check debugger
  if (logoDebugger.isEnabled() && logoDebugger.stoppedNewCommand()){
    returnFromMain = true;
    return;
  }
  
  //Return occurred inside another task inside a proc. So several pops are needed for the proc to 'see' the return command
  if (sourceTokens[currentIndex] === "return"){ 
    while ((tasksStack.length > 0) && (tasksStack[tasksStack.length-1].constructor.name !== 'ProcedureTask')){
      if (tasksStack[tasksStack.length-1].constructor.name === 'ArgumentResolverTask'){
        throwError("return statement inside argument");
        return;
      }
      tasksStack.pop();
    } 
    if (tasksStack.length === 0){
      returnFromMain = true; //This is either an error, or we can use return to exit execution. So no actual error thrown
      consolePrintln("Returned from execution");
    }
    return;
  } 

  //Break occurred, so the most recent loop task must exit, along with all tasks after it
  if(sourceTokens[currentIndex] === "break"){
    while ((tasksStack.length > 0) && (!tasksStack[tasksStack.length-1].hasOwnProperty("endOfLoopBlockIndex"))){
      if (tasksStack[tasksStack.length-1].constructor.name === 'ArgumentResolverTask'){
        throwError("break statement inside argument");
        return;
      }
      tasksStack.pop();
    } 
    if (tasksStack.length === 0){
      throwError("break command occurred outside of loop task");
      return;
    }
    currentIndex = tasksStack[tasksStack.length - 1]["endOfLoopBlockIndex"];
    tasksStack.pop();
    return;
  }

  
  //If we got here, it means that a new task has to be created and pushed in the tasks Stack
  taskFactory.checkToken(sourceTokens[currentIndex]);
  
}  
