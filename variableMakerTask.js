




  
class VariableMakerTask{

  constructor(){
    interpreter.tasksStack.push(this);
    this.canBeResolved = false; 
    this.nameAvailable = false;
    var art = new ArgumentResolverTask();
  }
  
  tryToTakeInput(arg){
    if (!this.nameAvailable){
      if(!arg.startsWith("\"")){
        throwError("Variable maker invalid variable name literal: " + arg);
        return false;
      }
      this.name = arg.replace("\"", "");
      this.nameAvailable = true;
      var art = new ArgumentResolverTask();
      return true;
    } else if (!this.canBeResolved){
      if (!isNaN(arg) || arg.startsWith("\"")){
        if (getVariableScope(this.name)){
         setVariableValue(this.name, arg);
        } else { //we will define a new variable in the local scope
          if (interpreter.variablesScopeStack.length == 1){ //Check the sliders first if local scope is global scope
            arg = this.checkSliders(arg);
          }
        	interpreter.variablesScopeStack[interpreter.variablesScopeStack.length-1][this.name] = arg;
        }
      } else {
        throwError("Variable maker value invalid argument: " + arg);
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


  checkSliders(value){

    var existingListItem = document.getElementById(this.name+"li");
    if ((existingListItem == null) && !(value.includes("\""))){
      variableManipulatorsSliders.createListItemForVar(this.name, value);
    }

    var existingSlider = document.getElementById(this.name + "slider");
    if (existingSlider == null){
      return value;
    } else {
      return existingSlider.value;
    }

  }

}

function getVariableScope(name){

  var localVariables = interpreter.variablesScopeStack[interpreter.variablesScopeStack.length-1];
  if (name in localVariables){
    return localVariables;
  } else if (name in interpreter.globalVariables){
    return interpreter.globalVariables;
  } else if (name in interpreter.staticVariables){
    return interpreter.staticVariables;
  } else {
    return null;
  }

}

function getVariableValue(name){
  var scope = getVariableScope(name);
    if (scope){
      return scope[name];
    } else {
      throwError("Undefined variable: " + name);
      return ""
    }
}

function setVariableValue(name, value){
  var scope = getVariableScope(name);
    if (scope){
      scope[name] = value;
    } else {
      throwError("Undefined variable: " + name);
    }  
}