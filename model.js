
var loadedModels = {};
var currentModelIndex = 1;


function openModelFile() {
  document.getElementById('modelinp').click();
}

function readModelFile(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var newModel = new p5.Geometry();
    newModel = parseSTL(newModel, e.target.result);
    newModel.normalize();
    var name = "model" + currentModelIndex++;
    newModel.gid = name;
    loadedModels[name] = newModel;
    createListEntryForModel(name);
  }
  reader.readAsArrayBuffer(file)
}


function createListEntryForModel(name){
  var container = document.getElementById("modelsDiv");
  var modelDiv = document.createElement("div");
  modelDiv.className  = "modelDiv";
  modelDiv.id = name;
  var modelName = document.createElement("input");
  modelName.className = "modelName";
  modelName.value = name;
  modelName.name = name;
  modelName.onchange = function() {renameModel(this)};
  
  let sketch = function(p) {
    p.setup = function(){
      canvas = p.createCanvas(50, 50, WEBGL);
      canvas.style("visibility", "visible");
      canvas.style("display", "inline-block");
      canvas.style("margin-left", "15px");
      p.background(0);
      p.noStroke();
      p.lights();
      p.scale(0.25);
      p.model(loadedModels[name]);
    }
  };

  container.appendChild(modelDiv);
  modelDiv.appendChild(modelName);
  new p5(sketch, modelDiv);
}


function renameModel(el){
  var oldName = el.name;
  var newName = el.value.toLowerCase();
  if (oldName === newName){return;}
  loadedModels[newName] = loadedModels[oldName];
  delete loadedModels[oldName];
  el.name = newName;
  el.value = newName;
}



//Modified methods from p5.js

/**
 * STL files can be of two types, ASCII and Binary,
 *
 * We need to convert the arrayBuffer to an array of strings,
 * to parse it as an ASCII file.
 */
 function parseSTL(model, buffer) {
  if (isBinary(buffer)) {
    parseBinarySTL(model, buffer);
  } else {
    var reader = new DataView(buffer);

    if (!('TextDecoder' in window)) {
      console.warn(
        'Sorry, ASCII STL loading only works in browsers that support TextDecoder (https://caniuse.com/#feat=textencoder)'
        );

      return model;
    }

    var decoder = new TextDecoder('utf-8');
    var lines = decoder.decode(reader);
    var lineArray = lines.split('\n');
    parseASCIISTL(model, lineArray);
  }
  return model;
}

/**
 * This function checks if the file is in ASCII format or in Binary format
 *
 * It is done by searching keyword `solid` at the start of the file.
 *
 * An ASCII STL data must begin with `solid` as the first six bytes.
 * However, ASCII STLs lacking the SPACE after the `d` are known to be
 * plentiful. So, check the first 5 bytes for `solid`.
 *
 * Several encodings, such as UTF-8, precede the text with up to 5 bytes:
 * https://en.wikipedia.org/wiki/Byte_order_mark#Byte_order_marks_by_encoding
 * Search for `solid` to start anywhere after those prefixes.
 */
 function isBinary(data) {
  var reader = new DataView(data);

  // US-ASCII ordinal values for `s`, `o`, `l`, `i`, `d`
  var solid = [115, 111, 108, 105, 100];
  for (var off = 0; off < 5; off++) {
    // If "solid" text is matched to the current offset, declare it to be an ASCII STL.
    if (matchDataViewAt(solid, reader, off)) return false;
  }

  // Couldn't find "solid" text at the beginning; it is binary STL.
  return true;
}

/**
 * This function matches the `query` at the provided `offset`
 */
 function matchDataViewAt(query, reader, offset) {
  // Check if each byte in query matches the corresponding byte from the current offset
  for (var i = 0, il = query.length; i < il; i++) {
    if (query[i] !== reader.getUint8(offset + i, false)) return false;
  }

  return true;
}

/**
 * This function parses the Binary STL files.
 * https://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
 *
 * Currently there is no support for the colors provided in STL files.
 */
 function parseBinarySTL(model, buffer) {
  var reader = new DataView(buffer);

  // Number of faces is present following the header
  var faces = reader.getUint32(80, true);
  var r,
  g,
  b,
  hasColors = false,
  colors;
  var defaultR, defaultG, defaultB;

  // Binary files contain 80-byte header, which is generally ignored.
  for (var index = 0; index < 80 - 10; index++) {
    // Check for `COLOR=`
    if (
      reader.getUint32(index, false) === 0x434f4c4f /*COLO*/ &&
      reader.getUint8(index + 4) === 0x52 /*'R'*/ &&
      reader.getUint8(index + 5) === 0x3d /*'='*/
      ) {
      hasColors = true;
    colors = [];

    defaultR = reader.getUint8(index + 6) / 255;
    defaultG = reader.getUint8(index + 7) / 255;
    defaultB = reader.getUint8(index + 8) / 255;
      // To be used when color support is added
      // alpha = reader.getUint8(index + 9) / 255;
    }
  }
  var dataOffset = 84;
  var faceLength = 12 * 4 + 2;

  // Iterate the faces
  for (var face = 0; face < faces; face++) {
    var start = dataOffset + face * faceLength;
    var normalX = reader.getFloat32(start, true);
    var normalY = reader.getFloat32(start + 4, true);
    var normalZ = reader.getFloat32(start + 8, true);

    if (hasColors) {
      var packedColor = reader.getUint16(start + 48, true);

      if ((packedColor & 0x8000) === 0) {
        // facet has its own unique color
        r = (packedColor & 0x1f) / 31;
        g = ((packedColor >> 5) & 0x1f) / 31;
        b = ((packedColor >> 10) & 0x1f) / 31;
      } else {
        r = defaultR;
        g = defaultG;
        b = defaultB;
      }
    }
    var newNormal = new p5.Vector(normalX, normalY, normalZ);

    for (var i = 1; i <= 3; i++) {
      var vertexstart = start + i * 12;

      var newVertex = new p5.Vector(
        reader.getFloat32(vertexstart, true),
        reader.getFloat32(vertexstart + 4, true),
        reader.getFloat32(vertexstart + 8, true)
        );

      model.vertices.push(newVertex);
      model.vertexNormals.push(newNormal);

      if (hasColors) {
        colors.push(r, g, b);
      }
    }

    model.faces.push([3 * face, 3 * face + 1, 3 * face + 2]);
    model.uvs.push([0, 0], [0, 0], [0, 0]);
  }
  if (hasColors) {
    // add support for colors here.
  }
  return model;
}

/**
 * ASCII STL file starts with `solid 'nameOfFile'`
 * Then contain the normal of the face, starting with `facet normal`
 * Next contain a keyword indicating the start of face vertex, `outer loop`
 * Next comes the three vertex, starting with `vertex x y z`
 * Vertices ends with `endloop`
 * Face ends with `endfacet`
 * Next face starts with `facet normal`
 * The end of the file is indicated by `endsolid`
 */
 function parseASCIISTL(model, lines) {
  var state = '';
  var curVertexIndex = [];
  var newNormal, newVertex;

  for (var iterator = 0; iterator < lines.length; ++iterator) {
    var line = lines[iterator].trim();
    var parts = line.split(' ');

    for (var partsiterator = 0; partsiterator < parts.length; ++partsiterator) {
      if (parts[partsiterator] === '') {
        // Ignoring multiple whitespaces
        parts.splice(partsiterator, 1);
      }
    }

    if (parts.length === 0) {
      // Remove newline
      continue;
    }

    switch (state) {
      case '': // First run
      if (parts[0] !== 'solid') {
          // Invalid state
          console.error(line);
          console.error(
            'Invalid state "'.concat(parts[0], '", should be "solid"')
            );
          return;
        } else {
          state = 'solid';
        }
        break;

      case 'solid': // First face
      if (parts[0] !== 'facet' || parts[1] !== 'normal') {
          // Invalid state
          console.error(line);
          console.error(
            'Invalid state "'.concat(parts[0], '", should be "facet normal"')
            );

          return;
        } else {
          // Push normal for first face
          newNormal = new p5.Vector(
            parseFloat(parts[2]),
            parseFloat(parts[3]),
            parseFloat(parts[4])
            );

          model.vertexNormals.push(newNormal, newNormal, newNormal);
          state = 'facet normal';
        }
        break;

      case 'facet normal': // After normal is defined
      if (parts[0] !== 'outer' || parts[1] !== 'loop') {
          // Invalid State
          console.error(line);
          console.error(
            'Invalid state "'.concat(parts[0], '", should be "outer loop"')
            );
          return;
        } else {
          // Next should be vertices
          state = 'vertex';
        }
        break;

        case 'vertex':
        if (parts[0] === 'vertex') {
          //Vertex of triangle
          newVertex = new p5.Vector(
            parseFloat(parts[1]),
            parseFloat(parts[2]),
            parseFloat(parts[3])
            );

          model.vertices.push(newVertex);
          model.uvs.push([0, 0]);
          curVertexIndex.push(model.vertices.indexOf(newVertex));
        } else if (parts[0] === 'endloop') {
          // End of vertices
          model.faces.push(curVertexIndex);
          curVertexIndex = [];
          state = 'endloop';
        } else {
          // Invalid State
          console.error(line);
          console.error(
            'Invalid state "'.concat(
              parts[0],
              '", should be "vertex" or "endloop"'
              )
            );

          return;
        }
        break;

        case 'endloop':
        if (parts[0] !== 'endfacet') {
          // End of face
          console.error(line);
          console.error(
            'Invalid state "'.concat(parts[0], '", should be "endfacet"')
            );
          return;
        } else {
          state = 'endfacet';
        }
        break;

        case 'endfacet':
        if (parts[0] === 'endsolid') {
          // End of solid
        } else if (parts[0] === 'facet' && parts[1] === 'normal') {
          // Next face
          newNormal = new p5.Vector(
            parseFloat(parts[2]),
            parseFloat(parts[3]),
            parseFloat(parts[4])
            );

          model.vertexNormals.push(newNormal, newNormal, newNormal);
          state = 'facet normal';
        } else {
          // Invalid State
          console.error(line);
          console.error(
            'Invalid state "'.concat(
              parts[0],
              '", should be "endsolid" or "facet normal"'
              )
            );

          return;
        }
        break;

        default:
        console.error('Invalid state "'.concat(state, '"'));
        break;
      }
    }
    return model;
  }

