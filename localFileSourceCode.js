function download(){
    var text = myCodeMirror.getValue();
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "LogoMorSourceCode" + getFormattedTime() + ".txt";
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
    myCodeMirror.setValue(e.target.result);
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
  anchor.download = "LogoMorScreenshot" + getFormattedTime() + ".png";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target ="_blank";
  anchor.style.display = "none"; // just to be safe!
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}


var chunks;
var videoStream;
var mediaRecorder;
function startRecording(){
  chunks = [];
  var canvas = document.getElementById("defaultCanvas0");
  videoStream = canvas.captureStream(25);

  mediaStreamDest.stream.getAudioTracks().forEach(track => videoStream.addTrack(track));

  mediaRecorder = new MediaRecorder(videoStream);

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = function(e){
    var blob = new Blob(chunks, { 'type' : 'video/mp4' });
    var videoURL = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = "LogoMorVideo" + getFormattedTime() + ".mp4";
    anchor.href = videoURL;
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    videoStream.getVideoTracks().forEach( track => track.stop() ); // stop each of streams
  };

  mediaRecorder.start();
}


function stopRecording(){
  mediaRecorder.stop();
}

var recording = false;
function toggleRecording(){
  if (!recording){
    startRecording();
    document.getElementById("record").firstElementChild.className = "fa fa-stop";
    document.getElementById("record").firstElementChild.style.color = "red";
    recording = true;
  } else {
    stopRecording();
    recording = false;
    document.getElementById("record").firstElementChild.className = "fa fa-video";
    document.getElementById("record").firstElementChild.style.removeProperty("color");
  }
}

function getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear();
    // JavaScript months are 0-based.
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
}



function redrawIfPaused(){
  if (!isLooping()){
    redraw();
  }
}



function togglePause(){
  if (isLooping()){
    document.getElementById("pause").firstElementChild.className = "fa fa-play";
    document.getElementById("pause").firstElementChild.style.color = "lime";
    document.getElementById("autoRotate").disabled = true;
    document.getElementById("turnsHelpArrows").disabled = true;
    noLoop();
  } else {
    document.getElementById("pause").firstElementChild.className = "fa fa-pause";
    document.getElementById("pause").firstElementChild.style.removeProperty("color");
    document.getElementById("autoRotate").disabled = false;
    document.getElementById("turnsHelpArrows").disabled = false;
    loop();
  }
}

function toggleClearDrawing(){
  if (clearDraw){
    clearDraw = false;
    document.getElementById("clearDrawing").firstElementChild.style.color = "red";
  } else {
    clearDraw = true;
    document.getElementById("clearDrawing").firstElementChild.style.removeProperty("color");
  }
}