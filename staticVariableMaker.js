



class StaticVariableMakerTask{

  constructor(){
    LM.interpreter.tasksStack.push(this);
    this.canBeResolved = false; 
    this.nameAvailable = false;
    var art = new ArgumentResolverTask();
  }
  
  tryToTakeInput(arg){
    if (!this.nameAvailable){
      if(!arg.startsWith("\"")){
        LM.throwError("Static variable maker invalid variable name literal: " + arg);
        return false;
      }
      this.name = arg.replace("\"", "");
      this.nameAvailable = true;
      var art = new ArgumentResolverTask();
      return true;
    } else if (!this.canBeResolved){
      if (!isNaN(arg) || arg.startsWith("\"")){
        if (!LM.memoryController.staticVariableExists(this.name)){
          LM.memoryController.setNewStaticVariable(this.name, arg);
        }
      }else {
        LM.throwError("Static variable maker invalid argument: " + arg);
        return false;
      }
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
  }
  
  resolve(){
    LM.interpreter.tasksStack.pop();
    return "";
  }

}