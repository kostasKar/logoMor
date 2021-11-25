



class StaticVariableMakerTask{

  constructor(){
    interpreter.tasksStack.push(this);
    this.canBeResolved = false; 
    this.nameAvailable = false;
    var art = new ArgumentResolverTask();
  }
  
  tryToTakeInput(arg){
    if (!this.nameAvailable){
      if(!arg.startsWith("\"")){
        throwError("Static variable maker invalid variable name literal: " + arg);
        return false;
      }
      this.name = arg.replace("\"", "");
      this.nameAvailable = true;
      var art = new ArgumentResolverTask();
      return true;
    } else if (!this.canBeResolved){
      if (!isNaN(arg) || arg.startsWith("\"")){
        if (!memoryController.staticVariableExists(this.name)){
          memoryController.setNewStaticVariable(this.name, arg);
        }
      }else {
        throwError("Static variable maker invalid argument: " + arg);
        return false;
      }
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
  }
  
  resolve(){
    interpreter.tasksStack.pop();
    return "";
  }

}