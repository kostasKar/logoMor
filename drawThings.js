


 function drawCoordinates(length){
   strokeWeight(1);
   stroke('#ff0000');
   line(0,0,0,length,0,0);
   fill('#ff0000');
   push();
   translate(length,0,0);
   rotateZ(-PI/2);
   cone(1, 2, 20, 1,  true);
   pop();
   
   stroke('#00ff00');
   line(0,0,0,0,-length,0);
   fill('#00ff00');
   push();
   translate(0,-length,0);
   rotateX(PI);
   cone(1, 2, 20, 1,  true);
   pop();
   
   stroke('#0000ff');
   line(0,0,0,0,0,length);
   fill('#0000ff');
   push();
   translate(0,0,length);
   rotateX(PI/2);
   cone(1, 2, 20, 1,  true);
   pop();
   
   stroke(255);
 }
 
  function drawAvatar(){
   strokeWeight(1);
   stroke('#888888');
   fill('#888888');
   push();
   rotateX(PI);
   translate(0, 6/2, 0); 
   cone(3, 6, 5, 1, true);
   pop();
   
   stroke(255);
 }
 
 