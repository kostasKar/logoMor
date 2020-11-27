


var TasksConstructors = {
  "(":ParenthesisTask,
  "make":VariableMakerTask,
  "if":IfTask,
  "ifelse":IfElseTask,
  "repeat":RepeatTask,
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
  "setpensize":SpsTask,
  "color":ColorTask,
  "home":HmTask,
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
  "int":IntTask,
  "abs":AbsTask,
  "min":MinTask,
  "max":MaxTask
}



function checkTaskFactory(){
  var token = sourceTokens[currentIndex];

  if (token in TasksConstructors){
    new TasksConstructors[token];
    currentIndex++;
  } else if (token === "to"){
    new ProcedurePrototype();
    currentIndex++;
  } else if (token in procedures){
    new ProcedureTask(procedures[token]);
    currentIndex++;
  } else {
    consolePrint("Invalid token: ");
    consolePrintln(token);
    error = true;
  }
  
}

