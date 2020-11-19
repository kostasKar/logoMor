var penDown;


function logoStart(){
  drawCoordinates(25);
  penDown = true;
  strokeWeight(1);
  stroke(255);
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
 
  function LEFT(angle){
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
 }
 
 function COLOR(r, g, b){
   stroke(r, g, b);
 } 

 function LABEL(word){
   fill(255);
   text(word, 0, 0);
 }



 
  function HOME(){
   pop();
   push();
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
   if (penDown){
     line(getlmX(), getlmY(), getlmZ(), newX, getlmY(), getlmZ());
   } 
   setlmX(newX);
   applyLogoTransformationMatrix(); 
 }

function SETY(newY){
   pop();
   push();
  if (penDown){
     line(getlmX(), getlmY(), getlmZ(), getlmX(), -newY, getlmZ());
   }
   setlmY(-newY);
   applyLogoTransformationMatrix(); 
 }

function SETZ(newZ){
   pop();
   push();
   if (penDown){
     line(getlmX(), getlmY(), getlmZ(), getlmX(), getlmY(), newZ);
   }
   setlmZ(newZ);
   applyLogoTransformationMatrix(); 
 }
 

function SETXYZ(newX, newY, newZ){
   pop();
   push();
   if (penDown){
     line(getlmX(), getlmY(), getlmZ(), newX, -newY, newZ);
   }
   setlmX(newX);
   setlmY(-newY);
   setlmZ(newZ);
   applyLogoTransformationMatrix(); 
 }

