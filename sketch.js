
LM.p5Renderer = new p5( function(p) {

  var labelFont;
  var canvas;

  p.preload = function(){
    if (window.location.protocol !== "file:"){
      labelFont = p.loadFont('assets/Inconsolata.otf');
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
    p.lights();
    if (!document.getElementById("persistDrawCheckBox").checked) {
      p.background(0);
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
    LM.positionInfo.update();
  };

  p.mouseWheel = function(event){
    LM.cameraViewControl.mouseWheelCallback(event.delta);
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = function() {
    LM.logo.keyPressedCallback(p.keyCode);
    //prevent accidental scrolling of the control column by pressing the arrrow keys
    if((LM.cameraViewControl.isEnabled()) && ((p.keyCode === 38) || (p.keyCode === 40))){
      return false; //prevent default browser behaviour
    }
  }

});






