LM.sketchBuffer = (function(){

  let models = [];
  let currentModel = {};
  let currentModelIndex = 0;
  let currentVertexIndex = 0;
  let modelStarted = false;
  let modelIsDifferent = false;
  let faceStarted = false;
  let faceVertexModulo = 0;

  let primitives = [];
  let solids = [];
  let images = [];

  function setStyle(s){
    LM.p5Renderer.strokeWeight(s.weight);
    if (s.penDown) {
      LM.p5Renderer.stroke(s.r, s.g, s.b, s.a);
    } else {
      LM.p5Renderer.noStroke();
    }
    LM.p5Renderer.textSize(s.textSize);
    LM.p5Renderer.fill(s.r, s.g, s.b, s.a);
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
      if ((p.type === "arc")||(p.type === "point")){
        p.style.penDown = true;
      }
      setStyle(p.style);
      if (p.type === "arc"){
        LM.p5Renderer.noFill();
      }
      LM.p5Renderer.push();
      LM.p5Renderer.applyMatrix(p.matrix);
      LM.p5Renderer[p.type](...p.args);
      LM.p5Renderer.pop();
    }
  }

  function displayAllSolids(){
    for (const s of solids){
      setStyle(s.style);
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
      if((Object.keys(currentModel).length === 0) || (JSON.stringify(style) !== JSON.stringify(currentModel.logoStyle))){
        if (Object.keys(currentModel).length !== 0){
          this.endNewModel();
        }
        currentModel = new p5.Geometry();
        currentModel.gid = Math.random().toString(36).substring(2);
        currentModel.logoStyle = Object.assign({}, style);
        currentVertexIndex = 0;
        modelStarted = true;
        modelIsDifferent = false;
      }
    },

    endNewModel: function(){
      //discard any non drawable model
      if(currentModel.faces.length === 0){
        return;
      }

      //close any open solid face
      if ((faceStarted) && ((currentVertexIndex % 2) === faceVertexModulo)){
        currentModel.faces.push([currentVertexIndex -2, currentVertexIndex - 1, 0]);
      }

      if((!modelIsDifferent) && (currentModel.vertices.length === models[currentModelIndex].vertices.length)){
          currentModel.gid = models[currentModelIndex].gid;
      }
      models.splice(currentModelIndex, 1, currentModel);
      currentModelIndex++;
      modelStarted = false;
    },

    startFace: function(){
      faceStarted = true;
      faceVertexModulo = currentVertexIndex % 2;
    },

    endFace: function(){
      faceStarted = false;
    },

    endAnyPendingModel: function(){
      if(modelStarted){
        this.endNewModel();
      }
    },

    addVertex: function(x, y, z){
      currentModel.vertices.push(new p5.Vector(x, y, z));
      currentModel.vertexNormals.push(new p5.Vector());
      checkIfModelIsDifferentSoFar();
      if(faceStarted){ //so we are making a solid
        if ((currentVertexIndex >= 2) && ((currentVertexIndex % 2) === faceVertexModulo)){
          currentModel.faces.push([currentVertexIndex -2, currentVertexIndex - 1, currentVertexIndex]);
          let vertexNormal = currentModel._getFaceNormal(currentModel.faces.length - 1);
          currentModel.vertexNormals[currentVertexIndex].add(vertexNormal);
          currentModel.vertexNormals[currentVertexIndex - 1].add(vertexNormal);
          currentModel.vertexNormals[currentVertexIndex - 2].add(vertexNormal);
        }
      } else {
        currentModel.faces.push([currentVertexIndex -1, currentVertexIndex, currentVertexIndex]);
      }
      currentVertexIndex++;
    },

    addStartVertex: function(x, y, z){
      currentModel.vertices.push(new p5.Vector(x, y, z));
      currentModel.vertexNormals.push(new p5.Vector());
      checkIfModelIsDifferentSoFar();
      currentVertexIndex++;
    },

    init: function(){
      currentModel = {};
      currentModelIndex = 0;
      primitives = [];
      solids = [];
      images = [];
    },

    clear: function(){
      this.init();
      models = [];
    },

    drawBufferedItems: function(){
      displayAllModels();
      displayAllPrimitives();
      displayAllSolids();
      displayAllImages();
    },

    addPrimitive: function(style, matrix, type, ...args){
      primitives.push({type:type, style: Object.assign({},style), matrix: matrix, args: args});
    },

    addSolid: function(style, matrix, model, scaleFactor){
      solids.push({model:model, style: Object.assign({},style), matrix: matrix, scaleFactor: scaleFactor});
    },

    addImage: function(matrix, image, height){
      images.push({matrix: matrix, image: image, height: height});
    },

    getModels: function(){
      return models;
    }

  }

})();