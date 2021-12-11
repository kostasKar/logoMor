LM.waitHandler = (function(){

  let waitingWaitCommandId = 0;
  let currentWaitCommandId = 0;
  let currentWaitCommandStartTime = 0;
  let currentWaitCommandPeriod = 0;

  return {

    initForNewFrame: function(){
      currentWaitCommandId = 0;
    },

    initForNewRun: function(){
      waitingWaitCommandId = 0;
      currentWaitCommandStartTime = 0;
    },

    handleCommand: function(task){
      if (currentWaitCommandId === waitingWaitCommandId){
        if (currentWaitCommandStartTime === 0) { //first appearance
          currentWaitCommandStartTime = Date.now();
          currentWaitCommandPeriod = task.arguments[0] * (1000 / 60);
        }
        if (Date.now() - currentWaitCommandStartTime < currentWaitCommandPeriod){ //still waiting
          LM.interpreter.returnFromMain = true;
        } else { //just finished waiting
          currentWaitCommandStartTime = 0;
          waitingWaitCommandId++;
          currentWaitCommandId++;
        }
      } else {
        currentWaitCommandId++;
      }
    }

  }

})();

