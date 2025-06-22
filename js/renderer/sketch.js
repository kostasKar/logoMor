
LM.p5Renderer = new p5( function(p) {

  let labelFont;
  let canvas;
  let persistDraw = false;
  let backgroundColor = "#000000";

  p.preload = function(){
    if (window.location.protocol !== "file:"){
      labelFont = p.loadFont('assets/fonts/Inconsolata.otf');
    }
  };

  p.setup = function() {
    p.setAttributes('antialias', true);
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    canvas.parent('drawCanvas');
    LM.cameraViewControl.initialize();
    canvas.doubleClicked(LM.cameraViewControl.reset);
    canvas.mouseOver(LM.cameraViewControl.enable);
    canvas.mouseOut(LM.cameraViewControl.disable);

    if (window.location.protocol !== "file:"){
      p.textFont(labelFont);
    }
  };

  p.draw = function() {
    if (!persistDraw) {
      p.background(backgroundColor);
    }
    LM.cameraViewControl.adjust();
    LM.logo.startDrawing();
    if (LM.retainMode.shouldExecute()) {
      LM.logo.startExecution();
      LM.interpreter.initLogoExecution();
      LM.interpreter.executeLogo();
      LM.logo.endExecution();
    }
    LM.logo.endDrawing();
    LM.sketchBuffer.drawBufferedItems();
    LM.retainMode.completedExecution();
  };

  p.mouseWheel = function(event){
    LM.cameraViewControl.mouseWheelCallback(event.delta);
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    if (!document.fullscreenElement){
      document.getElementById("fullScreenToggleButton").classList.remove("checked");
    }
  };

  p.toggleFullscreen = function(){
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  p.keyPressed = function() {
    LM.logo.keyPressedCallback(p.keyCode);
    //prevent accidental scrolling of the control column by pressing the arrrow keys
    if((LM.cameraViewControl.isEnabled()) && ((p.keyCode === 38) || (p.keyCode === 40))){
      return false; //prevent default browser behaviour
    }
  };

  p.togglePersistDraw = function(){
    persistDraw = !persistDraw;
  };

  p.setBackgroundColor = function(color){
    backgroundColor = color;
  }

});






