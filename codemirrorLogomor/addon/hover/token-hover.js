CodeMirror.registerHelper("textHover", "logomorMode", function(cm, data, node) {
  var text = '';
  if (data) {
    var token = data.token;
    var tokenName = (token.string) ? token.string.toLowerCase() : null;
    text += 'type: ' + token.type;
    if (tokenName in commandHints) {text += '\ndescription: ' + commandHints[tokenName];}
  }
  var result = document.createElement('div');
  result.innerText = text;
  return (tokenName in commandHints)? result : null;
});