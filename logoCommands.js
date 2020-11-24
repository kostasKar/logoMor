var penDown;
var strokeR, strokeG, strokeB, strokeWght;



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
  initStrokeStyle();
  push();
  resetLogoTransformationMatrix();
}

function logoEnd(){
  drawCoordinates(10);  
  drawAvatar();
  pop();
}

 function FORWARD(length){
   if (penDown){
     line(0, 0, 0, 0, -length, 0);
   }
   translate(0, -length, 0);
   logoTranslate(0, -length, 0);
 }
 
  function BACKWARD(length){
   if (penDown){
     line(0, 0, 0, 0, length, 0);
   }
   translate(0, length, 0);
   logoTranslate(0, length, 0);
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
   text(word, 3, 0); //next to the avatars radius
 }



 
  function HOME(){
   pop();
   push();
   restoreStrokeStyle();
   if (penDown){
     line(0, 0, 0, getlmX(), getlmY(), getlmZ());
   }
  resetLogoTransformationMatrix(); 
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
 }

