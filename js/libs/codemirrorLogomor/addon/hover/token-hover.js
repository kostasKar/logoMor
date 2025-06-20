CodeMirror.registerHelper("textHover", "logomorMode", function(cm, data, node) {
  var text = '';
  if (data) {
    var token = data.token;
    var tokenName = (token.string) ? token.string.toLowerCase() : null;
    text += '<b>' + token.type + '</b> ' + tokenName;
    if (LM.commandsHintables.includes(tokenName)) {text += '<br>' + LM.commands[tokenName].hint;}
    //Easter egg for random number generator:
    if ((tokenName === "rand") || (tokenName === "random")){
    text += "<br>(Current seed: " + LM.randomGenerator.getSeed() + ")";
    }
  }
  var result = document.createElement('div');
  result.innerHTML = text;
  return (LM.commandsHintables.includes(tokenName))? result : null;
});