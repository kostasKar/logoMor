LM.consoleHandler = (function(){

  const textStyle = {SYSTEM:"system", ERROR:"error", USER:"user"};
  var consoleText = "";
  var previousConsoleText = "";

  function makeStyled(text, style){
    switch (style){
      case textStyle.ERROR:
      text = "<span class='error-output'>" +  text + "</span>";
      break;
      case textStyle.SYSTEM:
      text = "<span class='system-output'>" +  text + "</span>";
      break;
      case textStyle.USER:
      break;
    }
    return text;
  };

  return {

    style: textStyle,

    print: function(text, style = textStyle.SYSTEM){
      consoleText += makeStyled(text, style);
    },

    println: function(text, style = textStyle.SYSTEM){
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

