var labelFont;

function preload() {
  //uncomment to deploy online
  //labelFont = loadFont('assets/Inconsolata.otf');
}



var canvas;

function setup() {
  setAttributes('antialias', true);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('drawCanvas');
  cameraViewControl.initialize();
  canvas.doubleClicked(cameraViewControl.reset);
  canvas.mouseOver(cameraViewControl.enable);
  canvas.mouseOut(cameraViewControl.disable);

  //labels fonts
  //uncomment to deploy online
  //textFont(labelFont);

}



function draw() {
  lights();
  if (drawingLoopControl.clearDrawing){
    background(0);
  }
  cameraViewControl.adjust();
  logo.start();
  interpreter.initLogoExecution();

  interpreter.executeLogo();
  
  logo.end();
}


//p5 defined events:
function mouseWheel(event){
  cameraViewControl.mouseWheelCallback(event.delta);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  document.getElementById("fullscreenButton").firstElementChild.className = fullscreen()? "fa fa-compress" : "fa fa-expand";
}

function keyPressed() {
  logo.keyPressedCallback(keyCode);
}


var drawingLoopControl = {

  clearDrawing: true,

  redrawIfPaused: function(){
    if (!isLooping()){
      redraw();
    }
  },

  togglePause: function(){
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
  },

  toggleClearDrawing: function(){
    if (this.clearDrawing){
      this.clearDrawing = false;
      document.getElementById("clearDrawing").firstElementChild.style.color = "red";
    } else {
      this.clearDrawing = true;
      document.getElementById("clearDrawing").firstElementChild.style.removeProperty("color");
    }
  }

};

