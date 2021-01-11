let labelFont;

function preload() {
  //uncomment to deploy online
  //labelFont = loadFont('assets/Inconsolata.otf');
}



var canvas;

function setup() {
  setAttributes('antialias', true);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('drawCanvas');
  initializeCamera();
  canvas.doubleClicked(resetCamera);
  canvas.mouseOver(enableCamera);
  canvas.mouseOut(disableCamera);

  //labels fonts
  //uncomment to deploy online
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
  document.getElementById("fullscreenButton").firstElementChild.className = fullscreen()? "fa fa-compress" : "fa fa-expand";
}