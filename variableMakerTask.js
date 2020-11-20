




  
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
    var existingSlider = document.getElementById(this.name);
    if (existingSlider == null){
      var container = document.getElementById("controlsColumn");
      var sliderContainer = document.createElement("div");
      sliderContainer.className  = "sliderContainer";
      var varNameLabel = document.createElement("label");
      varNameLabel.className = "sliderVarName";
      varNameLabel.innerText = this.name;
      var newSlider = document.createElement("input");
      newSlider.id = this.name;
      newSlider.type = "range";
      newSlider.min = "0";
      newSlider.max = 10*value;
      newSlider.value = value;
      newSlider.className  = "slider";
      container.appendChild(sliderContainer);
      sliderContainer.appendChild(varNameLabel);
      sliderContainer.appendChild(newSlider);
      return value;
    } else {
      return existingSlider.value;
    }

  }

}


