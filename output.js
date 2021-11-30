LM.consoleHandler = (function(){

  const textStyles = ["error", "system", "user"];
  var consoleText = "";
  var previousConsoleText = "";

  function makeStyled(text, style){
    switch (style){
      case "error":
      text = "<span class='error-output'>" +  text + "</span>";
      break;
      case "system":
      text = "<span class='system-output'>" +  text + "</span>";
      break;
      case "user":
      break;
    }
    return text;
  };

  return {

    print: function(text, style = "system"){
      consoleText += makeStyled(text, style);
    },

    println: function(text, style = "system"){
      this.print(text, style);
      consoleText += "<br>";
    },

    clear: function(){
      consoleText = "";
    },

    update: function(){
      if (consoleText !== previousConsoleText){
        document.getElementById("consoleTextArea").innerHTML = consoleText;
        previousConsoleText = consoleText;
      }
    }

  }


})();

