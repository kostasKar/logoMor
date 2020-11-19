

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
  } else if (token === "("){
      var pt = new ParenthesisTask();
      currentIndex++;
      return;
  } else if (token === "make"){
      var vmt = new VariableMakerTask();
      currentIndex++;
      return;
  } else if (token === "if"){
      var ift = new IfTask();
      currentIndex++;
      return;
  }

  console.log("Invalid token: ");
  console.log(token);
  throw new Error("Something went badly wrong!");

}