let labelFont;
var clearDraw = true;

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
  if (clearDraw){
    background(0);
  }
  cameraViewControl.adjust();
  logoStart();
  initLogoExecution();

  executeLogo();
  
  logoEnd();
}


//p5 defined events:
function mouseWheel(event){
  cameraViewControl.mouseWheelCallback(event.delta);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  document.getElementById("fullscreenButton").firstElementChild.className = fullscreen()? "fa fa-compress" : "fa fa-expand";
}