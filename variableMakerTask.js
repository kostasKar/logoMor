




  
class VariableMakerTask{

  constructor(){
    LM.interpreter.tasksStack.push(this);
    this.canBeResolved = false; 
    this.nameAvailable = false;
    var art = new ArgumentResolverTask();
  }
  
  tryToTakeInput(arg){
    if (!this.nameAvailable){
      if(!arg.startsWith("\"")){
        LM.throwError("Variable maker invalid variable name literal: " + arg);
        return false;
      }
      this.name = arg.replace("\"", "");
      this.nameAvailable = true;
      var art = new ArgumentResolverTask();
      return true;
    } else if (!this.canBeResolved){
      if (!isNaN(arg) || arg.startsWith("\"")){
        if (LM.memoryController.variableExists(this.name)){
         LM.memoryController.setExistingVariable(this.name, arg);
        } else { //we will define a new variable in the local scope
          if (LM.memoryController.noLocalScopeExists()){ //Check the sliders first if local scope is global scope
            arg = this.checkSliders(arg);
          }
        	LM.memoryController.setNewNonStaticVariable(this.name, arg);
        }
      } else {
        LM.throwError("Variable maker value invalid argument: " + arg);
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


  checkSliders(value){

    var existingListItem = document.getElementById(this.name+"li");
    if ((existingListItem == null) && !(value.includes("\""))){
      LM.variableManipulatorsSliders.createListItemForVar(this.name, value);
    }

    var existingSlider = document.getElementById(this.name + "slider");
    if (existingSlider == null){
      return value;
    } else {
      return existingSlider.value;
    }

  }

}
