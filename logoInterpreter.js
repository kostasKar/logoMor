

var wholeSourceTokens;   //an array to keep the complete source tokens for reference
var mainSourceTokens = {};  //the array of tokens for the main program
var sourceTokens        //the array of the tokens for the currently executed code body
var mainSourceTokensLineNumbers; //an array that keeps the text line numbers for all the main program tokens
var sourceTokensLineNumbers;  //an array that keeps the text line nimbers for the currently executing body tokens
var currentIndex;			  //the int index of current token
var tasksStack;			    //the stack with all the tasks
var globalVariables;	  //an object with all the global variables name-value pairs
var variablesScopeStack;//the stack with the variables scopes
var staticVariables;    //an object with all ste static variables name-value pairs
var procedurePrototypes;//an object with all the functions name-object pairs
var seed;				        //the seed for the seedable Random Number Generator		
var seedableRNG;			  //a seedable random number generator
var error;              //boolean indicating error in execution
var startTime;          //used for time command
var startFrame;         //used for frame command

function parseLogo(sourceCode){
  
  if (sourceCode === undefined){
	  sourceCode = myCodeMirror.getValue();
  }
  var sourceCodeTxt = prepareSourceCodeText(sourceCode);
  wholeSourceTokens = sourceCodeTxt.trim().split(/[\s]+/).filter(function (el) {return el != "";});
  mainSourceTokensLineNumbers = createLineNumbersArrayForWholeProgram();
  console.log(wholeSourceTokens);
  mainSourceTokens = [...wholeSourceTokens];
  seed = Math.random().toString(36).substring(7);
  procedurePrototypes = {};
  staticVariables = {};
  clearSliders();
  clearListItems();

  startTime = millis();
  startFrame = frameCount;
  errorScroll = false;

  if(!isLooping()){
    redraw();
  }
}

function initLogoExecution(){
  sourceTokens = mainSourceTokens;
  sourceTokensLineNumbers = mainSourceTokensLineNumbers;
  currentIndex = 0;
  movesCount = 0;
  seedableRNG = new Math.seedrandom(seed);
  tasksStack = [];
  globalVariables = {};
  variablesScopeStack = [];
  variablesScopeStack.push(globalVariables);
  consoleClear();
  clearError();
}

function executeLogo(){
  var movesLimit = document.getElementById("movesLimitInput").value;
  while (((currentIndex < sourceTokens.length) || (tasksStack.length > 0)) && (!error) && (movesCount < movesLimit)){
    checkNextToken();
  }
  if (movesCount >= movesLimit){
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
  
  //Return occurred inside another task inside a proc. So several pops are needed for the proc to 'see' the return command
  if (sourceTokens[currentIndex] === "return"){ 
    while ((tasksStack.length > 0) && (tasksStack[tasksStack.length-1].constructor.name !== 'ProcedureTask')){
      tasksStack.pop();
    } 
    if (tasksStack.length === 0){
      error = true; //This is either an error, or we can use return to exit execution. So no actual error thrown
      consolePrintln("Returned from execution");
    }
    return;
  } 
  
  //If we got here, it means that a new task has to be created and pushed in the tasks Stack
  checkTaskFactory();
  
}  
