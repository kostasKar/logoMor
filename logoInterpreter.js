var interpreter = {

  sourceTokens: [],     
  sourceTokensLineNumbers: [],
  currentIndex: 0,
  tasksStack: [],    
  globalVariables: {},    
  variablesScopeStack: [],
  staticVariables: {},
  procedurePrototypes: {},
  error: false,
  errorLineNumber: 0,     
  startTime: 0, 
  startFrame: 0,         
  returnFromMain: false,     

  get stackLength() {return this.tasksStack.length;},
  get headTask() {return this.tasksStack[this.tasksStack.length - 1];},
  get currentToken() {return this.sourceTokens[this.currentIndex];},
  get currentTokenLineNumber(){return (!this.noMoreTokens()) ? this.sourceTokensLineNumbers[this.currentIndex] : this.sourceTokensLineNumbers[this.sourceTokensLineNumbers.length - 1];},

  noMoreTokens: function() {
    return (this.currentIndex >= this.sourceTokens.length);
  },

  setError: function(errorValue){
    this.error = errorValue;
    if (errorValue){
      this.errorLineNumber = this.currentTokenLineNumber;
    }
  },

  checkNextToken: function(){
    
    //first try to feed the task at the head of the stack with the currently examined token as input. If it consumes it, return to check the next token
    if ((this.stackLength) && (!this.noMoreTokens()) && (this.headTask.tryToTakeInput(this.currentToken))){
      this.currentIndex++;
      return;
    }
    
    //If the task stack head did not consume the input, check if the task can be resolved. If so, resolve it and feed its result to the following task on the stack
    if ((this.stackLength) && (this.headTask.canBeResolved)){
      var ret = this.headTask.resolve();
      if (this.stackLength){
        this.headTask.tryToTakeInput(ret);
      }
      return;
    }
    
    //Here only new tokens should arrive
    if (this.noMoreTokens()){
      throwError("Unresolved task expects argument");
      return;
    }

    //check debugger
    if (logoDebugger.isEnabled() && logoDebugger.stoppedNewCommand()){
      this.returnFromMain = true;
      return;
    }
    
    //Return occurred inside another task inside a proc. So several pops are needed for the proc to 'see' the return command
    if (this.currentToken === "return"){ 
      while ((this.stackLength) && (this.headTask.constructor.name !== 'ProcedureTask')){
        if (this.headTask.constructor.name === 'ArgumentResolverTask'){
          throwError("return statement inside argument");
          return;
        }
        this.tasksStack.pop();
      } 
      if (!this.stackLength){
        this.returnFromMain = true; //This is either an error, or we can use return to exit execution. So no actual error thrown
        consolePrintln("Returned from execution");
      }
      return;
    } 

    //Break occurred, so the most recent loop task must exit, along with all tasks after it
    if(this.currentToken === "break"){
      while ((this.stackLength) && (!this.headTask.hasOwnProperty("endOfLoopBlockIndex"))){
        if (this.headTask.constructor.name === 'ArgumentResolverTask'){
          throwError("break statement inside argument");
          return;
        }
        this.tasksStack.pop();
      } 
      if (this.stackLength){
        throwError("break command occurred outside of loop task");
        return;
      }
      this.currentIndex = this.headTask["endOfLoopBlockIndex"];
      this.tasksStack.pop();
      return;
    }

    
    //If we got here, it means that a new task has to be created and pushed in the tasks Stack
    taskFactory.checkToken(this.currentToken);
    
  },

  set: function(sourceCode = null, setDebugOn = false){
    logoParser.parse(sourceCode);
    logoRandomGenerator.initForNewRun();
    this.procedurePrototypes = {};
    this.staticVariables = {};
    clearSliders();
    clearListItems();

    this.startTime = millis();
    this.startFrame = frameCount;
    clearError();
    logoDebugger.initForNewRun();
    logoDebugger.setEnabled(setDebugOn);

    if(!isLooping()){
      redraw();
    }
  },

  initLogoExecution: function(){
    this.sourceTokens = logoParser.mainSourceTokens;
    this.sourceTokensLineNumbers = logoParser.mainSourceTokensLineNumbers;
    this.currentIndex = 0;
    CommandTask.movesCount = 0;;
    logoRandomGenerator.initForNewFrame();
    this.tasksStack = [];
    this.globalVariables = {};
    this.variablesScopeStack = [];
    this.variablesScopeStack.push(this.globalVariables);
    if (!this.error) {consoleClear();}
    this.returnFromMain = false;
    logoDebugger.initForNewFrame();
  },

  executeLogo:function(){
    var movesLimit = document.getElementById("movesLimitInput").value;
    while (((!this.noMoreTokens()) || (this.stackLength)) && (!this.error) && (!this.returnFromMain) && (CommandTask.movesCount < movesLimit)){
      this.checkNextToken();
    }
    if (CommandTask.movesCount >= movesLimit){
      consolePrintln("Stopped: Reached Moves Limit");
      consolePrintln("On line: " + sourceTokensLineNumbers[(currentIndex)? currentIndex - 1 : 0]);
    }
  }   


};



