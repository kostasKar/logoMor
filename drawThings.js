


 function drawCoordinates(length){
   p5Renderer.strokeWeight(1);
   p5Renderer.stroke('#ff0000');
   p5Renderer.line(0,0,0,length,0,0);
   p5Renderer.fill('#ff0000');
   p5Renderer.push();
   p5Renderer.translate(length,0,0);
   p5Renderer.rotateZ(-p5Renderer.PI/2);
   p5Renderer.cone(1, 2, 20, 1,  true);
   p5Renderer.pop();
   
   p5Renderer.stroke('#00ff00');
   p5Renderer.line(0,0,0,0,-length,0);
   p5Renderer.fill('#00ff00');
   p5Renderer.push();
   p5Renderer.translate(0,-length,0);
   p5Renderer.rotateX(p5Renderer.PI);
   p5Renderer.cone(1, 2, 20, 1,  true);
   p5Renderer.pop();
   
   p5Renderer.stroke('#0000ff');
   p5Renderer.line(0,0,0,0,0,length);
   p5Renderer.fill('#0000ff');
   p5Renderer.push();
   p5Renderer.translate(0,0,length);
   p5Renderer.rotateX(p5Renderer.PI/2);
   p5Renderer.cone(1, 2, 20, 1,  true);
   p5Renderer.pop();
   
   p5Renderer.stroke(255);
 }
 
  function drawAvatar(){
   p5Renderer.strokeWeight(1);
   p5Renderer.stroke('#888888');
   p5Renderer.fill('#888888');
   p5Renderer.push();
   p5Renderer.rotateX(p5Renderer.PI);
   p5Renderer.translate(0, 6/2, 0); 
   p5Renderer.cone(3, 6, 5, 1, true);
   p5Renderer.pop();
 
   p5Renderer.stroke(255);
 }
 
function drawHelpArrows(r){
   p5Renderer.strokeWeight(1);
   p5Renderer.textSize(5);

   p5Renderer.push();
   p5Renderer.noFill();
   p5Renderer.stroke('#0000ff');
   p5Renderer.arc(0, 0, 2*r, 2*r, -p5Renderer.HALF_PI, 0);
   p5Renderer.fill('#0000ff');
   p5Renderer.text('rt', 0.75*r, -0.75*r);
   p5Renderer.noStroke();
   p5Renderer.fill('#0000ff88');
   p5Renderer.arc(0, 0, 2*r-2, 2*r-2, -p5Renderer.TWO_PI, 0);
   p5Renderer.translate(r, 0, 0);
   p5Renderer.stroke('#0000ff');
   p5Renderer.fill('#0000ff');
   p5Renderer.cone(1, 2, 20, 1,  true);
   p5Renderer.pop();

   p5Renderer.push();
   p5Renderer.rotateY(-p5Renderer.HALF_PI);  
   p5Renderer.noFill();
   p5Renderer.stroke('#ff0000');
   p5Renderer.arc(0, 0, 2*r, 2*r, -p5Renderer.HALF_PI, 0);
   p5Renderer.fill('#ff0000');
   p5Renderer.text('up', 0.75*r, -0.75*r);
   p5Renderer.noStroke();
   p5Renderer.fill('#ff000088');
   p5Renderer.arc(0, 0, 2*r-2, 2*r-2, -p5Renderer.TWO_PI, 0);
   p5Renderer.translate(r, 0, 0);
   p5Renderer.stroke('#ff0000');
   p5Renderer.fill('#ff0000');
   p5Renderer.cone(1, 2, 20, 1,  true);
   p5Renderer.pop();

   p5Renderer.push();
   p5Renderer.rotateX(p5Renderer.HALF_PI); 
   p5Renderer.noFill(); 
   p5Renderer.stroke('#00ff00');
   p5Renderer.arc(0, 0, 2*r, 2*r, -p5Renderer.HALF_PI, 0);
   p5Renderer.fill('#00ff00');
   p5Renderer.text('rr', 0.75*r, -0.75*r);
   p5Renderer.noStroke();
   p5Renderer.fill('#00ff0088');
   p5Renderer.arc(0, 0, 2*r-2, 2*r-2, -p5Renderer.TWO_PI, 0);
   p5Renderer.translate(0, -r, 0);
   p5Renderer.rotateZ(p5Renderer.HALF_PI);
   p5Renderer.stroke('#00ff00');
   p5Renderer.fill('#00ff00');
   p5Renderer.cone(1, 2, 20, 1,  true);
   p5Renderer.pop();

}
 