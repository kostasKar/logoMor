var penDown;
var showTurtle;
var strokeR, strokeG, strokeB, strokeWght, strokeAlpha, labelTextSize;
var shapeBegan;
var vertices;
var lastKeyPressed;

var defaultStyle = {"weight":1, "r":255, "g":255, "b":255, "a":255, "textSize":10};

function setDefaultHexColor(hexColor){
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  defaultStyle.r = parseInt(result[1], 16);
  defaultStyle.g = parseInt(result[2], 16);
  defaultStyle.b = parseInt(result[3], 16);
}


function makeShape(){
  pop();
  push();
  restoreStrokeStyle(); //for the stroke color
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i][0], vertices[i][1], vertices[i][2]);
  } 
  endShape();
  applyLogoTransformationMatrix();
}

function addVertex(){
  vertices.push([getlmX(), getlmY(), getlmZ()]);
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

function logoStart(){
  drawCoordinates(25);
  penDown = true;
  showTurtle = true;
  shapeBegan = false;
  vertices = [];
  initStrokeStyle();
  push();
  resetLogoTransformationMatrix();
}

function logoEnd(){
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
}

function L_SHOWTURTLE(){
  showTurtle = true;
}

function L_HIDETURTLE(){
  showTurtle = false;
}

function L_BEGINSHAPE(){
  shapeBegan = true;
  vertices = [];
  addVertex();
}

function L_ENDSHAPE(){
  shapeBegan = false;
  makeShape();
  vertices = [];
}

 function L_FORWARD(length){
   if (penDown){
    line(0, 0, 0, 0, -length, 0);
   }
   translate(0, -length, 0);
   logoTranslate(0, -length, 0);
   if (penDown && shapeBegan){
    addVertex();
   }
 }
 
  function L_BACKWARD(length){
   if (penDown){
     line(0, 0, 0, 0, length, 0);
   }
   translate(0, length, 0);
   logoTranslate(0, length, 0);
   if (penDown && shapeBegan){
    addVertex();
   }
 }
 
 function L_RIGHT(angle){
   rotateZ(radians(angle));
   logoRotateZ(radians(angle));
 }
 
  function L_LEFT(angle){
   rotateZ(radians(-angle));
   logoRotateZ(radians(-angle));
 }
 
 function L_UP(angle){
   rotateX(radians(-angle));
   logoRotateX(radians(-angle));
 }
 
  function L_DOWN(angle){
   rotateX(radians(angle));
   logoRotateX(radians(angle));
 }
 
  function L_ROLLRIGHT(angle){
   rotateY(radians(angle));
   logoRotateY(radians(angle));
 }
 
   function L_ROLLLEFT(angle){
   rotateY(radians(-angle));
   logoRotateY(radians(-angle));
 }
 
function L_ARC(angle, radius){
  noFill();
  arc(0, 0, radius*2, radius*2, -HALF_PI, radians(angle) - HALF_PI);
  restoreStrokeStyle();
}

 function L_PENDOWN(){
  penDown = true;
 }
 
  function L_PENUP(){
  penDown = false;
 }
 
 function L_SETPENSIZE(n){
   strokeWeight(n);
   strokeWght = n;
 }

 function L_SETTEXTSIZE(n){
  textSize(n);
  labelTextSize = n;
 }
 
 function L_COLOR(r, g, b){
   strokeR = r;
   strokeG = g;
   strokeB = b;
   restoreStrokeStyle();
 } 

 function L_COLORHSB(h, s, b){
  var c = color('hsb('+ h + ',' + s + '%,' + b + '%)');
  strokeR = red(c);
  strokeG = green(c);
  strokeB = blue(c);
  restoreStrokeStyle();
 }

 function L_COLORALPHA(a){
   stroke(strokeR, strokeG, strokeB, a);
   fill(strokeR, strokeG, strokeB, a);
   strokeAlpha = a;
 } 

 function L_LABEL(word){
   text(word, 0, 0);
 }

 function L_POINT(){
  point(0,0,0);
 }

 
  function L_HOME(){
   pop();
   push();
   restoreStrokeStyle();
   if (penDown){
     line(0, 0, 0, getlmX(), getlmY(), getlmZ());
   }
   resetLogoTransformationMatrix(); 
   if (penDown && shapeBegan){
    addVertex();
   }
 }
 
  function L_GETX(){
   return getlmX();
 }
 
  function L_GETY(){
   return - getlmY();
 }
 
  function L_GETZ(){
   return getlmZ();
 }

 function L_DIST(x, y, z){
  return sqrt(pow(x-getlmX(), 2) + pow(y-(-getlmY()), 2) + pow(z-getlmZ(), 2));
 }

function L_SETXYZ(newX, newY, newZ){
   pop();
   push();
   restoreStrokeStyle();
   if (penDown){
     line(getlmX(), getlmY(), getlmZ(), newX, -newY, newZ);
   }
   setlmX(newX);
   setlmY(-newY);
   setlmZ(newZ);
   applyLogoTransformationMatrix(); 
   if (penDown && shapeBegan){
    addVertex();
   }
 }

function L_SETX(newX){
  L_SETXYZ(newX, L_GETY(), L_GETZ());
}

function L_SETY(newY){
  L_SETXYZ(L_GETX(), newY, L_GETZ());
}

function L_SETZ(newZ){
  L_SETXYZ(L_GETX(), L_GETY(), newZ);
}

function L_MOUSEX(){
  return  (mouseX - width/2)*(fov / 1.2) - centerX ;
}

function L_MOUSEY(){
  return -((mouseY - height/2)*(fov / 1.2) - centerY);
}

function L_MOUSEPRESSED(){
  var mouseCodes = {};
  mouseCodes[LEFT] = 1;
  mouseCodes[RIGHT] = 2;
  mouseCodes[CENTER] = 3;
  return (cameraEnabled && mouseIsPressed) ? mouseCodes[mouseButton] : 0;
}


//3D primitives
function L_BOX(side){
  if (!penDown) {noStroke();}
  box(side);
  restoreStrokeStyle();
}

function L_SPHERE(radius){
  if (!penDown) {noStroke();}
  sphere(radius);
  restoreStrokeStyle();
}

function L_CYLINDER(radius, height){
  if (!penDown) {noStroke();}
  cylinder(radius, height);
  restoreStrokeStyle();
}

function L_CONE(radius, height){
  if (!penDown) {noStroke();}
  cone(radius, height);
  restoreStrokeStyle();
}

function L_TORUS(radius, tubeRadius){
  if (!penDown) {noStroke();}
  torus(radius, tubeRadius);
  restoreStrokeStyle();
}

function L_ELLIPSOID(radiusX, radiusY, radiusZ){
  if (!penDown) {noStroke();}
  ellipsoid(radiusX, radiusY, radiusZ);
  restoreStrokeStyle();
}

function L_MODEL(name, size){
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
}

function L_IMAGE(name, height){
  if (name in loadedImages){
    var w = loadedImages[name].width;
    var h = loadedImages[name].height;
    var scaleFactor =  height/h;
    image(loadedImages[name], 0, 0, w * scaleFactor, h * scaleFactor);
  } else {
    throwError("Invalid image name: " + name);
  }
}

function L_PLAYSOUND(name){
  if (name in loadedSounds){
    var audio = loadedSounds[name];
    if (audio.paused || audio.currentTime === 0 || audio.ended) {
      audio.play();
    }
  } else {
    throwError("Invalid sound name: " + name);
  }
}

function L_STOPSOUND(name){
  if (name in loadedSounds){
    var audio = loadedSounds[name];
    audio.pause();
    audio.currentTime = 0;
  } else {
    throwError("Invalid sound name: " + name);
  }
}

function L_PAUSESOUND(name){
  if (name in loadedSounds){
    var audio = loadedSounds[name];
    audio.pause();
  } else {
    throwError("Invalid sound name: " + name);
  }
}

function L_IS_PLAYINGSOUND(name){
  if (name in loadedSounds){
    var audio = loadedSounds[name];
    return (audio.paused || audio.currentTime === 0 || audio.ended) ? 0 : 1;
  } else {
    throwError("Invalid sound name: " + name);
    return 0;
  }
}

function L_SET_TIME_SOUND(name, time){
  if (name in loadedSounds){
    loadedSounds[name].currentTime = time;
  } else {
    throwError("Invalid sound name: " + name);
  }
}

function L_SET_VOLUME_SOUND(name, vol){
  if(vol < 0 ){ vol = 0;}
  if(vol > 100){vol = 100;}
  if (name in loadedSounds){
    loadedSounds[name].volume = vol/100;
  } else {
    throwError("Invalid sound name: " + name);
  }
}

function L_GET_TIME_SOUND(name){
  if (name in loadedSounds){
    return loadedSounds[name].currentTime;
  } else {
    throwError("Invalid sound name: " + name);
    return 0;
  }
}

function L_GET_VOLUME_SOUND(name){
  if (name in loadedSounds){
    return Math.round(loadedSounds[name].volume * 100);
  } else {
    throwError("Invalid sound name: " + name);
    return 0;
  }
}


function L_KEY_PRESSED(){
  return keyIsPressed ? lastKeyPressed : 0;
}

function keyPressed() {
  lastKeyPressed = keyCode;
}