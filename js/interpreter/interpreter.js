LM.interpreter = {

  sourceTokens: [],     
  sourceTokensLineNumbers: [],
  currentIndex: 0,
  tasksStack: [],
  procedurePrototypes: {},
  error: false,
  errorLineNumber: 0,     
  startTime: 0, 
  frameCount: 0,
  returnFromMain: false,
  movesCount: 0,
  previousMovesCount: 0,
  movesLimit: Infinity,
  maxExecutionTime: 3000,
  startExecutionTime: 0,

  get stackLength() {return this.tasksStack.length;},
  get headTask() {return this.tasksStack[this.tasksStack.length - 1];},
  get currentToken() {return this.sourceTokens[this.currentIndex];},
  get noMoreTokens(){return (this.currentIndex >= this.sourceTokens.length);},
  get currentTokenLineNumber(){return (!this.noMoreTokens) ? this.sourceTokensLineNumbers[this.currentIndex] : this.sourceTokensLineNumbers[this.sourceTokensLineNumbers.length - 1];},

  setError: function(errorValue){
    this.error = errorValue;
    if (errorValue){
      this.errorLineNumber = this.currentTokenLineNumber;
    }
  },

  checkNextToken: function(){
    
    //first try to feed the task at the head of the stack with the currently examined token as input. If it consumes it, return to check the next token
    if ((this.stackLength) && (!this.noMoreTokens) && (this.headTask.tryToTakeInput(this.currentToken))){
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
    if (this.noMoreTokens){
      LM.throwError("Unresolved task expects argument");
      return;
    }

    //check debugger
    if (LM.debugger.isEnabled() && LM.debugger.stoppedNewCommand()){
      this.returnFromMain = true;
      return;
    }

    //Exceptional use of 'return' out of a function. Stops execution with a message. No error
    if ((this.currentToken === "return") && (!this.stackLength)){
      this.returnFromMain = true; 
      LM.consoleHandler.println("Returned from execution");
      return;
    }

    //If we got here, it means that a new task has to be created and pushed in the tasks Stack
    this.checkTaskFactory(this.currentToken);
    
  },

  checkTaskFactory: function(token){
    if ((token in LM.commands) && (LM.commands[token].taskConstructor)){
      new LM.commands[token].taskConstructor;
      this.currentIndex++;
    } else if (token in this.procedurePrototypes){
      new ProcedureTask(this.procedurePrototypes[token]);
      this.currentIndex++;
    } else if (token === "to"){
      new ProcedurePrototype();
    } else {
      LM.throwError("Invalid token: " + token);
    }
  },

  setup: function(sourceCode = null, setDebugOn = false){
    LM.parser.parse(sourceCode);
    LM.randomGenerator.initForNewRun();
    this.procedurePrototypes = {};
    LM.memoryController.initStaticVariables();
    LM.variableManipulatorsSliders.clearSliders();
    LM.variableManipulatorsSliders.clearListItems();

    this.startTime = Date.now();
    this.frameCount = 1;
    LM.clearError();
    LM.debugger.initForNewRun();
    LM.debugger.setEnabled(setDebugOn);
    this.movesLimit = document.getElementById("movesLimitInput").value || Infinity;
    LM.sketchBuffer.clear();
    LM.waitHandler.initForNewRun();
  },

  initLogoExecution: function(){
    this.sourceTokens = LM.parser.mainSourceTokens;
    this.sourceTokensLineNumbers = LM.parser.mainSourceTokensLineNumbers;
    this.currentIndex = 0;
    this.movesCount = 0;
    LM.randomGenerator.initForNewFrame();
    this.tasksStack = [];
    LM.memoryController.initNonStaticVariables();
    if (!this.error) {LM.consoleHandler.clear();}
    this.returnFromMain = false;
    LM.debugger.initForNewFrame();
    LM.waitHandler.initForNewFrame();
  },

  executeLogo:function(){
    this.startExecutionTime = Date.now();
    while (((!this.noMoreTokens) || (this.stackLength)) && 
           (!this.error) && 
           (!this.returnFromMain) && 
           (this.movesCount < this.movesLimit) &&
           (Date.now() - this.startExecutionTime < this.maxExecutionTime)){
      this.checkNextToken();
    }

    if (this.movesCount >= this.movesLimit){
      LM.consoleHandler.println("Stopped: Reached Moves Limit");
      LM.consoleHandler.println("On line: " + this.sourceTokensLineNumbers[(this.currentIndex)? this.currentIndex - 1 : 0]);
    }

    if (Date.now() - this.startExecutionTime >= this.maxExecutionTime){
      LM.consoleHandler.println("Stopped: Execution takes too long. Possible infinite loop");
    }

    LM.consoleHandler.update();
    this.updateMovesCount();
    this.frameCount++;
  },

  getStackTrace: function(){
    let traceText = "\nStack trace (most recent task last):\n";
    for (let i=0; i<this.tasksStack.length; i++){
      traceText += "  " + this.tasksStack[i].constructor.name.replace("Task", " task");
      if (this.tasksStack[i].constructor.name === 'ProcedureTask'){
        traceText += " <b>" + this.tasksStack[i].procedureName + "</b>\n";
      } else {
        traceText += "\n";
      }
    }
    return traceText;
  },

  updateMovesCount: function(){
    if (this.movesCount !== this.previousMovesCount){
      document.getElementById("totalMovesValue").innerText = this.movesCount;
      this.previousMovesCount = this.movesCount;
    }
  }


};



