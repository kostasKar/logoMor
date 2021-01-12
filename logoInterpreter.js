


var initialSourceTokens = {};  //the array of tokens for the whole program
var sourceTokens        //the array of the tokens for the currently executed code body
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


function sourceCodeLineOfCurrentIndex(){

  var sourceCode = myCodeMirror.getValue().toLowerCase();
  var tokenIndex = 0;
  var sourceCodeIndex = 0;
  while (tokenIndex < currentIndex){
    sourceCodeIndex = sourceCode.indexOf(sourceTokens[tokenIndex], sourceCodeIndex);
    tokenIndex++;
  }
  if (currentIndex <  sourceTokens.length){
    sourceCodeIndex = sourceCode.indexOf(sourceTokens[currentIndex], sourceCodeIndex);
  }
  sourceCode = sourceCode.substring(0, sourceCodeIndex);
  return (sourceCode.match(/\n/g)||[]).length + 1;
}

function parseLogo(sourceCode){
  
  if (sourceCode === undefined){
	  sourceCode = myCodeMirror.getValue();
  }
  var sourceCodeTxt = prepareSourceCodeText(sourceCode);
  initialSourceTokens = sourceCodeTxt.trim().split(/[\s]+/);
  initialSourceTokens = initialSourceTokens.filter(function (el) {return el != "";});
  console.log(initialSourceTokens);
  seed = Math.random().toString(36).substring(7);
  procedurePrototypes = {};
  staticVariables = {};
  clearSliders();
  clearListItems();

  startTime = millis();
  startFrame = frameCount;

  if(!isLooping()){
    redraw();
  }
}

function initLogoExecution(){
  sourceTokens = initialSourceTokens;
  currentIndex = 0;
  movesCount = 0;
  seedableRNG = new Math.seedrandom(seed);
  tasksStack = [];
  globalVariables = {};
  variablesScopeStack = [];
  variablesScopeStack.push(globalVariables);
  consoleClear();
  error = false;
}

function executeLogo(){
  var movesLimit = document.getElementById("movesLimitInput").value;
  while (((currentIndex < sourceTokens.length) || (tasksStack.length > 0)) && (!error) && (movesCount < movesLimit)){
    checkNextToken();
  }
  if (movesCount >= movesLimit){
    consolePrintln("Stopped: Reached Moves Limit");
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
      if (tasksStack.length > 1){
        tasksStack.pop();
      } else {
        error = true; //This is either an error, or we can use return to exit execution. So no actual error thrown
        consolePrintln("Returned from execution");
      }
      return;
  } 
  
  //If we got here, it means that a new task has to be created and pushed in the tasks Stack
  checkTaskFactory();
  
}  
