
//This variable is used to count the moves of the avatar so that we can use it to set a limit
var movesCount;


/*
  Argument types:
  "N" : number
  "S" : string
  "B" : both
 */


//The generic command task. Takes any number of float arguments. the number of arguments is given at the constructor
class CommandTask  {

   constructor( argumentTypes, isMove = false){
    this.argumentTypes = argumentTypes;
    this.arguments =[];
    this.isMove = isMove;
    tasksStack.push(this);
    if (this.argumentTypes.length == 0){
      this.canBeResolved = true;
    } else {
      this.canBeResolved = false;
      new ArgumentResolverTask();
    }
  }
  
  tryToTakeInput(arg){
    if (this.arguments.length < this.argumentTypes.length){
      this.saveArgument(arg);
      if (this.arguments.length == this.argumentTypes.length){
        this.canBeResolved = true;
      } else {
        new ArgumentResolverTask();
      }
      return true;
    } else {
      return false;
    }
  }
  
  resolve(){
    if (this.isMove){movesCount++;}
    var ret =  this.run().toString();
    tasksStack.pop();
    return ret;
  }
  
  run(){
    throwError("command task run() method not implemented");
    return "";
  }
  
  saveArgument(arg){

    switch (this.argumentTypes[this.arguments.length]){

      case "N":
      if (isNaN(arg)){
        throwError("Invalid number command argument: " + arg);
        return;
      }
      arg = Number(arg);
      break;

      case "S":
      if (!arg.startsWith('"')){
        throwError("Invalid literal command argument: " + arg);
        return;
      }
      arg = arg.replace('"', '');
      break;

      case "B":
      arg = arg.replace('"', '');
      break;

    }
    this.arguments.push(arg);
  }
}


//Children classes for specific number of arguments and type, just to avoid writing the constructors for all following command task classes
//Naming convention: CommandTask[number of arguments][type(s) of arguments][M if move]
//The argument type letter is written once if it's the same for all arguments. Else one type letter per argument
//E.g. 2 arguments of type number, move: CommandTask2NM
//E.g. 2 arguments, one literal and one number, not a move: CommandTask2SN
 class CommandTask0   extends CommandTask{constructor() {super([]);}}
 class CommandTask0M  extends CommandTask{constructor() {super([], true);}}
 class CommandTask1N  extends CommandTask{constructor() {super(["N"]);}}
 class CommandTask1NM extends CommandTask{constructor() {super(["N"], true);}}
 class CommandTask1B  extends CommandTask{constructor() {super(["B"]);}}
 class CommandTask1S  extends CommandTask{constructor() {super(["S"]);}}
 class CommandTask2N  extends CommandTask{constructor() {super(["N","N"]);}}
 class CommandTask2B  extends CommandTask{constructor() {super(["B","B"]);}}
 class CommandTask2SN extends CommandTask{constructor() {super(["S","N"]);}}
 class CommandTask3N  extends CommandTask{constructor() {super(["N","N","N"]);}}
 class CommandTask3NM extends CommandTask{constructor() {super(["N","N","N"], true);}}


/*
 * Actual commands tasks. All classes below just inherit the correct parent and implement only their own run()
 */
//Basic Logo commands
 class FdTask extends CommandTask1NM {run() { L_FORWARD(this.arguments[0]); return "";}}
 class BkTask extends CommandTask1NM {run() { L_BACKWARD(this.arguments[0]); return "";}}
 class RtTask extends CommandTask1NM {run() { L_RIGHT(this.arguments[0]); return "";}}
 class LtTask extends CommandTask1NM { run() { L_LEFT(this.arguments[0]); return "";}}
 class UpTask extends CommandTask1NM { run() { L_UP(this.arguments[0]); return "";}}
 class DnTask extends CommandTask1NM { run() { L_DOWN(this.arguments[0]); return "";}}
 class RrTask extends CommandTask1NM { run() { L_ROLLRIGHT(this.arguments[0]); return "";}}
 class RlTask extends CommandTask1NM { run() { L_ROLLLEFT(this.arguments[0]); return "";}}
 class SpsTask extends CommandTask1N { run() { L_SETPENSIZE(int(this.arguments[0])); return "";}}
 class StsTask extends CommandTask1N { run() { L_SETTEXTSIZE(int(this.arguments[0])); return "";}}
 class ColorTask extends CommandTask3N { run() { L_COLOR(parseInt(this.arguments[0]), parseInt(this.arguments[1]), parseInt(this.arguments[2])); return "";}}
 class ColorHSBTask extends CommandTask3N { run() { L_COLORHSB(parseInt(this.arguments[0]), parseInt(this.arguments[1]), parseInt(this.arguments[2])); return "";}}
 class ColorAlphaTask extends CommandTask1N{ run() {L_COLORALPHA(parseInt(this.arguments[0])); return "";}}
 class PdTask extends CommandTask0 { run() { L_PENDOWN(); return "";}}
 class PuTask extends CommandTask0 { run() { L_PENUP(); return "";}}
 class ShowTurtleTask extends CommandTask0 { run() { L_SHOWTURTLE(); return "";}} 
 class HideTurtleTask extends CommandTask0 { run() { L_HIDETURTLE(); return "";}} 
 class HomeTask extends CommandTask0M { run() { L_HOME(); return "";}}
 class GetXTask extends CommandTask0 { run() { return L_GETX();}}
 class GetYTask extends CommandTask0 { run() { return L_GETY();}}
 class GetZTask extends CommandTask0 { run() { return L_GETZ();}}
 class SetXTask extends CommandTask1NM { run() {L_SETX(this.arguments[0]); return "";}}
 class SetYTask extends CommandTask1NM { run() {L_SETY(this.arguments[0]); return "";}}
 class SetZTask extends CommandTask1NM { run() {L_SETZ(this.arguments[0]); return "";}}
 class SetXYZTask extends CommandTask3NM { run() {L_SETXYZ(this.arguments[0], this.arguments[1], this.arguments[2]); return "";}}
 class PointTask extends CommandTask0{ run() {L_POINT(); return "";}}
 class DistTask extends CommandTask3N{ run() {return L_DIST(this.arguments[0], this.arguments[1], this.arguments[2]);}}
 class ArcTask extends CommandTask2N{ run() {L_ARC(this.arguments[0], this.arguments[1]); return "";}}

//Output commands:
 class PrintTask extends CommandTask1B { run(){consolePrintln(this.arguments[0].replace(/\\s/g, " ")); return "";}}
 class LabelTask extends CommandTask1B { run(){L_LABEL(this.arguments[0].replace(/\\s/g, " ")); return "";}}

//Logical commands
 class AndTask extends CommandTask2N { run() {return ((this.arguments[0] != 0) && (this.arguments[1] != 0))? "1" : "0";}}
 class OrTask extends CommandTask2N { run() {return ((this.arguments[0] != 0) || (this.arguments[1] != 0))? "1" : "0";}}
 class NotTask extends CommandTask1N { run() {return (this.arguments[0] == 0)? "1" : "0";}}

//Random number generation
 class RandTask extends CommandTask1N { run() {return Math.floor(seedableRNG() * this.arguments[0]);}}
 class RandCrazyTask extends CommandTask1N { run() {return Math.floor(Math.random() * this.arguments[0]);}}

//Mathematical commands
 class SqrtTask extends CommandTask1N { run() {return Math.sqrt(this.arguments[0]);}}
 class PowTask extends CommandTask2N { run() {return Math.pow(this.arguments[0], this.arguments[1]);}}
 class ModTask extends CommandTask2N { run() {return (Math.floor(this.arguments[0]) % Math.floor(this.arguments[1]));}}
 class CosTask extends CommandTask1N { run() {return Math.cos(radians(this.arguments[0]));}}
 class SinTask extends CommandTask1N { run() {return Math.sin(radians(this.arguments[0]));}}
 class TanTask extends CommandTask1N { run() {return Math.tan(radians(this.arguments[0]));}}
 class ArcCosTask extends CommandTask1N { run() {return degrees(Math.acos(this.arguments[0]));}}
 class ArcSinTask extends CommandTask1N { run() {return degrees(Math.asin(this.arguments[0]));}}
 class ArcTanTask extends CommandTask1N { run() {return degrees(Math.atan(this.arguments[0]));}}
 class LnTask extends CommandTask1N { run() {return Math.log(this.arguments[0]);}}
 class LogTask extends CommandTask1N { run() {return Math.log10(this.arguments[0]);}}
 class ExpTask extends CommandTask1N { run() {return Math.exp(this.arguments[0]);}}
 class PiTask extends CommandTask0 { run() {return Math.PI;}}
 class RoundTask extends CommandTask1N { run() {return Math.round(this.arguments[0]);}}
 class TruncTask extends CommandTask1N { run() {return Math.trunc(this.arguments[0]);}} 
 class AbsTask extends CommandTask1N { run() {return Math.abs(this.arguments[0]);}}
 class MinTask extends CommandTask2N { run() {return Math.min(this.arguments[0], this.arguments[1]);}}
 class MaxTask extends CommandTask2N { run() {return Math.max(this.arguments[0], this.arguments[1]);}}
 class RadToDegTask extends CommandTask1N { run() {return degrees(this.arguments[0]);}}
 class DegToRadTask extends CommandTask1N { run() {return radians(this.arguments[0]);}}

//Timing 
class TimeTask extends CommandTask0{run(){return ((millis()-startTime)/1000);}}
class FrameTask extends CommandTask0{run(){return (frameCount-startFrame);}}

//3d solids
class BeginShapeTask extends CommandTask0{run(){L_BEGINSHAPE(); return "";}}
class EndShapeTask extends CommandTask0{run(){L_ENDSHAPE(); return "";}}

//mouse tasks
class MouseXTask extends CommandTask0{run(){return L_MOUSEX();}}
class MouseYTask extends CommandTask0{run(){return L_MOUSEY();}}
class MousePressedTask extends CommandTask0{run(){return L_MOUSEPRESSED()? "1" : "0";}}

//Variable manipulation tasks
class ThingTask extends CommandTask1S{run(){return getVariableValue(this.arguments[0]);}}
class IncrementTask extends CommandTask1S{run(){setVariableValue(this.arguments[0], Number(getVariableValue(this.arguments[0])) + 1); return "";}}
class DecrementTask extends CommandTask1S{run(){setVariableValue(this.arguments[0], Number(getVariableValue(this.arguments[0])) - 1); return "";}}

//Literals concatenation
class WordTask extends CommandTask2B{run(){return '"' + this.arguments[0] + this.arguments[1];}}

//3D Primitives
class BoxTask extends CommandTask1N{run(){L_BOX(this.arguments[0]); return "";}}
class SphereTask extends CommandTask1N{run(){L_SPHERE(this.arguments[0]); return "";}}
class CylinderTask extends CommandTask2N{run(){L_CYLINDER(this.arguments[0], this.arguments[1]); return "";}}
class ConeTask extends CommandTask2N{run(){L_CONE(this.arguments[0], this.arguments[1]); return "";}}
class TorusTask extends CommandTask2N{run(){L_TORUS(this.arguments[0], this.arguments[1]); return "";}}
class EllipsoidTask extends CommandTask3N{run(){L_ELLIPSOID(this.arguments[0], this.arguments[1], this.arguments[2]); return "";}}

//Models
class ModelTask extends CommandTask2SN { run() {L_MODEL(this.arguments[0], this.arguments[1]); return "";}}

//Images
class ImageTask extends CommandTask2SN { run() {L_IMAGE(this.arguments[0], this.arguments[1]); return "";}}

//Sounds
class PlaySoundTask extends CommandTask1S { run() {L_PLAYSOUND(this.arguments[0]); return "";}}
class StopSoundTask extends CommandTask1S { run() {L_STOPSOUND(this.arguments[0]); return "";}}
class PauseSoundTask extends CommandTask1S { run() {L_PAUSESOUND(this.arguments[0]); return "";}}
class IsPLayingSoundTask extends CommandTask1S { run() {return L_IS_PLAYINGSOUND(this.arguments[0]);}}
class GetTimeSoundTask extends CommandTask1S { run() {return L_GET_TIME_SOUND(this.arguments[0]);}}
class GetVolumeSoundTask extends CommandTask1S { run() {return L_GET_VOLUME_SOUND(this.arguments[0]);}}
class SetTimeSoundTask extends CommandTask2SN { run() {L_SET_TIME_SOUND(this.arguments[0], this.arguments[1]); return "";}}
class SetVolumeSoundTask extends CommandTask2SN { run() {L_SET_VOLUME_SOUND(this.arguments[0], this.arguments[1]); return "";}}

//Keyboard
class KeyPressedTask extends CommandTask0{run(){return L_KEY_PRESSED();}}
