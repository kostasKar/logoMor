


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
 
function drawHelpArrows(r){
   strokeWeight(1);
   textSize(5);

   push();
   noFill();
   stroke('#0000ff');
   arc(0, 0, 2*r, 2*r, -HALF_PI, 0);
   fill('#0000ff');
   text('rt', 0.75*r, -0.75*r);
   noStroke();
   fill('#0000ff88');
   arc(0, 0, 2*r-2, 2*r-2, -TWO_PI, 0);
   translate(r, 0, 0);
   stroke('#0000ff');
   fill('#0000ff');
   cone(1, 2, 20, 1,  true);
   pop();

   push();
   rotateY(-HALF_PI);  
   noFill();
   stroke('#ff0000');
   arc(0, 0, 2*r, 2*r, -HALF_PI, 0);
   fill('#ff0000');
   text('up', 0.75*r, -0.75*r);
   noStroke();
   fill('#ff000088');
   arc(0, 0, 2*r-2, 2*r-2, -TWO_PI, 0);
   translate(r, 0, 0);
   stroke('#ff0000');
   fill('#ff0000');
   cone(1, 2, 20, 1,  true);
   pop();

   push();
   rotateX(HALF_PI); 
   noFill(); 
   stroke('#00ff00');
   arc(0, 0, 2*r, 2*r, -HALF_PI, 0);
   fill('#00ff00');
   text('rr', 0.75*r, -0.75*r);
   noStroke();
   fill('#00ff0088');
   arc(0, 0, 2*r-2, 2*r-2, -TWO_PI, 0);
   translate(0, -r, 0);
   rotateZ(HALF_PI);
   stroke('#00ff00');
   fill('#00ff00');
   cone(1, 2, 20, 1,  true);
   pop();

}
 