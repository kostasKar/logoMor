

function checkTaskFactory(){

  var token = sourceTokens[currentIndex];
  
  if (token === "fd"){
      var fdt = new FdTask();
      currentIndex++;
      return;
  } else if (token === "rt"){
      var rtt = new RtTask();
      currentIndex++;
      return;
  }

}