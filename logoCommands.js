var logo = (function(){

  var penDown;
  var showTurtle;
  var strokeR, strokeG, strokeB, strokeWght, strokeAlpha, labelTextSize;
  var shapeBegan;
  var vertices;
  var lastKeyPressed;

  var defaultStyle = {"weight":1, "r":255, "g":255, "b":255, "a":255, "textSize":10};

  function makeShape(){
    pop();
    push();
    restoreStrokeStyle(); //for the stroke color
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
      vertex(vertices[i][0], vertices[i][1], vertices[i][2]);
    } 
    endShape();
    logoMatrix.apply();
  }

  function addVertex(){
    vertices.push([logoMatrix.getX(), logoMatrix.getY(), logoMatrix.getZ()]);
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
    strokeWeight(strokeWght);
    stroke(strokeR, strokeG, strokeB, strokeAlpha);
    fill(strokeR, strokeG, strokeB, strokeAlpha);
    textSize(labelTextSize);
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
      drawCoordinates(25);
      penDown = true;
      showTurtle = true;
      shapeBegan = false;
      vertices = [];
      initStrokeStyle();
      push();
      logoMatrix.reset();
    },

    end: function(){
      if (shapeBegan){
        makeShape();
      }
      if (showTurtle){
        drawAvatar();
        if (document.getElementById("turnsHelpArrows").checked){
          drawHelpArrows(15);
        } else {
          drawCoordinates(10);
        }
      }
      pop();
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
        line(0, 0, 0, 0, -length, 0);
      }
      translate(0, -length, 0);
      logoMatrix.translate(0, -length, 0);
      if (penDown && shapeBegan){
        addVertex();
      }
    },

    backward: function(length){
      if (penDown){
        line(0, 0, 0, 0, length, 0);
      }
      translate(0, length, 0);
      logoMatrix.translate(0, length, 0);
      if (penDown && shapeBegan){
        addVertex();
      }
    },

    right: function(angle){
     rotateZ(radians(angle));
     logoMatrix.rotateZ(radians(angle));
    },

    left: function(angle){
     rotateZ(radians(-angle));
     logoMatrix.rotateZ(radians(-angle));
    },

    up: function(angle){
     rotateX(radians(-angle));
     logoMatrix.rotateX(radians(-angle));
    },

    down: function(angle){
     rotateX(radians(angle));
     logoMatrix.rotateX(radians(angle));
    },

    rollRight: function(angle){
     rotateY(radians(angle));
     logoMatrix.rotateY(radians(angle));
    },

    rollLeft: function(angle){
     rotateY(radians(-angle));
     logoMatrix.rotateY(radians(-angle));
    },

    arc: function(angle, radius){
      noFill();
      arc(0, 0, radius*2, radius*2, -HALF_PI, radians(angle) - HALF_PI);
      restoreStrokeStyle();
    },

    penDown: function(){
      penDown = true;
    },

    penUp: function(){
      penDown = false;
    },

    setPenSize: function(n){
     strokeWeight(n);
     strokeWght = n;
    },

    setTextSize: function(n){
      textSize(n);
      labelTextSize = n;
    },

    color: function(r, g, b){
     strokeR = r;
     strokeG = g;
     strokeB = b;
     restoreStrokeStyle();
    },

    colorHSB: function(h, s, b){
      var c = color('hsb('+ h + ',' + s + '%,' + b + '%)');
      strokeR = red(c);
      strokeG = green(c);
      strokeB = blue(c);
      restoreStrokeStyle();
    },

    colorAlpha: function(a){
     stroke(strokeR, strokeG, strokeB, a);
     fill(strokeR, strokeG, strokeB, a);
     strokeAlpha = a;
    },

    label: function(word){
     text(word, 0, 0);
    },

    point: function(){
      point(0,0,0);
    },


    home: function(){
     pop();
     push();
     restoreStrokeStyle();
     if (penDown){
       line(0, 0, 0, logoMatrix.getX(), logoMatrix.getY(), logoMatrix.getZ());
     }
     logoMatrix.reset(); 
     if (penDown && shapeBegan){
      addVertex();
    }
    },

    getx: function(){
     return logoMatrix.getX();
    },

    gety: function(){
     return - logoMatrix.getY();
    },

    getz: function(){
     return logoMatrix.getZ();
    },

    dist: function(x, y, z){
      return sqrt(pow(x-logoMatrix.getX(), 2) + pow(y-(-logoMatrix.getY()), 2) + pow(z-logoMatrix.getZ(), 2));
    },

    setxyz: function(newX, newY, newZ){
     pop();
     push();
     restoreStrokeStyle();
     if (penDown){
       line(logoMatrix.getX(), logoMatrix.getY(), logoMatrix.getZ(), newX, -newY, newZ);
     }
     logoMatrix.setX(newX);
     logoMatrix.setY(-newY);
     logoMatrix.setZ(newZ);
     logoMatrix.apply(); 
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
      return  (mouseX - width/2)*(cameraViewControl.getFov() / 1.2) - cameraViewControl.getCenterCoordinates()["x"] ;
    },

    mousey: function(){
      return -((mouseY - height/2)*(cameraViewControl.getFov() / 1.2) - cameraViewControl.getCenterCoordinates()["y"]);
    },

    mousePressed: function(){
      var mouseCodes = {};
      mouseCodes[LEFT] = 1;
      mouseCodes[RIGHT] = 2;
      mouseCodes[CENTER] = 3;
      return (cameraViewControl.isCameraEnabled() && mouseIsPressed) ? mouseCodes[mouseButton] : 0;
    },


    //3D primitives
    box: function(side){
      if (!penDown) {noStroke();}
      box(side);
      restoreStrokeStyle();
    },

    sphere: function(radius){
      if (!penDown) {noStroke();}
      sphere(radius);
      restoreStrokeStyle();
    },

    cylinder: function(radius, height){
      if (!penDown) {noStroke();}
      cylinder(radius, height);
      restoreStrokeStyle();
    },

    cone: function(radius, height){
      if (!penDown) {noStroke();}
      cone(radius, height);
      restoreStrokeStyle();
    },

    torus: function(radius, tubeRadius){
      if (!penDown) {noStroke();}
      torus(radius, tubeRadius);
      restoreStrokeStyle();
    },

    ellipsoid: function(radiusX, radiusY, radiusZ){
      if (!penDown) {noStroke();}
      ellipsoid(radiusX, radiusY, radiusZ);
      restoreStrokeStyle();
    },

    model: function(name, size){
      if (!penDown) {noStroke();}
      var scaleFactor = size/200; //normalized models fit inbetween -100, 100 so 200 size
      scale(scaleFactor);
      if (name in loadedModels){
        model(loadedModels[name]);
      } else {
        throwError("Invalid model name: " + name);
      }
      scale(1/scaleFactor);
      restoreStrokeStyle();
    },

    image: function(name, height){
      if (name in loadedImages){
        var w = loadedImages[name].width;
        var h = loadedImages[name].height;
        var scaleFactor =  height/h;
        image(loadedImages[name], 0, 0, w * scaleFactor, h * scaleFactor);
      } else {
        throwError("Invalid image name: " + name);
      }
    },

    soundPlay: function(name){
      if (logoSounds.soundExists(name)){
        var audio = logoSounds.getAudio(name);
        if (audio.paused || audio.currentTime === 0 || audio.ended) {
          audio.play();
        }
      } else {
        throwError("Invalid sound name: " + name);
      }
    },

    soundStop: function(name){
      if (logoSounds.soundExists(name)){
        var audio = logoSounds.getAudio(name);
        audio.pause();
        audio.currentTime = 0;
      } else {
        throwError("Invalid sound name: " + name);
      }
    },

    soundPause: function(name){
      if (logoSounds.soundExists(name)){
        var audio = logoSounds.getAudio(name);
        audio.pause();
      } else {
        throwError("Invalid sound name: " + name);
      }
    },

    soundIsPlaying: function(name){
      if (logoSounds.soundExists(name)){
        var audio = logoSounds.getAudio(name);
        return (audio.paused || audio.currentTime === 0 || audio.ended) ? 0 : 1;
      } else {
        throwError("Invalid sound name: " + name);
        return 0;
      }
    },

    soundSetTime: function(name, time){
      if (logoSounds.soundExists(name)){
        logoSounds.getAudio(name).currentTime = time;
      } else {
        throwError("Invalid sound name: " + name);
      }
    },

    soundSetVolume: function(name, vol){
      if(vol < 0 ){ vol = 0;}
      if(vol > 100){vol = 100;}
      if (logoSounds.soundExists(name)){
        logoSounds.getAudio(name).volume = vol/100;
      } else {
        throwError("Invalid sound name: " + name);
      }
    },

    soundGetTime: function(name){
      if (logoSounds.soundExists(name)){
        return logoSounds.getAudio(name).currentTime;
      } else {
        throwError("Invalid sound name: " + name);
        return 0;
      }
    },

    soundGetVolume: function(name){
      if (logoSounds.soundExists(name)){
        return Math.round(logoSounds.getAudio(name).volume * 100);
      } else {
        throwError("Invalid sound name: " + name);
        return 0;
      }
    },

    keyPressed: function(){
      return keyIsPressed ? lastKeyPressed : 0;
    }

}


})();

