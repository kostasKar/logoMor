LM.modelMaker = (function(){

  let models = [];
  let currentModel;
  let currentModelIndex = 0;
  let currentVertexIndex = 0;

  let previousModels = [];


  function setStyle(s){
    LM.p5Renderer.strokeWeight(s.weight);
    LM.p5Renderer.stroke(s.r, s.g, s.b, s.a);
    LM.p5Renderer.noFill();
    LM.p5Renderer.textSize(s.textSize);
    if (s.fill){
      LM.p5Renderer.fill(s.r, s.g, s.b, s.a);
    }
  }

  return {

    startNewModel: function(style){
      currentModel = new p5.Geometry();
      currentModel.gid = Math.random().toString(36).substring(2);
      currentModel.logoStyle = Object.assign({}, style);
      currentVertexIndex = 0;
    },

    endNewModel: function(){
      if((previousModels[currentModelIndex]) && (JSON.stringify(currentModel.vertices) === JSON.stringify(previousModels[currentModelIndex].vertices))){
          currentModel.gid = previousModels[currentModelIndex].gid;
      }
      models.push(currentModel);
      currentModelIndex++;
    },

    addVertex: function(x, y, z){
      currentModel.vertices.push(new p5.Vector(x, y, z));
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
      currentVertexIndex++;
    },

    clearModels: function(){
      previousModels = [...models];
      models = [];
      currentModelIndex = 0;
    },

    displayAllModels: function(){
      for(const m of models){
        console.log(m.gid);
        setStyle(m.logoStyle);
        LM.p5Renderer.model(m);
      }
    }

  }

})();