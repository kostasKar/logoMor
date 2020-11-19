








//The generic command task. Takes any number of float arguments. the number of arguments is given at the constructor
class GenericCommandTaskF  {

   constructor( numOfArgs){
    this.numOfArguments = numOfArgs;
    this.arguments = new Array(this.numOfArguments);
    this.argumentsSet = new Array(this.numOfArguments);
    this.argumentsSet.fill(false);
    tasksStack.push(this);
    if (this.numOfArguments == 0){
      this.canBeResolved = true;
    } else {
      this.canBeResolved = false;
      new ArgumentResolverTask();
    }
  }
  
  tryToTakeInput(arg){
  	var i;
    for (i = 0; i < this.numOfArguments; i++){
      if (this.argumentsSet[i] == false){
        this.saveArgument(i, arg);
        this.argumentsSet[i] = true;
        if (i == this.numOfArguments - 1){
          this.canBeResolved = true;
        } else {
          new ArgumentResolverTask();
        }
        return true;
      }
    }
    return false;
  }
  
  resolve(){
    tasksStack.pop();
    return this.run();
  }
  
  run(){
    return "";
  }
  
  saveArgument(i, arg){
  	if (isNaN(arg)){
  	  console.log("Invalid command argument: ");
      console.log(arg);
      return;
  	}
    this.arguments[i] = arg;
  }
}



//The generic task for commands that accept String arguments
class GenericCommandTaskS extends GenericCommandTaskF {
  constructor(numOfArgs){super(numOfArgs);}
  saveArgument(i, arg){
    this.arguments[i] = arg.replace("\"", "");
  } 
}


//Children classes for specific number of arguments and type, to avoid implementing constructors for all following command task classes
 class NoArgumentCommandTask extends GenericCommandTaskF{constructor() {super(0);}}
 class SingleArgumentCommandTask extends GenericCommandTaskF{constructor() {super(1);}}
 class SingleStringArgumentCommandTask extends GenericCommandTaskS{constructor() {super(1);}}
 class TwoArgumentsCommandTask extends GenericCommandTaskF{constructor() {super(2);}}
 class ThreeArgumentsCommandTask extends GenericCommandTaskF{constructor() {super(3);}}


 class FdTask extends SingleArgumentCommandTask {run() { LOGO_FORWARD(this.arguments[0]); return "";}}
 class RtTask extends SingleArgumentCommandTask {run() { LOGO_RIGHT(this.arguments[0]); return "";}}