LM.logo = (function(){

  var penDown;
  var showTurtle;
  var strokeR, strokeG, strokeB, strokeWght, strokeAlpha, labelTextSize;
  var shapeBegan;
  var vertices;
  var lastKeyPressed;

  var defaultStyle = {"weight":1, "r":255, "g":255, "b":255, "a":255, "textSize":10};

  function makeShape(){
    LM.p5Renderer.pop();
    LM.p5Renderer.push();
    restoreStrokeStyle(); //for the stroke color
    LM.p5Renderer.beginShape();
    for (let i = 0; i < vertices.length; i++) {
      LM.p5Renderer.vertex(vertices[i][0], vertices[i][1], vertices[i][2]);
    }
    LM.p5Renderer.endShape();
    LM.matrix.apply();
  }

  function addVertex(){
    vertices.push([LM.matrix.getX(), LM.matrix.getY(), LM.matrix.getZ()]);
  }


  function initStrokeStyle(){
    strokeWght = defaultStyle.weight;
    strokeR = defaultStyle.r;
    strokeG = defaultStyle.g;
    strokeB = defaultStyle.b;
    strokeAlpha = defaultStyle.a;
    labelTextSize = defaultStyle.textSize;

    restoreStrokeStyle();
  }

  function restoreStrokeStyle(){
    LM.p5Renderer.strokeWeight(strokeWght);
    LM.p5Renderer.stroke(strokeR, strokeG, strokeB, strokeAlpha);
    LM.p5Renderer.fill(strokeR, strokeG, strokeB, strokeAlpha);
    LM.p5Renderer.textSize(labelTextSize);
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
      penDown = true;
      showTurtle = true;
      shapeBegan = false;
      vertices = [];
      initStrokeStyle();
      LM.p5Renderer.push();
      LM.matrix.reset();
    },

    end: function(){
      if (shapeBegan){
        makeShape();
      }
      if (showTurtle){
        LM.drawAvatar(LM.p5Renderer);
        if (document.getElementById("turnsHelpArrows").checked){
          LM.drawHelpArrows(LM.p5Renderer,15);
        } else {
          LM.drawCoordinates(LM.p5Renderer,10);
        }
      }
      LM.p5Renderer.pop();
    },

    showTurtle: function(){
      showTurtle = true;
    },

    hideTurtle: function(){
      showTurtle = false;
    },

    beginShape: function(){
      shapeBegan = true;
      vertices = [];
      addVertex();
    },

    endShape: function(){
      shapeBegan = false;
      makeShape();
      vertices = [];
    },

    forward: function(length){
     if (penDown){
       LM.p5Renderer.line(0, 0, 0, 0, -length, 0);
      }
      LM.p5Renderer.translate(0, -length, 0);
      LM.matrix.translate(0, -length, 0);
      if (penDown && shapeBegan){
        addVertex();
      }
    },

    backward: function(length){
      if (penDown){
        LM.p5Renderer.line(0, 0, 0, 0, length, 0);
      }
      LM.p5Renderer.translate(0, length, 0);
      LM.matrix.translate(0, length, 0);
      if (penDown && shapeBegan){
        addVertex();
      }
    },

    right: function(angle){
     LM.p5Renderer.rotateZ(LM.p5Renderer.radians(angle));
     LM.matrix.rotateZ(LM.p5Renderer.radians(angle));
    },

    left: function(angle){
     LM.p5Renderer.rotateZ(LM.p5Renderer.radians(-angle));
     LM.matrix.rotateZ(LM.p5Renderer.radians(-angle));
    },

    up: function(angle){
     LM.p5Renderer.rotateX(LM.p5Renderer.radians(-angle));
     LM.matrix.rotateX(LM.p5Renderer.radians(-angle));
    },

    down: function(angle){
     LM.p5Renderer.rotateX(LM.p5Renderer.radians(angle));
     LM.matrix.rotateX(LM.p5Renderer.radians(angle));
    },

    rollRight: function(angle){
     LM.p5Renderer.rotateY(LM.p5Renderer.radians(angle));
     LM.matrix.rotateY(LM.p5Renderer.radians(angle));
    },

    rollLeft: function(angle){
     LM.p5Renderer.rotateY(LM.p5Renderer.radians(-angle));
     LM.matrix.rotateY(LM.p5Renderer.radians(-angle));
    },

    arc: function(angle, radius){
      LM.p5Renderer.noFill();
      LM.p5Renderer.arc(0, 0, radius*2, radius*2, -LM.p5Renderer.HALF_PI, LM.p5Renderer.radians(angle) - LM.p5Renderer.HALF_PI);
      restoreStrokeStyle();
    },

    penDown: function(){
      penDown = true;
    },

    penUp: function(){
      penDown = false;
    },

    setPenSize: function(n){
     LM.p5Renderer.strokeWeight(n);
     strokeWght = n;
    },

    setTextSize: function(n){
      LM.p5Renderer.textSize(n);
      labelTextSize = n;
    },

    color: function(r, g, b){
     strokeR = r;
     strokeG = g;
     strokeB = b;
     restoreStrokeStyle();
    },

    colorHSB: function(h, s, b){
      var c = LM.p5Renderer.color('hsb('+ h + ',' + s + '%,' + b + '%)');
      strokeR = LM.p5Renderer.red(c);
      strokeG = LM.p5Renderer.green(c);
      strokeB = LM.p5Renderer.blue(c);
      restoreStrokeStyle();
    },

    colorAlpha: function(a){
     LM.p5Renderer.stroke(strokeR, strokeG, strokeB, a);
     LM.p5Renderer.fill(strokeR, strokeG, strokeB, a);
     strokeAlpha = a;
    },

    label: function(word){
      LM.p5Renderer.text(word, 0, 0);
    },

    point: function(){
      LM.p5Renderer.point(0,0,0);
    },


    home: function(){
      LM.p5Renderer.pop();
      LM.p5Renderer.push();
     restoreStrokeStyle();
     if (penDown){
       LM.p5Renderer.line(0, 0, 0, LM.matrix.getX(), LM.matrix.getY(), LM.matrix.getZ());
     }
     LM.matrix.reset(); 
     if (penDown && shapeBegan){
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
      LM.p5Renderer.pop();
      LM.p5Renderer.push();
     restoreStrokeStyle();
     if (penDown){
       LM.p5Renderer.line(LM.matrix.getX(), LM.matrix.getY(), LM.matrix.getZ(), newX, -newY, newZ);
     }
     LM.matrix.setX(newX);
     LM.matrix.setY(-newY);
     LM.matrix.setZ(newZ);
     LM.matrix.apply(); 
     if (penDown && shapeBegan){
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
      if (!penDown) {LM.p5Renderer.noStroke();}
      LM.p5Renderer.box(side);
      restoreStrokeStyle();
    },

    sphere: function(radius){
      if (!penDown) {LM.p5Renderer.noStroke();}
      LM.p5Renderer.sphere(radius);
      restoreStrokeStyle();
    },

    cylinder: function(radius, height){
      if (!penDown) {LM.p5Renderer.noStroke();}
      LM.p5Renderer.cylinder(radius, height);
      restoreStrokeStyle();
    },

    cone: function(radius, height){
      if (!penDown) {LM.p5Renderer.noStroke();}
      LM.p5Renderer.cone(radius, height);
      restoreStrokeStyle();
    },

    torus: function(radius, tubeRadius){
      if (!penDown) {LM.p5Renderer.noStroke();}
      LM.p5Renderer.torus(radius, tubeRadius);
      restoreStrokeStyle();
    },

    ellipsoid: function(radiusX, radiusY, radiusZ){
      if (!penDown) {LM.p5Renderer.noStroke();}
      LM.p5Renderer.ellipsoid(radiusX, radiusY, radiusZ);
      restoreStrokeStyle();
    },

    model: function(model, size){
      if (!penDown) {LM.p5Renderer.noStroke();}
      var scaleFactor = size/200; //normalized models fit inbetween -100, 100 so 200 size
      LM.p5Renderer.scale(scaleFactor);
      LM.p5Renderer.model(model);
      LM.p5Renderer.scale(1/scaleFactor);
      restoreStrokeStyle();
    },

    image: function(image, height){
      var w = image.width;
      var h = image.height;
      var scaleFactor =  height/h;
      LM.p5Renderer.image(image, 0, 0, w * scaleFactor, h * scaleFactor);
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

