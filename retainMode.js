LM.retainMode = (function(){

  const unretainableTokens = Object.keys(LM.commands).filter(name => LM.commands[name].retainable === false);
  let isRetainable;
  let fireOnce;
  let forcedOn = false;
  let forcedOnFromDebugger = false;

  function updateRetainedModeIndication(){
    if (isRetainable || forcedOn){
      document.getElementById("retainModeValue").innerText = "On";
    } else {
      document.getElementById("retainModeValue").innerText = "Off";
    }
  }

  return {

    setForNewSourceTokens: function(sourceTokens) {
      isRetainable = (sourceTokens.findIndex((element) => unretainableTokens.includes(element)) === -1);
      fireOnce = true;
      updateRetainedModeIndication();
    },

    shouldExecute: function(){
      return ((fireOnce) ||
              ((!isRetainable) && (!forcedOn) && (!forcedOnFromDebugger)));
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
    },

    setForcedOnFromDebugger: function(val){
      forcedOnFromDebugger = val;
    },

    togglePause: function(){
      if (!forcedOn){
        document.getElementById("pause").firstElementChild.className = "fa fa-play";
        document.getElementById("pause").firstElementChild.style.color = "lime";
        forcedOn = true;
        updateRetainedModeIndication();
      } else {
        document.getElementById("pause").firstElementChild.className = "fa fa-pause";
        document.getElementById("pause").firstElementChild.style.removeProperty("color");
        forcedOn = false;
        updateRetainedModeIndication();
      }
    }


  }

})();