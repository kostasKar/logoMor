


var sourceTokens=[];		//the array of tokens
var currentIndex=0;			//the int index of current token
var tasksStack=[];			//the stack with all the tasks
var globalVariables={};		//an object with all the global variables name-value pairs
var variablesScopeStack=[];	//the stack with the variables scopes
var procedures={};			//an object with all the functions name-object pairs
var seed;				    //the seed for a seedable Random Number Generator		
var seedableRNG;			//a seedable random number generator


function initLogoExecution(){
  currentIndex = 0;
  seedableRNG = new Math.seedrandom(seed);
}


function parseLogo(){
	var sourceCodeTxt = document.getElementById("sourceCode").value;
    sourceTokens = sourceCodeTxt.split(" ");
    console.log(sourceTokens);
    tasksStack = [];
    globalVariables = {};
    variablesScopeStack = [];
    variablesScopeStack.push(globalVariables);
    procedures = {};
    seed = Math.random().toString(36).substring(7);
    console.log(seed);
}

function executeLogo(){
  while ((currentIndex < sourceTokens.length) || (tasksStack.length > 0)){
    checkNextToken();
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
    console.log("Error. Task remains unresolved");
    return;
  }
  
  //Return occurred inside another task inside a proc. So several pops are needed for the proc to 'see' the return command
  if (sourceTokens[currentIndex] === "return"){ 
      tasksStack.pop();
      return;
  } 
  
  //If we got here, it means that a new task has to be created and pushed in the tasks Stack
  checkTaskFactory();
  
}  
