var logoImages = (function(){

  var loadedImages = {};
  var currentImageIndex = 1;

  function createListEntryForImage(name){
    var container = document.getElementById("imagesDiv");
    var imageDiv = document.createElement("div");
    imageDiv.className  = "imageDiv";
    imageDiv.id = name;
    var imageName = document.createElement("input");
    imageName.className = "imageName codeFont";
    imageName.value = name;
    imageName.name = name;
    imageName.onchange = function() {renameImage(this)};
    
    let sketch = function(p) {
      p.setup = function(){
        var w = loadedImages[name].width;
        var h = loadedImages[name].height;
        var ratio = 50/h;
        canvas = p.createCanvas(w*ratio, 50, p.WEBGL);
        canvas.style("visibility", "visible");
        canvas.style("display", "inline-block");
        canvas.style("margin-left", "15px");
        canvas.style("position", "absolute");
        p.background(0);
        p.noStroke();
        p.lights();
        p.image(loadedImages[name], -(w*ratio/2), -25, w*ratio, 50);
        p.noLoop();
      }
    };

    container.appendChild(imageDiv);
    imageDiv.appendChild(imageName);
    new p5(sketch, imageDiv);

    var deleteButton = document.createElement("button");
    deleteButton.className = "fa fa-times deleteImageButton";
    deleteButton.style.marginLeft = 30 + loadedImages[name].width / loadedImages[name].height * 50 + 'px';
    deleteButton.onclick = function() {removeImage(this.parentNode.id)};
    imageDiv.appendChild(deleteButton);
  }


  function renameImage(el){
    var oldName = el.name;
    var newName = el.value.toLowerCase();
    if (oldName === newName){return;}
    loadedImages[newName] = loadedImages[oldName];
    delete loadedImages[oldName];
    el.name = newName;
    el.value = newName;
  }


  function removeImage(name){
    var element = document.getElementById(name);
    element.parentNode.removeChild(element);
    var imageName =  Object.keys(loadedImages).filter(imageName => loadedImages[imageName].gid === name);
    delete loadedImages[imageName[0]];
  }


  return {

    imageExists: function(name){
      return (name in loadedImages);
    },

    assertExists: function(name){
      if(this.imageExists(name)){
        return true;
      } else {
        throwError("Invalid image name: " + name);
        return false;
      }
    },

    getImage: function(name){
      return loadedImages[name];
    },

    openImageFile: function() {
      document.getElementById('imageinp').click();
    },

    readImageFile: function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      if (file.type.includes('image')){
        var pImg = new p5.Image(1,1);
        reader.onload = function(e) {
          var img = new Image();

          img.onload = function() {
            pImg.width = pImg.canvas.width = img.width;
            pImg.height = pImg.canvas.height = img.height;
            pImg.drawingContext.drawImage(img, 0, 0);
            pImg.modified = true;
            var name = "image" + currentImageIndex++;
            pImg.gid = name;
            loadedImages[name] = pImg;
            createListEntryForImage(name);
          }

          var base64Str = reader.result;
          img.crossOrigin = 'Anonymous';
          img.src = base64Str;
        }
        reader.readAsDataURL(file);
      }
    }

  }


})();










