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

 function LOGO_FORWARD(length){
   if (penDown){
     line(0, 0, 0, 0, -length, 0);
   }
   translate(0, -length, 0);
   logoTranslate(0, -length, 0);
 }
 
  function LOGO_BACKWARD(length){
   if (penDown){
     line(0, 0, 0, 0, length, 0);
   }
   translate(0, length, 0);
   logoTranslate(0, length, 0);
 }
 
 function LOGO_RIGHT(angle){
   rotateZ(radians(angle));
   logoRotateZ(radians(angle));
 }
 
  function LOGO_LEFT(angle){
   rotateZ(radians(-angle));
   logoRotateZ(radians(-angle));
 }
 
 function LOGO_UP(angle){
   rotateX(radians(-angle));
   logoRotateX(radians(-angle));
 }
 
  function LOGO_DOWN(angle){
   rotateX(radians(angle));
   logoRotateX(radians(angle));
 }
 
  function LOGO_ROLLRIGHT(angle){
   rotateY(radians(angle));
   logoRotateY(radians(angle));
 }
 
   function LOGO_ROLLLEFT(angle){
   rotateY(radians(-angle));
   logoRotateY(radians(-angle));
 }
 
 function LOGO_PENDOWN(){
  penDown = true;
 }
 
  function LOGO_PENUP(){
  penDown = false;
 }
 
 function LOGO_SETPENSIZE(n){
   strokeWeight(n);
 }
 
 function LOGO_COLOR(r, g, b){
   stroke(r, g, b);
 } 

 function LOGO_LABEL(word){
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

