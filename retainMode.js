LM.retainMode = (function(){

  const unretainableTokens = Object.keys(LM.commands).filter(name => LM.commands[name].retainable === false);
  var isRetainable;
  var fireOnce;
  var forcedOn = false;


  return {

    setForNewSourceTokens: function(sourceTokens) {
      isRetainable = (sourceTokens.findIndex((element) => unretainableTokens.includes(element)) === -1);
      fireOnce = true;
      document.getElementById("retainModeValue").innerText = (isRetainable)? "On" : "Off";
    },

    shouldExecute: function(){
      return ((fireOnce) ||
              ((!isRetainable) && (!forcedOn)));
    },

    completedExecution(){
      fireOnce = false;
    },

    fireExecution: function(){
      fireOnce = true;
    },

    setForcedOn: function(setVal){
      forcedOn = setVal;
    },

    isForcedOn: function(){
      return forcedOn;
    }


  }

})();