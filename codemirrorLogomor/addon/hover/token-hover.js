CodeMirror.registerHelper("textHover", "logomorMode", function(cm, data, node) {
  var text = '';
  if (data) {
    var token = data.token;
    var tokenName = (token.string) ? token.string.toLowerCase() : null;
    text += '<b>' + token.type + '</b> ' + tokenName;
    if (tokenName in commandHints) {text += '<br>' + commandHints[tokenName];}
  }
  var result = document.createElement('div');
  result.innerHTML = text;
  return (tokenName in commandHints)? result : null;
});