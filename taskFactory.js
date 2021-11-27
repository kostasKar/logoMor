
var taskFactory = {

  checkToken: function(token){

    if ((token in logomorCommands) && (logomorCommands[token].taskConstructor)){
      new logomorCommands[token].taskConstructor;
      interpreter.currentIndex++;
    } else if (token in interpreter.procedurePrototypes){
      new ProcedureTask(interpreter.procedurePrototypes[token]);
      interpreter.currentIndex++;
    } else if (token === "to"){
      new ProcedurePrototype();
    } else {
      throwError("Invalid token: " + token);
    } 

  }

}





