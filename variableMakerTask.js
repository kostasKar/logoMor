




  
class VariableMakerTask{

  constructor(){
    tasksStack.push(this);
    this.canBeResolved = false; 
    this.nameAvailable = false;
    var art = new ArgumentResolverTask();
  }
  
  tryToTakeInput(arg){
    if (!this.nameAvailable){
      this.name = arg.replace("\"", "");
      this.nameAvailable = true;
      var art = new ArgumentResolverTask();
      return true;
    } else if (!this.canBeResolved){
      if (!isNaN(arg)){
        var varscope = variablesScopeStack[variablesScopeStack.length-1];
        if ((variablesScopeStack.length == 1) && (this.name in varscope === false)){
          arg = this.checkSliders(arg);
        }
      	varscope[this.name] = Number(arg);
      }else {
        console.log("Variable maker value invalid argument: ");
        console.log(arg);
        return false;
      }
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
  }
  
  resolve(){
    tasksStack.pop();
    return "";
  }


  checkSliders(value){

    var existingListItem = document.getElementById(this.name+"li");
    if (existingListItem == null){
      createListItemForVar(this.name, value);
    }

    var existingSlider = document.getElementById(this.name);
    if (existingSlider == null){
      return value;
    } else {
      return existingSlider.value;
    }

  }

}


