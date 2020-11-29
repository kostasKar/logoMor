function download(){
    var text = document.getElementById("sourceCodeTextArea").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "LogoSourceCode.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
 }


function openFile() {
  document.getElementById('inp').click();
}
function readFile(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('sourceCodeTextArea').value = e.target.result;
  }
  reader.readAsText(file)
}

function saveScreenshot(){
  var canvas = document.getElementById("defaultCanvas0");
  var dataURL = canvas.toDataURL();

  var data = atob( dataURL.substring( "data:image/png;base64,".length ) ),
    asArray = new Uint8Array(data.length);

  for( var i = 0, len = data.length; i < len; ++i ) {
      asArray[i] = data.charCodeAt(i);    
  }
    
  var blob = new Blob([asArray.buffer], { type: "image/png"});
  var anchor = document.createElement("a");
  anchor.download = "LogoScreenshot.png";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target ="_blank";
  anchor.style.display = "none"; // just to be safe!
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}