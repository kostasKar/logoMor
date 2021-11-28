var logo = (function(){

  var penDown;
  var showTurtle;
  var strokeR, strokeG, strokeB, strokeWght, strokeAlpha, labelTextSize;
  var shapeBegan;
  var vertices;
  var lastKeyPressed;

  var defaultStyle = {"weight":1, "r":255, "g":255, "b":255, "a":255, "textSize":10};

  function makeShape(){
    p5Renderer.pop();
    p5Renderer.push();
    restoreStrokeStyle(); //for the stroke color
    p5Renderer.beginShape();
    for (let i = 0; i < vertices.length; i++) {
      p5Renderer.vertex(vertices[i][0], vertices[i][1], vertices[i][2]);
    }
    p5Renderer.endShape();
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
    p5Renderer.strokeWeight(strokeWght);
    p5Renderer.stroke(strokeR, strokeG, strokeB, strokeAlpha);
    p5Renderer.fill(strokeR, strokeG, strokeB, strokeAlpha);
    p5Renderer.textSize(labelTextSize);
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
      drawCoordinates(p5Renderer,25);
      penDown = true;
      showTurtle = true;
      shapeBegan = false;
      vertices = [];
      initStrokeStyle();
      p5Renderer.push();
      logoMatrix.reset();
    },

    end: function(){
      if (shapeBegan){
        makeShape();
      }
      if (showTurtle){
        drawAvatar(p5Renderer);
        if (document.getElementById("turnsHelpArrows").checked){
          drawHelpArrows(p5Renderer,15);
        } else {
          drawCoordinates(p5Renderer,10);
        }
      }
      p5Renderer.pop();
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
       p5Renderer.line(0, 0, 0, 0, -length, 0);
      }
      p5Renderer.translate(0, -length, 0);
      logoMatrix.translate(0, -length, 0);
      if (penDown && shapeBegan){
        addVertex();
      }
    },

    backward: function(length){
      if (penDown){
        p5Renderer.line(0, 0, 0, 0, length, 0);
      }
      p5Renderer.translate(0, length, 0);
      logoMatrix.translate(0, length, 0);
      if (penDown && shapeBegan){
        addVertex();
      }
    },

    right: function(angle){
     p5Renderer.rotateZ(p5Renderer.radians(angle));
     logoMatrix.rotateZ(p5Renderer.radians(angle));
    },

    left: function(angle){
     p5Renderer.rotateZ(p5Renderer.radians(-angle));
     logoMatrix.rotateZ(p5Renderer.radians(-angle));
    },

    up: function(angle){
     p5Renderer.rotateX(p5Renderer.radians(-angle));
     logoMatrix.rotateX(p5Renderer.radians(-angle));
    },

    down: function(angle){
     p5Renderer.rotateX(p5Renderer.radians(angle));
     logoMatrix.rotateX(p5Renderer.radians(angle));
    },

    rollRight: function(angle){
     p5Renderer.rotateY(p5Renderer.radians(angle));
     logoMatrix.rotateY(p5Renderer.radians(angle));
    },

    rollLeft: function(angle){
     p5Renderer.rotateY(p5Renderer.radians(-angle));
     logoMatrix.rotateY(p5Renderer.radians(-angle));
    },

    arc: function(angle, radius){
      p5Renderer.noFill();
      p5Renderer.arc(0, 0, radius*2, radius*2, -p5Renderer.HALF_PI, p5Renderer.radians(angle) - p5Renderer.HALF_PI);
      restoreStrokeStyle();
    },

    penDown: function(){
      penDown = true;
    },

    penUp: function(){
      penDown = false;
    },

    setPenSize: function(n){
     p5Renderer.strokeWeight(n);
     strokeWght = n;
    },

    setTextSize: function(n){
      p5Renderer.textSize(n);
      labelTextSize = n;
    },

    color: function(r, g, b){
     strokeR = r;
     strokeG = g;
     strokeB = b;
     restoreStrokeStyle();
    },

    colorHSB: function(h, s, b){
      var c = p5Renderer.color('hsb('+ h + ',' + s + '%,' + b + '%)');
      strokeR = p5Renderer.red(c);
      strokeG = p5Renderer.green(c);
      strokeB = p5Renderer.blue(c);
      restoreStrokeStyle();
    },

    colorAlpha: function(a){
     p5Renderer.stroke(strokeR, strokeG, strokeB, a);
     p5Renderer.fill(strokeR, strokeG, strokeB, a);
     strokeAlpha = a;
    },

    label: function(word){
      p5Renderer.text(word, 0, 0);
    },

    point: function(){
      p5Renderer.point(0,0,0);
    },


    home: function(){
      p5Renderer.pop();
      p5Renderer.push();
     restoreStrokeStyle();
     if (penDown){
       p5Renderer.line(0, 0, 0, logoMatrix.getX(), logoMatrix.getY(), logoMatrix.getZ());
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
      return Math.sqrt(Math.pow(x-logoMatrix.getX(), 2) + Math.pow(y-(-logoMatrix.getY()), 2) + Math.pow(z-logoMatrix.getZ(), 2));
    },

    setxyz: function(newX, newY, newZ){
      p5Renderer.pop();
      p5Renderer.push();
     restoreStrokeStyle();
     if (penDown){
       p5Renderer.line(logoMatrix.getX(), logoMatrix.getY(), logoMatrix.getZ(), newX, -newY, newZ);
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
      return  (p5Renderer.mouseX - p5Renderer.width/2)*(cameraViewControl.getFov() / 1.2) - cameraViewControl.getCenterCoordinates()["x"] ;
    },

    mousey: function(){
      return -((p5Renderer.mouseY - p5Renderer.height/2)*(cameraViewControl.getFov() / 1.2) - cameraViewControl.getCenterCoordinates()["y"]);
    },

    mousePressed: function(){
      var mouseCodes = {};
      mouseCodes[p5Renderer.LEFT] = 1;
      mouseCodes[p5Renderer.RIGHT] = 2;
      mouseCodes[p5Renderer.CENTER] = 3;
      return (cameraViewControl.isCameraEnabled() && p5Renderer.mouseIsPressed) ? mouseCodes[p5Renderer.mouseButton] : 0;
    },


    //3D primitives
    box: function(side){
      if (!penDown) {p5Renderer.noStroke();}
      p5Renderer.box(side);
      restoreStrokeStyle();
    },

    sphere: function(radius){
      if (!penDown) {p5Renderer.noStroke();}
      p5Renderer.sphere(radius);
      restoreStrokeStyle();
    },

    cylinder: function(radius, height){
      if (!penDown) {p5Renderer.noStroke();}
      p5Renderer.cylinder(radius, height);
      restoreStrokeStyle();
    },

    cone: function(radius, height){
      if (!penDown) {p5Renderer.noStroke();}
      p5Renderer.cone(radius, height);
      restoreStrokeStyle();
    },

    torus: function(radius, tubeRadius){
      if (!penDown) {p5Renderer.noStroke();}
      p5Renderer.torus(radius, tubeRadius);
      restoreStrokeStyle();
    },

    ellipsoid: function(radiusX, radiusY, radiusZ){
      if (!penDown) {p5Renderer.noStroke();}
      p5Renderer.ellipsoid(radiusX, radiusY, radiusZ);
      restoreStrokeStyle();
    },

    model: function(model, size){
      if (!penDown) {p5Renderer.noStroke();}
      var scaleFactor = size/200; //normalized models fit inbetween -100, 100 so 200 size
      p5Renderer.scale(scaleFactor);
      p5Renderer.model(model);
      p5Renderer.scale(1/scaleFactor);
      restoreStrokeStyle();
    },

    image: function(image, height){
      var w = image.width;
      var h = image.height;
      var scaleFactor =  height/h;
      p5Renderer.image(image, 0, 0, w * scaleFactor, h * scaleFactor);
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
      return p5Renderer.keyIsPressed ? lastKeyPressed : 0;
    }

}


})();

