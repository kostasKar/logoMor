var penDown;
var showTurtle;
var strokeR, strokeG, strokeB, strokeWght, labelTextSize;
var shapeBegan;
var vertices;


function makeShape(){
  pop();
  push();
  restoreStrokeStyle(); //for the stroke color
  fill(strokeR, strokeG, strokeB, 230); //like restoreStrokeStyle but with transparency
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i][0], vertices[i][1], vertices[i][2]);
  } 
  endShape();
  applyLogoTransformationMatrix();
  restoreStrokeStyle();
}

function addVertex(){
  vertices.push([getlmX(), getlmY(), getlmZ()]);
}


function initStrokeStyle(){
  strokeWght = 1
  strokeR = 255;
  strokeG = 255;
  strokeB = 255;
  labelTextSize = 10;

  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(10);
}

function restoreStrokeStyle(){
  strokeWeight(strokeWght);
  stroke(strokeR, strokeG, strokeB);
  fill(strokeR, strokeG, strokeB);
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
    drawCoordinates(10);
    drawAvatar();
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
   stroke(r, g, b);
   fill(r, g, b);
   strokeR = r;
   strokeG = g;
   strokeB = b;
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

  function L_SETX(newX){
   pop();
   push();
   restoreStrokeStyle();
   if (penDown){
     line(getlmX(), getlmY(), getlmZ(), newX, getlmY(), getlmZ());
   } 
   setlmX(newX);
   applyLogoTransformationMatrix(); 
   if (penDown && shapeBegan){
    addVertex();
   }
 }

function L_SETY(newY){
   pop();
   push();
   restoreStrokeStyle();
  if (penDown){
     line(getlmX(), getlmY(), getlmZ(), getlmX(), -newY, getlmZ());
   }
   setlmY(-newY);
   applyLogoTransformationMatrix(); 
   if (penDown && shapeBegan){
    addVertex();
   }
 }

function L_SETZ(newZ){
   pop();
   push();
   restoreStrokeStyle();
   if (penDown){
     line(getlmX(), getlmY(), getlmZ(), getlmX(), getlmY(), newZ);
   }
   setlmZ(newZ);
   applyLogoTransformationMatrix(); 
   if (penDown && shapeBegan){
    addVertex();
   }
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

function L_MOUSEX(){
  return  (mouseX - width/2)*(fov / 1.2) - centerX ;
}

function L_MOUSEY(){
  return -((mouseY - height/2)*(fov / 1.2) - centerY);
}

function L_MOUSEPRESSED(){
  return mouseIsPressed;
}