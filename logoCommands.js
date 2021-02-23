var penDown;
var showTurtle;
var strokeR, strokeG, strokeB, strokeWght, strokeAlpha, labelTextSize;
var shapeBegan;
var vertices;


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
  strokeWght = 1
  strokeR = 255;
  strokeG = 255;
  strokeB = 255;
  strokeAlpha = 255;
  labelTextSize = 10;

  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(10);
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
   stroke(r, g, b, strokeAlpha);
   fill(r, g, b, strokeAlpha);
   strokeR = r;
   strokeG = g;
   strokeB = b;
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
  return (cameraEnabled && mouseIsPressed);
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