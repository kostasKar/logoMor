


 LM.drawCoordinates = function(p, length){
   p.strokeWeight(1);
   p.stroke('#ff0000');
   p.line(0,0,0,length,0,0);
   p.fill('#ff0000');
   p.push();
   p.translate(length,0,0);
   p.rotateZ(-p.PI/2);
   p.cone(1, 2, 20, 1,  true);
   p.pop();
   
   p.stroke('#00ff00');
   p.line(0,0,0,0,-length,0);
   p.fill('#00ff00');
   p.push();
   p.translate(0,-length,0);
   p.rotateX(p.PI);
   p.cone(1, 2, 20, 1,  true);
   p.pop();
   
   p.stroke('#0000ff');
   p.line(0,0,0,0,0,length);
   p.fill('#0000ff');
   p.push();
   p.translate(0,0,length);
   p.rotateX(p.PI/2);
   p.cone(1, 2, 20, 1,  true);
   p.pop();
   
   p.stroke(255);
 }
 
  LM.drawAvatar = function(p){
   p.strokeWeight(1);
   p.stroke('#888888');
   p.fill('#888888');
   p.push();
   p.rotateX(p.PI);
   p.translate(0, 6/2, 0);
   p.cone(3, 6, 5, 1, true);
   p.pop();
 
   p.stroke(255);
 }
 
LM.drawHelpArrows = function(p,radius){
   p.strokeWeight(1);
   p.textSize(5);

   p.push();
   p.noFill();
   p.stroke('#0000ff');
   p.arc(0, 0, 2*radius, 2*radius, -p.HALF_PI, 0);
   p.fill('#0000ff');
   p.text('rt', 0.75*radius, -0.75*radius);
   p.noStroke();
   p.fill('#0000ff88');
   p.arc(0, 0, 2*radius-2, 2*radius-2, -p.TWO_PI, 0);
   p.translate(radius, 0, 0);
   p.stroke('#0000ff');
   p.fill('#0000ff');
   p.cone(1, 2, 20, 1,  true);
   p.pop();

   p.push();
   p.rotateY(-p.HALF_PI);
   p.noFill();
   p.stroke('#ff0000');
   p.arc(0, 0, 2*radius, 2*radius, -p.HALF_PI, 0);
   p.fill('#ff0000');
   p.text('up', 0.75*radius, -0.75*radius);
   p.noStroke();
   p.fill('#ff000088');
   p.arc(0, 0, 2*radius-2, 2*radius-2, -p.TWO_PI, 0);
   p.translate(radius, 0, 0);
   p.stroke('#ff0000');
   p.fill('#ff0000');
   p.cone(1, 2, 20, 1,  true);
   p.pop();

   p.push();
   p.rotateX(p.HALF_PI);
   p.noFill();
   p.stroke('#00ff00');
   p.arc(0, 0, 2*radius, 2*radius, -p.HALF_PI, 0);
   p.fill('#00ff00');
   p.text('rr', 0.75*radius, -0.75*radius);
   p.noStroke();
   p.fill('#00ff0088');
   p.arc(0, 0, 2*radius-2, 2*radius-2, -p.TWO_PI, 0);
   p.translate(0, -radius, 0);
   p.rotateZ(p.HALF_PI);
   p.stroke('#00ff00');
   p.fill('#00ff00');
   p.cone(1, 2, 20, 1,  true);
   p.pop();

}
 