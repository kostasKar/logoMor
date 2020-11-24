




//This variable is used to count the moves of the avatar so that we can use it to set a limit
var movesCount;


//The generic command task. Takes any number of float arguments. the number of arguments is given at the constructor
class GenericCommandTaskF  {

   constructor( numOfArgs, countMove = false){
    this.numOfArguments = numOfArgs;
    this.arguments = new Array(this.numOfArguments);
    this.argumentsSet = new Array(this.numOfArguments);
    this.argumentsSet.fill(false);
    this.countMove = countMove;
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
    if (this.countMove){movesCount++;}
    return this.run();
  }
  
  run(){
    return "";
  }
  
  saveArgument(i, arg){
  	if (isNaN(arg)){
  	  consolePrint("Invalid command argument: ");
      consolePrintln(arg);
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

 class NoArgumentMove extends GenericCommandTaskF{constructor() {super(0, true);}}
 class SingleArgumentMove extends GenericCommandTaskF{constructor() {super(1, true);}}
 class ThreeArgumentsMove extends GenericCommandTaskF{constructor() {super(3, true);}}

//Movement related classes
 class FdTask extends SingleArgumentMove {run() { FORWARD(this.arguments[0]); return "";}}
 class BkTask extends SingleArgumentMove {run() { BACKWARD(this.arguments[0]); return "";}}
 class RtTask extends SingleArgumentMove {run() { RIGHTTURN(this.arguments[0]); return "";}}
 class LtTask extends SingleArgumentMove { run() { LEFTTURN(this.arguments[0]); return "";}}
 class UpTask extends SingleArgumentMove { run() { UP(this.arguments[0]); return "";}}
 class DnTask extends SingleArgumentMove { run() { DOWN(this.arguments[0]); return "";}}
 class RrTask extends SingleArgumentMove { run() { ROLLRIGHT(this.arguments[0]); return "";}}
 class RlTask extends SingleArgumentMove { run() { ROLLLEFT(this.arguments[0]); return "";}}
 class SpsTask extends SingleArgumentCommandTask { run() { SETPENSIZE(int(this.arguments[0])); return "";}}
 class ColorTask extends ThreeArgumentsCommandTask { run() { COLOR(parseInt(this.arguments[0]), parseInt(this.arguments[1]), parseInt(this.arguments[2])); return "";}}
 class PdTask extends NoArgumentCommandTask { run() { PENDOWN(); return "";}}
 class PuTask extends NoArgumentCommandTask { run() { PENUP(); return "";}}
 class HmTask extends NoArgumentMove { run() { HOME(); return "";}}
 class GetXTask extends NoArgumentCommandTask { run() { return GETX().toString();}}
 class GetYTask extends NoArgumentCommandTask { run() { return GETY().toString();}}
 class GetZTask extends NoArgumentCommandTask { run() { return GETZ().toString();}}
 class SetXTask extends SingleArgumentMove { run() {SETX(this.arguments[0]); return "";}}
 class SetYTask extends SingleArgumentMove { run() {SETY(this.arguments[0]); return "";}}
 class SetZTask extends SingleArgumentMove { run() {SETZ(this.arguments[0]); return "";}}
 class SetXYZTask extends ThreeArgumentsMove { run() {SETXYZ(this.arguments[0], this.arguments[1], this.arguments[2]); return "";}}


//Output commands:
 class PrintTask extends SingleStringArgumentCommandTask { run(){consolePrintln(this.arguments[0]); return "";}}
 class LabelTask extends SingleStringArgumentCommandTask { run(){LABEL(this.arguments[0]); return "";}}


//Logical commands
 class AndTask extends TwoArgumentsCommandTask { run() {return ((this.arguments[0] != 0) && (this.arguments[1] != 0))? "1" : "0";}}
 class OrTask extends TwoArgumentsCommandTask { run() {return ((this.arguments[0] != 0) || (this.arguments[1] != 0))? "1" : "0";}}
 class NotTask extends SingleArgumentCommandTask { run() {return (this.arguments[0] == 0)? "1" : "0";}}

//Random number generation
 class RandTask extends SingleArgumentCommandTask { run() {return Math.floor(seedableRNG() * this.arguments[0]).toString();}}
 class RandCrazyTask extends SingleArgumentCommandTask { run() {return Math.floor(Math.random() * this.arguments[0]).toString();}}


//Mathematical commands
 class SqrtTask extends SingleArgumentCommandTask { run() {return Math.sqrt(this.arguments[0]).toString();}}
 class PowTask extends TwoArgumentsCommandTask { run() {return Math.pow(this.arguments[0], this.arguments[1]).toString();}}
 class ModTask extends TwoArgumentsCommandTask { run() {return (Math.floor(this.arguments[0]) % Math.floor(this.arguments[1])).toString();}}
 class CosTask extends SingleArgumentCommandTask { run() {return Math.cos(radians(this.arguments[0])).toString();}}
 class SinTask extends SingleArgumentCommandTask { run() {return Math.sin(radians(this.arguments[0])).toString();}}
 class TanTask extends SingleArgumentCommandTask { run() {return Math.tan(radians(this.arguments[0])).toString();}}
 class ArcCosTask extends SingleArgumentCommandTask { run() {return degrees(Math.acos(this.arguments[0])).toString();}}
 class ArcSinTask extends SingleArgumentCommandTask { run() {return degrees(Math.asin(this.arguments[0])).toString();}}
 class ArcTanTask extends SingleArgumentCommandTask { run() {return degrees(Math.atan(this.arguments[0])).toString();}}
 class LnTask extends SingleArgumentCommandTask { run() {return Math.log(this.arguments[0]).toString();}}
 class LogTask extends SingleArgumentCommandTask { run() {return Math.log10(this.arguments[0]).toString();}}
 class ExpTask extends SingleArgumentCommandTask { run() {return Math.exp(this.arguments[0]).toString();}}
 class PiTask extends NoArgumentCommandTask { run() {return Math.PI.toString();}}

//Timing 
class TimeTask extends NoArgumentCommandTask{run(){return (millis()-startTime).toString();}}
class FrameTask extends NoArgumentCommandTask{run(){return (frameCount-startFrame).toString();}}