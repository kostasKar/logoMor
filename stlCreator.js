LM.stlCreator = (function(){

  function saveSTLFile(stlText){
    if (stlText === ""){
      alert("Only solid objects drawings can be exported to STL\nTry creating one using the commands beginface, endface");
      return;
    }
    var blob = new Blob([stlText], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "logomorExport.stl";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  function createStlObject(){

    let out = [];
    let modelsBuf = LM.sketchBuffer.getModels();
    for (const m of modelsBuf){
      for (const f of m.faces){
        if ((new Set(f)).size !== f.length){ //only proceed if all elements unique
          continue;
        }
        let normalVector = m._getFaceNormal(m.faces.indexOf(f));
        out.push({
          normal: [normalVector.x, normalVector.y, normalVector.z],
          vertices: [m.vertices[f[0]], m.vertices[f[1]], m.vertices[f[2]]]
        });
      }
    }
    return out;
  }

  function stlObjToString(obj){
    if (obj.length === 0){
      return "";
    }
    let outputTxt = "";
    outputTxt += "solid logomor_solid \n";
    for (let f of obj){
      outputTxt += `\tfacet normal ${f.normal[0]} ${f.normal[1]} ${f.normal[2]}\n`;
      outputTxt += `\t\touter loop\n`;
      for (let v of f.vertices){
        outputTxt += `\t\t\tvertex ${v.x} ${v.y} ${v.z}\n`;
      }
      outputTxt += `\t\tendloop\n`;
      outputTxt += `\tendfacet\n`;
    }
    outputTxt += "endsolid \n";
    return outputTxt;
  }

  return {

    createASCIISTL: function(){
      saveSTLFile(stlObjToString(createStlObject()));
    }

  }

})();





















