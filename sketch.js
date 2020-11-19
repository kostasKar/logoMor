let labelFont;

function preload() {
  //labelFont = loadFont('assets/Inconsolata.otf');
}



var canvas;

function setup() {
  canvas = createCanvas(800, 800, WEBGL);
  canvas.parent('drawCanvas');
  initializeCamera();
  canvas.doubleClicked(resetCamera);
  stroke(255);

  //labels fonts
  textSize(10);
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