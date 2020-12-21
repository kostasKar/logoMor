let labelFont;

function preload() {
  //labelFont = loadFont('assets/Inconsolata.otf');
}



var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('drawCanvas');
  initializeCamera();
  canvas.doubleClicked(resetCamera);
  canvas.mouseOver(enableCamera);
  canvas.mouseOut(disableCamera);

  //labels fonts
  //textFont(labelFont);

}



function draw() {
  lights();
  background(0);
  adjustCamera();
  logoStart();
  initLogoExecution();

  executeLogo();
  
  logoEnd();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}