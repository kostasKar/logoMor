LM.waitHandler = (function(){

  let activeWaitCommandIndex = 0;
  let activeWaitCommandEndTime = 0;
  let currentWaitCommandIndex = 0;

  return {

    initForNewFrame: function(){
      currentWaitCommandIndex = 0;
    },

    initForNewRun: function(){
      activeWaitCommandIndex = 0;
      activeWaitCommandEndTime = 0;
    },

    handleCommand: function(periodMs){
      if (currentWaitCommandIndex === activeWaitCommandIndex){
        if (activeWaitCommandEndTime === 0) { //first appearance
          activeWaitCommandEndTime = Date.now() + periodMs;
        }
        if (Date.now() < activeWaitCommandEndTime){ //still waiting
          LM.interpreter.returnFromMain = true;
        } else { //just finished waiting
          activeWaitCommandEndTime = 0;
          activeWaitCommandIndex++;
          currentWaitCommandIndex++;
        }
      } else {
        currentWaitCommandIndex++;
      }
    }

  }

})();

