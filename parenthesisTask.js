




class ParenthesisTask {

  constructor(){
     this.canBeResolved = false;
     this.valueSet = false;
     tasksStack.push(this);
     var art = new ArgumentResolverTask();
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
    tasksStack.pop();
    return this.value;
  }
  
}