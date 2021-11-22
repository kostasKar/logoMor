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
    initialize: function(){
      fov_min = radians(1);
      fov_max = radians(90);
      cameraEnabled = false;
      this.reset();
    },

    reset: function(){
      centerX = 0;
      centerY = 0;
      fov = radians(30);
      xRotation = 0;
      yRotation = 0;
      autoRotation_lastFrameCount = frameCount;
      autoRotation_lastYRotation = 0;
    },

    enable: function(){ 
      cameraEnabled = true;
    },

    disable: function(){ 
      cameraEnabled = false;
    },

    mouseWheelCallback: function(eventDelta) {
      if (cameraEnabled && isLooping()){  

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
      var cameraZ = (height/2.0) / tan(fov / 2.0);
      var aspect = width / height;
      perspective(fov, aspect, cameraZ/200.0, cameraZ*10.0);
      
      if (cameraEnabled && mouseIsPressed && (mouseButton == LEFT)) {
        xRotation += - (mouseY - pmouseY)/(height) * PI;
        yRotation += (mouseX - pmouseX)/(height) * PI;
      }
      
      if (cameraEnabled && mouseIsPressed && (mouseButton == CENTER)) {
        centerX += (mouseX - pmouseX) * (fov / 1.2);
        centerY += (mouseY - pmouseY) * (fov / 1.2);
      }

      if (document.getElementById("autoRotate").checked){
        yRotation = autoRotation_lastYRotation + (frameCount - autoRotation_lastFrameCount) * 0.015;
      } else {
        autoRotation_lastFrameCount = frameCount;
        autoRotation_lastYRotation = yRotation;
      }
      
      translate(centerX, centerY, 0);
      rotateX(xRotation);
      rotateY(yRotation);

      if (document.getElementById("avatarViewCheckbox").checked){
        logoMatrix.applyInverse();
      }

      document.getElementById("fpsValue").innerText = frameRate().toFixed(1);
      
    }
  }

})();





