
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
    return this.run().toString();
  }
  
  run(){
    return "";
  }
  
  saveArgument(i, arg){
  	if (isNaN(arg)){
      error = true;
  	  consolePrint("Error: Invalid command argument: ");
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



//Children classes for specific number of arguments and type, just to avoid writing the constructors for all following command task classes
 class NoArgumentCommandTask extends GenericCommandTaskF{constructor() {super(0);}}           // 0 arguments
 class SingleArgumentCommandTask extends GenericCommandTaskF{constructor() {super(1);}}       // 1 argument, number
 class SingleStringArgumentCommandTask extends GenericCommandTaskS{constructor() {super(1);}} // 1 argument, string
 class TwoArgumentsCommandTask extends GenericCommandTaskF{constructor() {super(2);}}         // 2 arguments, numbers
 class ThreeArgumentsCommandTask extends GenericCommandTaskF{constructor() {super(3);}}       // 3 arguments, numbers
 class NoArgumentMove extends GenericCommandTaskF{constructor() {super(0, true);}}            // 0 argument, increment movesCount
 class SingleArgumentMove extends GenericCommandTaskF{constructor() {super(1, true);}}        // 1 argument, numbers, increment movesCount
 class ThreeArgumentsMove extends GenericCommandTaskF{constructor() {super(3, true);}}        // 3 arguments, numbers, increment movesCount 




/*
 * Actual commands tasks. All classes below just inherit the correct parent and implement only their own run()
 */

//Basic Logo commands
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
 class ShowTurtleTask extends NoArgumentCommandTask { run() { SHOWTURTLE(); return "";}} 
 class HideTurtleTask extends NoArgumentCommandTask { run() { HIDETURTLE(); return "";}} 
 class HmTask extends NoArgumentMove { run() { HOME(); return "";}}
 class GetXTask extends NoArgumentCommandTask { run() { return GETX();}}
 class GetYTask extends NoArgumentCommandTask { run() { return GETY();}}
 class GetZTask extends NoArgumentCommandTask { run() { return GETZ();}}
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
 class RandTask extends SingleArgumentCommandTask { run() {return Math.floor(seedableRNG() * this.arguments[0]);}}
 class RandCrazyTask extends SingleArgumentCommandTask { run() {return Math.floor(Math.random() * this.arguments[0]);}}

//Mathematical commands
 class SqrtTask extends SingleArgumentCommandTask { run() {return Math.sqrt(this.arguments[0]);}}
 class PowTask extends TwoArgumentsCommandTask { run() {return Math.pow(this.arguments[0], this.arguments[1]);}}
 class ModTask extends TwoArgumentsCommandTask { run() {return (Math.floor(this.arguments[0]) % Math.floor(this.arguments[1]));}}
 class CosTask extends SingleArgumentCommandTask { run() {return Math.cos(radians(this.arguments[0]));}}
 class SinTask extends SingleArgumentCommandTask { run() {return Math.sin(radians(this.arguments[0]));}}
 class TanTask extends SingleArgumentCommandTask { run() {return Math.tan(radians(this.arguments[0]));}}
 class ArcCosTask extends SingleArgumentCommandTask { run() {return degrees(Math.acos(this.arguments[0]));}}
 class ArcSinTask extends SingleArgumentCommandTask { run() {return degrees(Math.asin(this.arguments[0]));}}
 class ArcTanTask extends SingleArgumentCommandTask { run() {return degrees(Math.atan(this.arguments[0]));}}
 class LnTask extends SingleArgumentCommandTask { run() {return Math.log(this.arguments[0]);}}
 class LogTask extends SingleArgumentCommandTask { run() {return Math.log10(this.arguments[0]);}}
 class ExpTask extends SingleArgumentCommandTask { run() {return Math.exp(this.arguments[0]);}}
 class PiTask extends NoArgumentCommandTask { run() {return Math.PI;}}
 class IntTask extends SingleArgumentCommandTask { run() {return Math.round(this.arguments[0]);}}
 class AbsTask extends SingleArgumentCommandTask { run() {return Math.abs(this.arguments[0]);}}
 class MinTask extends TwoArgumentsCommandTask { run() {return Math.min(this.arguments[0], this.arguments[1]);}}
 class MaxTask extends TwoArgumentsCommandTask { run() {return Math.max(this.arguments[0], this.arguments[1]);}}

//Timing 
class TimeTask extends NoArgumentCommandTask{run(){return ((millis()-startTime)/1000);}}
class FrameTask extends NoArgumentCommandTask{run(){return (frameCount-startFrame);}}

//3d solids
class BeginShapeTask extends NoArgumentCommandTask{run(){BEGINSHAPE(); return "";}}
class EndShapeTask extends NoArgumentCommandTask{run(){ENDSHAPE(); return "";}}

//mouse tasks
class MouseXTask extends NoArgumentCommandTask{run(){return MOUSEX();}}
class MouseYTask extends NoArgumentCommandTask{run(){return MOUSEY();}}
class MousePressedTask extends NoArgumentCommandTask{run(){return MOUSEPRESSED()? "1" : "0";}}