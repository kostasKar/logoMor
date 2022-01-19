/*
  Camera Manipulations:
  Left click and drag: Rotation
  Middle click and drag: Translation
  Mouse wheel: Zoom
  Double Click: Reset to initial camera view
*/


LM.cameraViewControl = (function (){

  let xRotation;
  let yRotation;
  let centerX;
  let centerY;
  let fov;
  let fov_min;
  let fov_max;
  let cameraEnabled;
  let autoRotation_lastFrameCount;
  let autoRotation_lastYRotation;
  let autoRotate = false;
  let avatarView = false;

  let lightSourceSetting = false;
  let lightSourceDirX = 0;
  let lightSourceDirY = 0;

  return {
    setLightSourceSettingMode: function(enabled){
      lightSourceSetting = enabled;
    },

    isLightSourceSettingModeEnabled: function(){
      return lightSourceSetting;
    },

    setLightSource: function(x, y){
      lightSourceDirX = -(x / LM.p5Renderer.width - 0.5) * 2;
      lightSourceDirY = -(y / LM.p5Renderer.height - 0.5) * 2;
    },

    toggleAutoRotate: function(){
      autoRotate = !autoRotate;
    },

    toggleAvatarView: function(){
      avatarView = !avatarView;
    },

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

      LM.p5Renderer.ambientLight(128, 128, 128);
      LM.p5Renderer.directionalLight(128, 128, 128, lightSourceDirX, lightSourceDirY, -1)

      var cameraZ = (LM.p5Renderer.height/2.0) / Math.tan(fov / 2.0);
      var aspect = LM.p5Renderer.width / LM.p5Renderer.height;
      LM.p5Renderer.perspective(fov, aspect, cameraZ/200.0, cameraZ*10.0);

      if (!lightSourceSetting) {
        if (cameraEnabled && LM.p5Renderer.mouseIsPressed && (LM.p5Renderer.mouseButton == LM.p5Renderer.LEFT)) {
          xRotation += -(LM.p5Renderer.mouseY - LM.p5Renderer.pmouseY) / (LM.p5Renderer.height) * Math.PI;
          yRotation += (LM.p5Renderer.mouseX - LM.p5Renderer.pmouseX) / (LM.p5Renderer.height) * Math.PI;
        }

        if (cameraEnabled && LM.p5Renderer.mouseIsPressed && (LM.p5Renderer.mouseButton == LM.p5Renderer.CENTER)) {
          centerX += (LM.p5Renderer.mouseX - LM.p5Renderer.pmouseX) * (fov / 1.2);
          centerY += (LM.p5Renderer.mouseY - LM.p5Renderer.pmouseY) * (fov / 1.2);
        }
      }

      if (autoRotate){
        yRotation = autoRotation_lastYRotation + (LM.p5Renderer.frameCount - autoRotation_lastFrameCount) * 0.015;
      } else {
        autoRotation_lastFrameCount = LM.p5Renderer.frameCount;
        autoRotation_lastYRotation = yRotation;
      }

      LM.p5Renderer.translate(centerX, centerY, 0);
      LM.p5Renderer.rotateX(xRotation);
      LM.p5Renderer.rotateY(yRotation);

      if (avatarView){
        LM.matrix.applyInverse();
      }

      document.getElementById("fpsValue").innerText = LM.p5Renderer.frameRate().toFixed(1);
      
    }
  }

})();





