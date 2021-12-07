LM.sketchBuffer = (function(){

  let models = [];
  let currentModel;
  let currentModelIndex = 0;
  let currentVertexIndex = 0;
  let modelStarted = false;
  let modelIsDifferent = false;

  let primitives = [];
  let solids = [];
  let images = [];

  function setStyle(s, penDown = true){
    LM.p5Renderer.strokeWeight(s.weight);
    if (penDown) {
      LM.p5Renderer.stroke(s.r, s.g, s.b, s.a);
    } else {
      LM.p5Renderer.noStroke();
    }
    LM.p5Renderer.textSize(s.textSize);
    if (s.fill){
      LM.p5Renderer.fill(s.r, s.g, s.b, s.a);
    } else {
      LM.p5Renderer.noFill();
    }
  }

  function checkIfModelIsDifferentSoFar(){
    if(!modelIsDifferent){
      if((models[currentModelIndex]) &&
        (models[currentModelIndex].vertices[currentVertexIndex]) &&
        (models[currentModelIndex].vertices[currentVertexIndex].x === currentModel.vertices[currentVertexIndex].x) &&
        (models[currentModelIndex].vertices[currentVertexIndex].y === currentModel.vertices[currentVertexIndex].y) &&
        (models[currentModelIndex].vertices[currentVertexIndex].z === currentModel.vertices[currentVertexIndex].z)){
        return;
      } else {
        modelIsDifferent = true;
      }
    }
  }

  function displayAllModels(){
    models.splice(currentModelIndex);
    for(const m of models){
      setStyle(m.logoStyle);
      LM.p5Renderer.model(m);
    }
  }

  function displayAllPrimitives(){
    for(const p of primitives){
      if (p.type !== "arc"){
        p.style.fill = true;
      }
      if ((p.type === "arc")||(p.type === "point")){
        p.penDown = true;
      }
      setStyle(p.style, p.penDown);
      LM.p5Renderer.push();
      LM.p5Renderer.applyMatrix(p.matrix);
      LM.p5Renderer[p.type](...p.args);
      LM.p5Renderer.pop();
    }
  }

  function displayAllSolids(){
    for (const s of solids){
      s.style.fill = true;
      setStyle(s.style, s.penDown);
      LM.p5Renderer.push();
      LM.p5Renderer.applyMatrix(s.matrix);
      LM.p5Renderer.scale(s.scaleFactor);
      LM.p5Renderer.model(s.model);
      LM.p5Renderer.scale(1/s.scaleFactor);
      LM.p5Renderer.pop();
    }
  }

  function displayAllImages(){
    for(const im of images){
      let w = im.image.width;
      let h = im.image.height;
      let scaleFactor =  im.height/h;
      LM.p5Renderer.push();
      LM.p5Renderer.applyMatrix(im.matrix);
      LM.p5Renderer.image(im.image, 0, 0, w * scaleFactor, h * scaleFactor);
      LM.p5Renderer.pop();
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

    clear: function(){
      currentModelIndex = 0;
      primitives = [];
      solids = [];
      images = [];
    },

    drawBufferedItems: function(){
      displayAllModels();
      displayAllPrimitives();
      displayAllSolids();
      displayAllImages();
    },

    addPrimitive: function(style, penDown, matrix, type, ...args){
      primitives.push({type:type, style: Object.assign({},style), penDown: penDown, matrix: matrix, args: args});
    },

    addSolid: function(style, penDown, matrix, model, scaleFactor){
      solids.push({model:model, style: Object.assign({},style), penDown: penDown, matrix: matrix, scaleFactor: scaleFactor});
    },

    addImage: function(matrix, image, height){
      images.push({matrix: matrix, image: image, height: height});
    },

  }

})();