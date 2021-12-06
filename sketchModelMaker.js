LM.modelMaker = (function(){

  let models = [];
  let currentModel;
  let currentModelIndex = 0;
  let currentVertexIndex = 0;
  let modelStarted = false;
  let modelIsDifferent = false;

  function setStyle(s){
    LM.p5Renderer.strokeWeight(s.weight);
    LM.p5Renderer.stroke(s.r, s.g, s.b, s.a);
    LM.p5Renderer.noFill();
    LM.p5Renderer.textSize(s.textSize);
    if (s.fill){
      LM.p5Renderer.fill(s.r, s.g, s.b, s.a);
    }
  }

  function checkIfModelIsDifferentSoFar(){
    if(!modelIsDifferent){
      if((models[currentModel]) &&
        (models[currentModel].vertices[currentVertexIndex]) &&
        (models[currentModelIndex].vertices[currentVertexIndex].x === currentModel.vertices[currentVertexIndex].x) &&
        (models[currentModelIndex].vertices[currentVertexIndex].y === currentModel.vertices[currentVertexIndex].y) &&
        (models[currentModelIndex].vertices[currentVertexIndex].z === currentModel.vertices[currentVertexIndex].z)){
        return;
      } else {
        modelIsDifferent = true;
      }
    }
  }

  return {

    startNewModel: function(style){
      currentModel = new p5.Geometry();
      currentModel.gid = Math.random().toString(36).substring(2);
      currentModel.logoStyle = Object.assign({}, style);
      currentVertexIndex = 0;
      modelStarted = true;
      modelIsDifferent = false;
    },

    endNewModel: function(){
      //discard any undrawable model
      if(currentModel.vertices.length < 2){
        return;
      }
      if(!modelIsDifferent){
          currentModel.gid = models[currentModelIndex].gid;
      }
      models.splice(currentModelIndex, 1, currentModel);
      currentModelIndex++;
      modelStarted = false;
    },

    endAnyPendingModel: function(){
      if(modelStarted){
        this.endNewModel();
      }
    },

    addVertex: function(x, y, z){
      currentModel.vertices.push(new p5.Vector(x, y, z));
      checkIfModelIsDifferentSoFar();
      if(currentModel.logoStyle.fill){
        if (currentVertexIndex >= 2){
          currentModel.faces.push([currentVertexIndex -2, currentVertexIndex - 1, currentVertexIndex]);
        }
      } else {
        currentModel.faces.push([currentVertexIndex -1, currentVertexIndex, currentVertexIndex]);
      }
      currentVertexIndex++;
    },

    addStartVertex: function(x, y, z){
      currentModel.vertices.push(new p5.Vector(x, y, z));
      checkIfModelIsDifferentSoFar();
      currentVertexIndex++;
    },

    clearModels: function(){
      currentModelIndex = 0;
    },

    displayAllModels: function(){
      models.splice(currentModelIndex);
      for(const m of models){
        setStyle(m.logoStyle);
        LM.p5Renderer.model(m);
      }
    }

  }

})();