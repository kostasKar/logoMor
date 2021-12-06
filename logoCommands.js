LM.logo = (function(){

  var penDown;
  var showTurtle;
  var lastKeyPressed;

  var defaultStyle = {"weight":1, "r":255, "g":255, "b":255, "a":255, "textSize":10, "fill":false};
  var activeStyle;

  function addVertex(){
    //LM.p5Renderer.vertex(LM.matrix.getX(), LM.matrix.getY(), LM.matrix.getZ());
    LM.modelMaker.addVertex(LM.matrix.getX(), LM.matrix.getY(), LM.matrix.getZ());
  }

  function addStartVertex(){
    LM.modelMaker.addStartVertex(LM.matrix.getX(), LM.matrix.getY(), LM.matrix.getZ());
  }

  function startNewShape(){
    // LM.p5Renderer.beginShape();
    LM.modelMaker.startNewModel(activeStyle);
  }

  function endNewShape(){
    // LM.p5Renderer.endShape();
    LM.modelMaker.endNewModel();
  }

  function initStrokeStyle(){
    activeStyle =  Object.assign({}, defaultStyle);
    restoreStrokeStyle();
  }

  function restoreStrokeStyle(){
    LM.p5Renderer.strokeWeight(activeStyle.weight);
    LM.p5Renderer.stroke(activeStyle.r, activeStyle.g, activeStyle.b, activeStyle.a);
    LM.p5Renderer.noFill();
    LM.p5Renderer.textSize(activeStyle.textSize);
    if (activeStyle.fill){
      LM.p5Renderer.fill(activeStyle.r, activeStyle.g, activeStyle.b, activeStyle.a);
    }
  }



  return {

    keyPressedCallback:function(key){
      lastKeyPressed = key;
    },

    setDefaultHexColor: function(hexColor){
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
      defaultStyle.r = parseInt(result[1], 16);
      defaultStyle.g = parseInt(result[2], 16);
      defaultStyle.b = parseInt(result[3], 16);
    },  

    start: function(){
      LM.drawCoordinates(LM.p5Renderer,25);
      if (LM.retainMode.shouldExecute()) {
        penDown = true;
        showTurtle = true;
        initStrokeStyle();
        LM.p5Renderer.push();
        LM.matrix.reset();
        LM.modelMaker.clearModels();
        startNewShape();
        addStartVertex();
      }
    },

    end: function(){
      if (LM.retainMode.shouldExecute()) {
        LM.modelMaker.endAnyPendingModel();
      }
      LM.modelMaker.displayAllModels();
      if (showTurtle){
        LM.matrix.apply();
        LM.drawAvatar(LM.p5Renderer);
        if (document.getElementById("turnsHelpArrows").checked){
          LM.drawHelpArrows(LM.p5Renderer,15);
        } else {
          LM.drawCoordinates(LM.p5Renderer,10);
        }
      }
      if (LM.retainMode.shouldExecute()){LM.p5Renderer.pop();}
    },

    showTurtle: function(){
      showTurtle = true;
    },

    hideTurtle: function(){
      showTurtle = false;
    },

    beginShape: function(){
      endNewShape()
      activeStyle.fill = true;
      startNewShape();
      addStartVertex();
    },

    endShape: function(){
      endNewShape();
      activeStyle.fill = false;
      if (penDown){
        startNewShape();
        addStartVertex();
      }
    },

    forward: function(length){
      LM.matrix.translate(0, -length, 0);
      if (penDown){
       addVertex();
      }
    },

    backward: function(length){
      this.forward(-length);
    },

    right: function(angle){
     LM.matrix.rotateZ(LM.p5Renderer.radians(angle));
    },

    left: function(angle){
     LM.matrix.rotateZ(LM.p5Renderer.radians(-angle));
    },

    up: function(angle){
     LM.matrix.rotateX(LM.p5Renderer.radians(-angle));
    },

    down: function(angle){
     LM.matrix.rotateX(LM.p5Renderer.radians(angle));
    },

    rollRight: function(angle){
     LM.matrix.rotateY(LM.p5Renderer.radians(angle));
    },

    rollLeft: function(angle){
     LM.matrix.rotateY(LM.p5Renderer.radians(-angle));
    },

    arc: function(angle, radius){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "arc", 0, 0, radius*2, radius*2, -LM.p5Renderer.HALF_PI, LM.p5Renderer.radians(angle) - LM.p5Renderer.HALF_PI);
    },

    penDown: function(){
      if (!penDown){
        penDown = true;
        addStartVertex();
      }
    },

    penUp: function(){
      if (penDown){
        penDown = false;
      }
    },

    setPenSize: function(n){
      LM.p5Renderer.strokeWeight(n);
      activeStyle.weight = n;
      if (penDown){
        endNewShape();
        startNewShape();
        addStartVertex();
      }
    },

    setTextSize: function(n){
      LM.p5Renderer.textSize(n);
      activeStyle.textSize = n;
    },

    color: function(r, g, b){
      activeStyle.r = r;
      activeStyle.g = g;
      activeStyle.b = b;
      restoreStrokeStyle();
      if (penDown){
        endNewShape();
        startNewShape();
        addStartVertex();
      }
    },

    colorHSB: function(h, s, b){
      var c = LM.p5Renderer.color('hsb('+ h + ',' + s + '%,' + b + '%)');
      activeStyle.r = LM.p5Renderer.red(c);
      activeStyle.g = LM.p5Renderer.green(c);
      activeStyle.b = LM.p5Renderer.blue(c);
      restoreStrokeStyle();
      if (penDown){
        endNewShape();
        startNewShape();
        addStartVertex();
      }
    },

    colorAlpha: function(a){
      activeStyle.a = a;
      restoreStrokeStyle();
      if (penDown){
        endNewShape();
        startNewShape();
        addStartVertex();
      }
    },

    label: function(word){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "text", word, 0, 0);
    },

    point: function(){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "point", 0, 0, 0);
    },


    home: function(){
      LM.matrix.reset();
      if (penDown){
        addVertex();
      }
    },

    getx: function(){
     return LM.matrix.getX();
    },

    gety: function(){
     return - LM.matrix.getY();
    },

    getz: function(){
     return LM.matrix.getZ();
    },

    dist: function(x, y, z){
      return Math.sqrt(Math.pow(x-LM.matrix.getX(), 2) + Math.pow(y-(-LM.matrix.getY()), 2) + Math.pow(z-LM.matrix.getZ(), 2));
    },

    setxyz: function(newX, newY, newZ){
      LM.matrix.setX(newX);
      LM.matrix.setY(-newY);
      LM.matrix.setZ(newZ);
      if (penDown){
        addVertex();
      }
    },

    setx: function(newX){
      this.setxyz(newX, this.gety(), this.getz());
    },

    sety: function(newY){
      this.setxyz(this.getx(), newY, this.getz());
    },

    setz: function(newZ){
      this.setxyz(this.getx(), this.gety(), newZ);
    },

    mousex: function(){
      return  (LM.p5Renderer.mouseX - LM.p5Renderer.width/2)*(LM.cameraViewControl.getFov() / 1.2) - LM.cameraViewControl.getCenterCoordinates()["x"] ;
    },

    mousey: function(){
      return -((LM.p5Renderer.mouseY - LM.p5Renderer.height/2)*(LM.cameraViewControl.getFov() / 1.2) - LM.cameraViewControl.getCenterCoordinates()["y"]);
    },

    mousePressed: function(){
      var mouseCodes = {};
      mouseCodes[LM.p5Renderer.LEFT] = 1;
      mouseCodes[LM.p5Renderer.RIGHT] = 2;
      mouseCodes[LM.p5Renderer.CENTER] = 3;
      return (LM.cameraViewControl.isCameraEnabled() && LM.p5Renderer.mouseIsPressed) ? mouseCodes[LM.p5Renderer.mouseButton] : 0;
    },


    //3D primitives
    box: function(side){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "box", side);
    },

    sphere: function(radius){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "sphere", radius);
    },

    cylinder: function(radius, height){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "cylinder", radius, height);
    },

    cone: function(radius, height){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "cone", radius, height);
    },

    torus: function(radius, tubeRadius){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "torus", radius, tubeRadius);
    },

    ellipsoid: function(radiusX, radiusY, radiusZ){
      LM.modelMaker.addPrimitive(activeStyle, penDown, LM.matrix.getMatrix(), "ellipsoid", radiusX, radiusY, radiusZ);
    },

    model: function(model, size){
      LM.modelMaker.addSolid(activeStyle, penDown, LM.matrix.getMatrix(), model, size/200);
    },

    image: function(image, height){
      if(penDown){
        LM.p5Renderer.endShape();
        LM.p5Renderer.noStroke();
      }
      var w = image.width;
      var h = image.height;
      var scaleFactor =  height/h;
      LM.p5Renderer.push();
      LM.matrix.apply();
      LM.p5Renderer.image(image, 0, 0, w * scaleFactor, h * scaleFactor);
      LM.p5Renderer.pop();
      restoreStrokeStyle();
      if (penDown){
        LM.p5Renderer.beginShape();
        addVertex();
      }
    },

    soundPlay: function(audio){
      if (audio.paused || audio.currentTime === 0 || audio.ended) {
        audio.play();
      }
    },

    soundStop: function(audio){
      audio.pause();
      audio.currentTime = 0;
    },

    soundPause: function(audio){
      audio.pause();
    },

    soundIsPlaying: function(audio){
      return (audio.paused || audio.currentTime === 0 || audio.ended) ? 0 : 1;
    },

    soundSetTime: function(audio, time){
      audio.currentTime = time;
    },

    soundSetVolume: function(audio, vol){
      if(vol < 0 ){ vol = 0;}
      if(vol > 100){vol = 100;}
      audio.volume = vol/100;
    },

    soundGetTime: function(audio){
      return audio.currentTime;
    },

    soundGetVolume: function(audio){
      return Math.round(audio.volume * 100);
    },

    keyPressed: function(){
      return LM.p5Renderer.keyIsPressed ? lastKeyPressed : 0;
    }

}


})();

