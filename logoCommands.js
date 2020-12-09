var penDown;
var showTurtle;
var strokeR, strokeG, strokeB, strokeWght;
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
  stroke(255);
  strokeWeight(1);
  fill(255);
}

function restoreStrokeStyle(){
  strokeWeight(strokeWght);
  stroke(strokeR, strokeG, strokeB);
  fill(strokeR, strokeG, strokeB);
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

function SHOWTURTLE(){
  showTurtle = true;
}

function HIDETURTLE(){
  showTurtle = false;
}

function BEGINSHAPE(){
  shapeBegan = true;
  vertices = [];
  addVertex();
}

function ENDSHAPE(){
  shapeBegan = false;
  makeShape();
  vertices = [];
}

 function FORWARD(length){
   if (penDown){
    line(0, 0, 0, 0, -length, 0);
   }
   translate(0, -length, 0);
   logoTranslate(0, -length, 0);
   if (penDown && shapeBegan){
    addVertex();
   }
 }
 
  function BACKWARD(length){
   if (penDown){
     line(0, 0, 0, 0, length, 0);
   }
   translate(0, length, 0);
   logoTranslate(0, length, 0);
   if (penDown && shapeBegan){
    addVertex();
   }
 }
 
 function RIGHTTURN(angle){
   rotateZ(radians(angle));
   logoRotateZ(radians(angle));
 }
 
  function LEFTTURN(angle){
   rotateZ(radians(-angle));
   logoRotateZ(radians(-angle));
 }
 
 function UP(angle){
   rotateX(radians(-angle));
   logoRotateX(radians(-angle));
 }
 
  function DOWN(angle){
   rotateX(radians(angle));
   logoRotateX(radians(angle));
 }
 
  function ROLLRIGHT(angle){
   rotateY(radians(angle));
   logoRotateY(radians(angle));
 }
 
   function ROLLLEFT(angle){
   rotateY(radians(-angle));
   logoRotateY(radians(-angle));
 }
 
 function PENDOWN(){
  penDown = true;
 }
 
  function PENUP(){
  penDown = false;
 }
 
 function SETPENSIZE(n){
   strokeWeight(n);
   strokeWght = n;
 }
 
 function COLOR(r, g, b){
   stroke(r, g, b);
   fill(r, g, b);
   strokeR = r;
   strokeG = g;
   strokeB = b;
 } 

 function LABEL(word){
   text(word, 0, 0);
 }



 
  function HOME(){
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
 
  function GETX(){
   return getlmX();
 }
 
  function GETY(){
   return - getlmY();
 }
 
  function GETZ(){
   return getlmZ();
 }

  function SETX(newX){
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

function SETY(newY){
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

function SETZ(newZ){
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
 

function SETXYZ(newX, newY, newZ){
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

function MOUSEX(){
  return  (mouseX - width/2)*(fov / 1.2) - centerX ;
}

function MOUSEY(){
  return -((mouseY - height/2)*(fov / 1.2) - centerY);
}

function MOUSEPRESSED(){
  return mouseIsPressed;
}