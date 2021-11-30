




class ParenthesisTask {

  constructor(){
     this.canBeResolved = false;
     this.valueSet = false;
     LM.interpreter.tasksStack.push(this);
     new ArgumentResolverTask();
  }
  
  tryToTakeInput(arg){
    if (this.canBeResolved){
      return false;
    }  

    if (!this.valueSet){
      this.value  = arg;
      this.valueSet = true;
      return true;
    } else if (arg === ")"){
      this.canBeResolved = true;
      return true;
    } else {
      return false;
    }
  }
  
  resolve(){
    LM.interpreter.tasksStack.pop();
    return this.value;
  }
  
}