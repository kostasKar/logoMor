
var p5Renderer = new p5( function(p) {

  var labelFont;
  var canvas;
  var clearDrawing = true;

  p.preload = function(){
    if (window.location.protocol !== "file:"){
      labelFont = p.loadFont('assets/Inconsolata.otf');
    }
  };

  p.setup = function() {
    p.setAttributes('antialias', true);
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    canvas.parent('drawCanvas');
    cameraViewControl.initialize();
    canvas.doubleClicked(cameraViewControl.reset);
    canvas.mouseOver(cameraViewControl.enable);
    canvas.mouseOut(cameraViewControl.disable);

    if (window.location.protocol !== "file:"){
      p.textFont(labelFont);
    }
  };

  p.draw = function() {
    p.lights();
    if (clearDrawing){
      p.background(0);
    }
    cameraViewControl.adjust();
    logo.start();
    interpreter.initLogoExecution();
    interpreter.executeLogo();
    logo.end();
  };

  p.mouseWheel = function(event){
    cameraViewControl.mouseWheelCallback(event.delta);
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    document.getElementById("fullscreenButton").firstElementChild.className = p.fullscreen()? "fa fa-compress" : "fa fa-expand";
  };

  p.keyPressed = function() {
    logo.keyPressedCallback(p.keyCode);
  }

  p.redrawIfPaused = function(){
    if (!p5Renderer.isLooping()){
      p5Renderer.redraw();
    }
  }

  p.togglePause = function(){
    if (p5Renderer.isLooping()){
      document.getElementById("pause").firstElementChild.className = "fa fa-play";
      document.getElementById("pause").firstElementChild.style.color = "lime";
      document.getElementById("autoRotate").disabled = true;
      document.getElementById("turnsHelpArrows").disabled = true;
      p5Renderer.noLoop();
    } else {
      document.getElementById("pause").firstElementChild.className = "fa fa-pause";
      document.getElementById("pause").firstElementChild.style.removeProperty("color");
      document.getElementById("autoRotate").disabled = false;
      document.getElementById("turnsHelpArrows").disabled = false;
      p5Renderer.loop();
    }
  }

  p.toggleClearDrawing = function(){
    if (clearDrawing){
      clearDrawing = false;
      document.getElementById("clearDrawing").firstElementChild.style.color = "red";
    } else {
      clearDrawing = true;
      document.getElementById("clearDrawing").firstElementChild.style.removeProperty("color");
    }
  }

});






