LM.interpreter = {

  sourceTokens: [],     
  sourceTokensLineNumbers: [],
  currentIndex: 0,
  tasksStack: [],
  procedurePrototypes: {},
  error: false,
  errorLineNumber: 0,     
  startTime: 0, 
  startFrame: 0,         
  returnFromMain: false,
  movesCount: 0,
  movesLimit: 1000,  

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
      LM.throwError("Unresolved task expects argument");
      return;
    }

    //check debugger
    if (LM.debugger.isEnabled() && LM.debugger.stoppedNewCommand()){
      this.returnFromMain = true;
      return;
    }
    
    //Return occurred inside another task inside a proc. So several pops are needed for the proc to 'see' the return command
    if (this.currentToken === "return"){ 
      while ((this.stackLength) && (this.headTask.constructor.name !== 'ProcedureTask')){
        if (this.headTask.constructor.name === 'ArgumentResolverTask'){
          LM.throwError("return statement inside argument");
          return;
        }
        this.tasksStack.pop();
      } 
      if (!this.stackLength){
        this.returnFromMain = true; //This is either an error, or we can use return to exit execution. So no actual error thrown
        LM.consoleHandler.println("Returned from execution");
      }
      return;
    } 

    //Break occurred, so the most recent loop task must exit, along with all tasks after it
    if(this.currentToken === "break"){
      while ((this.stackLength) && (!this.headTask.hasOwnProperty("endOfLoopBlockIndex"))){
        if (this.headTask.constructor.name === 'ArgumentResolverTask'){
          LM.throwError("break statement inside argument");
          return;
        }
        this.tasksStack.pop();
      } 
      if (!this.stackLength){
        LM.throwError("break command occurred outside of loop task");
        return;
      }
      this.currentIndex = this.headTask["endOfLoopBlockIndex"];
      this.tasksStack.pop();
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
    this.startFrame = LM.p5Renderer.frameCount;
    LM.clearError();
    LM.debugger.initForNewRun();
    LM.debugger.setEnabled(setDebugOn);
    this.movesLimit = document.getElementById("movesLimitInput").value;
    LM.p5Renderer.redrawIfPaused();
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
  },

  executeLogo:function(){
    while (((!this.noMoreTokens()) || (this.stackLength)) && (!this.error) && (!this.returnFromMain) && (this.movesCount < this.movesLimit)){
      this.checkNextToken();
    }
    if (this.movesCount >= this.movesLimit){
      LM.consoleHandler.println("Stopped: Reached Moves Limit");
      LM.consoleHandler.println("On line: " + this.sourceTokensLineNumbers[(this.currentIndex)? this.currentIndex - 1 : 0]);
    }
    LM.consoleHandler.update();
  },

  getStackTrace: function(){
    let traceText = "\nStack trace (most recent task last):\n";
    for (let i=0; i<this.tasksStack.length; i++){
      traceText += "  " + this.tasksStack[i].constructor.name.replace("Task", " task");
      if (this.tasksStack[i].constructor.name === 'ProcedureTask'){
        traceText += " <b>" + this.tasksStack[i].body[0] + "</b>\n";
      } else {
        traceText += "\n";
      }
    }
    return traceText;
  }


};



