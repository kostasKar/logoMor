/*
  Camera Manipulations:
  Left click and drag: Rotation
  Middle click and drag: Translation
  Mouse wheel: Zoom
  Double Click: Reset to initial camera view
*/


LM.cameraViewControl = (function (){

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
      fov_min = LM.p5Renderer.radians(1);
      fov_max = LM.p5Renderer.radians(90);
      cameraEnabled = false;
      this.reset();
    },

    reset: function(){
      centerX = 0;
      centerY = 0;
      fov = LM.p5Renderer.radians(30);
      xRotation = 0;
      yRotation = 0;
      autoRotation_lastFrameCount = LM.p5Renderer.frameCount;
      autoRotation_lastYRotation = 0;
    },

    enable: function(){ 
      cameraEnabled = true;
    },

    disable: function(){ 
      cameraEnabled = false;
    },

    isEnabled: function(){
      return cameraEnabled;
    },

    mouseWheelCallback: function(eventDelta) {
      if (cameraEnabled && LM.p5Renderer.isLooping()){

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
      var cameraZ = (LM.p5Renderer.height/2.0) / Math.tan(fov / 2.0);
      var aspect = LM.p5Renderer.width / LM.p5Renderer.height;
      LM.p5Renderer.perspective(fov, aspect, cameraZ/200.0, cameraZ*10.0);
      
      if (cameraEnabled && LM.p5Renderer.mouseIsPressed && (LM.p5Renderer.mouseButton == LM.p5Renderer.LEFT)) {
        xRotation += - (LM.p5Renderer.mouseY - LM.p5Renderer.pmouseY)/(LM.p5Renderer.height) * Math.PI;
        yRotation += (LM.p5Renderer.mouseX - LM.p5Renderer.pmouseX)/(LM.p5Renderer.height) * Math.PI;
      }
      
      if (cameraEnabled && LM.p5Renderer.mouseIsPressed && (LM.p5Renderer.mouseButton == LM.p5Renderer.CENTER)) {
        centerX += (LM.p5Renderer.mouseX - LM.p5Renderer.pmouseX) * (fov / 1.2);
        centerY += (LM.p5Renderer.mouseY - LM.p5Renderer.pmouseY) * (fov / 1.2);
      }

      if (document.getElementById("autoRotate").checked){
        yRotation = autoRotation_lastYRotation + (LM.p5Renderer.frameCount - autoRotation_lastFrameCount) * 0.015;
      } else {
        autoRotation_lastFrameCount = LM.p5Renderer.frameCount;
        autoRotation_lastYRotation = yRotation;
      }

      LM.p5Renderer.translate(centerX, centerY, 0);
      LM.p5Renderer.rotateX(xRotation);
      LM.p5Renderer.rotateY(yRotation);

      if (document.getElementById("avatarViewCheckbox").checked){
        LM.matrix.applyInverse();
      }

      document.getElementById("fpsValue").innerText = LM.p5Renderer.frameRate().toFixed(1);
      
    }
  }

})();





