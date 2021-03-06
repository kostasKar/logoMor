


var TasksConstructors = {
  "(":ParenthesisTask,
  "make":VariableMakerTask,
  "static":StaticVariableMakerTask,
  "if":IfTask,
  "ifelse":IfElseTask,
  "repeat":RepeatTask,
  "repcount":RepCountTask,
  "while":WhileTask,
  "until":UntilTask,
  "forward":FdTask,
  "fd":FdTask,
  "back":BkTask,
  "bk":BkTask,
  "right":RtTask,
  "rt":RtTask,
  "left":LtTask,
  "lt":LtTask,
  "up":UpTask,
  "down":DnTask,
  "dn":DnTask,
  "roll_right":RrTask,
  "rr":RrTask,
  "roll_left":RlTask,
  "rl":RlTask,
  "penup":PuTask,
  "pu":PuTask,
  "pendown":PdTask,
  "pd":PdTask,
  "showturtle":ShowTurtleTask,
  "st":ShowTurtleTask,
  "hideturtle":HideTurtleTask,
  "ht":HideTurtleTask,
  "setpensize":SpsTask,
  "sps":SpsTask,
  "settextsize":StsTask,
  "sts":StsTask,
  "color":ColorTask,
  "colorhsb":ColorHSBTask,
  "coloralpha":ColorAlphaTask,
  "home":HomeTask,
  "getx":GetXTask,
  "gety":GetYTask,
  "getz":GetZTask,
  "setx":SetXTask,
  "sety":SetYTask,
  "setz":SetZTask,
  "setxyz":SetXYZTask,
  "print":PrintTask,
  "label":LabelTask,
  "and":AndTask,
  "or":OrTask,
  "not":NotTask,
  "rand":RandTask,
  "random":RandTask,
  "randcrazy":RandCrazyTask,
  "randomcrazy":RandCrazyTask,
  "sqrt":SqrtTask,
  "power":PowTask,
  "pow":PowTask,
  "modulo":ModTask,
  "mod":ModTask,
  "cos":CosTask,
  "sin":SinTask,
  "tan":TanTask,
  "arccos":ArcCosTask,
  "arcsin":ArcSinTask,
  "arctan":ArcTanTask,
  "ln":LnTask,
  "log":LogTask,
  "exp":ExpTask,
  "pi":PiTask,
  "time":TimeTask,
  "frame":FrameTask,
  "int":RoundTask,
  "round":RoundTask,
  "trunc":TruncTask,
  "abs":AbsTask,
  "min":MinTask,
  "max":MaxTask,
  "radtodeg":RadToDegTask,
  "degtorad":DegToRadTask,
  "beginface":BeginShapeTask,
  "endface":EndShapeTask,
  "mousex":MouseXTask,
  "mousey":MouseYTask,
  "mousepressed":MousePressedTask,
  "thing":ThingTask,
  "valueof":ThingTask,
  "increment":IncrementTask,
  "decrement":DecrementTask,
  "point":PointTask,
  "dist":DistTask,
  "word":WordTask,
  "arc":ArcTask,
  "box":BoxTask,
  "sphere":SphereTask,
  "cylinder":CylinderTask,
  "cone":ConeTask,
  "torus":TorusTask,
  "ellipsoid":EllipsoidTask,
  "model":ModelTask,
  "image":ImageTask,
  "sound_play":PlaySoundTask,
  "sound_stop":StopSoundTask,
  "sound_pause":PauseSoundTask,
  "sound_isplaying":IsPLayingSoundTask,
  "sound_settime":SetTimeSoundTask,
  "sound_setvolume":SetVolumeSoundTask,
  "sound_gettime":GetTimeSoundTask,
  "sound_getvolume":GetVolumeSoundTask,
  "keypressed":KeyPressedTask,
  "equals":EqualsTask
}



function checkTaskFactory(){
  var token = sourceTokens[currentIndex];

  if (token in TasksConstructors){
    new TasksConstructors[token];
    currentIndex++;
  } else if (token in procedurePrototypes){
    new ProcedureTask(procedurePrototypes[token]);
    currentIndex++;
  } else if (token === "to"){
    new ProcedurePrototype();
  } else {
    throwError("Invalid token: " + token);
  }
  
}

