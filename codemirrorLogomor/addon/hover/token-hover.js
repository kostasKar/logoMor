CodeMirror.registerHelper("textHover", "logomorMode", function(cm, data, node) {
  var text = '';
  if (data) {
    var token = data.token;
    var tokenName = (token.string) ? token.string.toLowerCase() : null;
    text += '<b>' + token.type + '</b> ' + tokenName;
    if (hintableCommands.includes(tokenName)) {text += '<br>' + logomorCommands[tokenName].hint;}
    //Easter egg for random number generator:
    if ((tokenName === "rand") || (tokenName === "random")){
    text += "<br>(Current seed: " + logoRandomGenerator.getSeed() + ")";
    }
  }
  var result = document.createElement('div');
  result.innerHTML = text;
  return (hintableCommands.includes(tokenName))? result : null;
});