/* 
  CodeMirror editor setup
 */


var myCodeMirror = (function(){

  var cm = CodeMirror.fromTextArea
  (document.getElementById("sourceCodeTextArea"), {
    mode: "logomorMode",
    theme: "logomor-theme",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: {pairs: "()[]", explode: "[]"},
    tabSize: 2,
    styleActiveLine: true,
    highlightSelectionMatches: { showToken: false, annotateScrollbar: true },
    scrollbarStyle: "overlay",
    indentUnit: 2,
    extraKeys: {
      'Ctrl-;': function (cm) { cm.execCommand('toggleComment') }
    },
    textHover: true,
    hoverDelay: 750,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
  });

  cm.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });

  cm.on("change", function(){sessionStorage.setItem("editorContent", cm.getValue())});

  cm.on("endCompletion", function(){
    var hht = document.getElementById("hintHelpText");
    if (hht) {hht.remove();}
  });

  cm.on("keyup", function (cm, event) {
    if (!cm.state.completionActive && /*Enables keyboard navigation in autocomplete list*/
        String.fromCharCode(event.keyCode).match(/[a-zA-Z]/)) {
      CodeMirror.commands.autocomplete(cm, {completeSingle: false});
    }
  });


  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#f00";
    marker.style.marginLeft = "-2px";
    marker.innerHTML = "●";
    return marker;
  }

  if (sessionStorage.getItem("editorContent")){
    cm.setValue(sessionStorage.getItem("editorContent"));
  }


  CodeMirror.hint.logomor = function (editor) {
    var list = [...logomorMoves, ...logomorKeywords, ...logomorBuiltins];
    var cursor = editor.getCursor();
    var currentLine = editor.getLine(cursor.line);
    var start = cursor.ch;
    var end = start;
    while (end < currentLine.length && /[":\w$]+/.test(currentLine.charAt(end))) ++end;
    while (start && /[":\w$]+/.test(currentLine.charAt(start - 1))) --start;
    var curWord = start != end && currentLine.slice(start, end);
    var regex = new RegExp('^' + curWord, 'i');

    var resultList = (!curWord ? [] : list.filter(function (item) { return item.match(regex);})).sort();
    if ((resultList.length === 1) && (resultList[0].length === curWord.length)){
      resultList = [];
    }

    var result = {
      list: resultList,
      from: CodeMirror.Pos(cursor.line, start),
      to: CodeMirror.Pos(cursor.line, end)
    };

    //do not hint inside comments
    if (currentLine.includes(";")){
      result = {list: [], from: CodeMirror.Pos(cursor.line, start), to: CodeMirror.Pos(cursor.line, end) };
    }

    CodeMirror.on(result, "select", function(completion, Element) {
      var hht = document.getElementById("hintHelpText");
      if (!hht){
        hht = document.createElement("div");
        hht.readOnly = true;
        hht.type = "text";
        hht.id = "hintHelpText";
      }
      hht.style.marginLeft = Element.parentNode.offsetWidth + 2 + "px";
      hht.innerText = commandHints[completion] ? commandHints[completion] : completion;

      cm.addWidget({ch:start , line: cursor.line},hht, false);
    });

    CodeMirror.on(result, "close", function(){
      var hht = document.getElementById("hintHelpText");
      if (hht) {hht.remove();}
    });

    if (result["list"].length === 0){
      var hht = document.getElementById("hintHelpText");
      if (hht) {hht.remove();}
    }

    return result;
  };

  CodeMirror.commands.autocomplete = function (cm, options) {
    CodeMirror.showHint(cm, CodeMirror.hint.logomor, options);
  };

  const resizeObserver = new ResizeObserver(function(){cm.refresh();});
  resizeObserver.observe(document.getElementById('sourceCodeContainer'));

  cm.getWrapperElement().style["font-size"] = "14px"; //redundand but needed for the font sizing functions  below

  //Custom methods for cm:
  cm.increaseEditorFontSize = function(){
    myCodeMirror.getWrapperElement().style["font-size"] = parseInt(myCodeMirror.getWrapperElement().style["font-size"]) + 2 + "px";
    myCodeMirror.refresh();
  }

  cm.decreaseEditorFontSize =  function(){
    myCodeMirror.getWrapperElement().style["font-size"] = parseInt(myCodeMirror.getWrapperElement().style["font-size"]) - 2 + "px";
    myCodeMirror.refresh();
  }

  return cm;

})();




/* 
  Fetch requested source code from uri - Executed right now (mycodeMirror is defined above)
 */
(function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has('code')) {

    myCodeMirror.setValue(atob(urlParams.get('code')));
    window.history.replaceState(null, null, window.location.pathname);
  } else if (urlParams.has('codeid')) {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      myCodeMirror.setValue(this.responseText);
    }
    xhttp.open("GET", "saveEditorText.php?id=" + urlParams.get('codeid'), true);
    xhttp.send();
    window.history.replaceState(null, null, window.location.pathname);
  }
})();





function copySourceCode() {

  //!change this to false to create a link with the whole source code in the uri - server not involved
  const saveToServer = true;

  var sourceCodeText = myCodeMirror.getValue();
  var completeURL = window.location.href.split('?')[0];

  if (saveToServer){
    var uniqueId = Date.now();
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "saveEditorText.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("editorCode=" + encodeURIComponent(sourceCodeText) + "&id=" + encodeURIComponent(uniqueId));
    completeURL= completeURL + "?codeid=" + uniqueId;
  } else {
    if (sourceCodeText !== ""){
      completeURL = completeURL + "?code=" + encodeURIComponent(btoa(sourceCodeText));
    }
  }

  if ((saveToServer) || (completeURL.length < 5000)){
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = completeURL;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Link with source code copied to clipboard");
  } else {
    alert("Source code too long to create share link\nSave and share the source code file instead");
  }
}