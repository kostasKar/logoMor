LM.retainMode = (function(){

  const unretainableTokens = Object.keys(LM.commands).filter(name => LM.commands[name].retainable === false);
  var isRetainable;
  var fireOnce;


  return {

    setForNewSourceTokens: function(sourceTokens) {
      isRetainable = (sourceTokens.findIndex((element) => unretainableTokens.includes(element)) === -1);
      fireOnce = true;
      document.getElementById("retainModeValue").innerText = (isRetainable)? "On" : "Off";
    },

    shouldExecute: function(){
      return ((!isRetainable) || (fireOnce));
    },

    completedExecution(){
      fireOnce = false;
    },

    fireExecution: function(){
      fireOnce = true;
    }

  }

})();