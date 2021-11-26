/*
  Camera Manipulations:
  Left click and drag: Rotation
  Middle click and drag: Translation
  Mouse wheel: Zoom
  Double Click: Reset to initial camera view
*/


var cameraViewControl = (function (){

  var xRotation;
  var yRotation;
  var centerX;
  var centerY;
  var fov;
  var fov_min;
  var fov_max;
  var cameraEnabled;
  var autoRotation_lastFrameCount;
  var autoRotation_lastYRotation;

  return {
    getFov: function(){
      return fov;
    },

    getCenterCoordinates: function(){
      return {"x": centerX, "y": centerY};
    },

    isCameraEnabled: function(){
      return cameraEnabled;
    },

    initialize: function(){
      fov_min = p5Renderer.radians(1);
      fov_max = p5Renderer.radians(90);
      cameraEnabled = false;
      this.reset();
    },

    reset: function(){
      centerX = 0;
      centerY = 0;
      fov = p5Renderer.radians(30);
      xRotation = 0;
      yRotation = 0;
      autoRotation_lastFrameCount = p5Renderer.frameCount;
      autoRotation_lastYRotation = 0;
    },

    enable: function(){ 
      cameraEnabled = true;
    },

    disable: function(){ 
      cameraEnabled = false;
    },

    mouseWheelCallback: function(eventDelta) {
      if (cameraEnabled && p5Renderer.isLooping()){

        fov += (eventDelta > 0) ? 1/60 : -1/60;
        if (fov < fov_min){
          fov = fov_min;
        }
        else if (fov > fov_max){
          fov = fov_max;
        } 
      } 
    },

    adjust: function(){
      var cameraZ = (p5Renderer.height/2.0) / Math.tan(fov / 2.0);
      var aspect = p5Renderer.width / p5Renderer.height;
      p5Renderer.perspective(fov, aspect, cameraZ/200.0, cameraZ*10.0);
      
      if (cameraEnabled && p5Renderer.mouseIsPressed && (p5Renderer.mouseButton == p5Renderer.LEFT)) {
        xRotation += - (p5Renderer.mouseY - p5Renderer.pmouseY)/(p5Renderer.height) * Math.PI;
        yRotation += (p5Renderer.mouseX - p5Renderer.pmouseX)/(p5Renderer.height) * Math.PI;
      }
      
      if (cameraEnabled && p5Renderer.mouseIsPressed && (p5Renderer.mouseButton == p5Renderer.CENTER)) {
        centerX += (p5Renderer.mouseX - p5Renderer.pmouseX) * (fov / 1.2);
        centerY += (p5Renderer.mouseY - p5Renderer.pmouseY) * (fov / 1.2);
      }

      if (document.getElementById("autoRotate").checked){
        yRotation = autoRotation_lastYRotation + (p5Renderer.frameCount - autoRotation_lastFrameCount) * 0.015;
      } else {
        autoRotation_lastFrameCount = p5Renderer.frameCount;
        autoRotation_lastYRotation = yRotation;
      }

      p5Renderer.translate(centerX, centerY, 0);
      p5Renderer.rotateX(xRotation);
      p5Renderer.rotateY(yRotation);

      if (document.getElementById("avatarViewCheckbox").checked){
        logoMatrix.applyInverse();
      }

      document.getElementById("fpsValue").innerText = p5Renderer.frameRate().toFixed(1);
      
    }
  }

})();





