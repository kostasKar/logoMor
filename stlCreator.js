LM.stlCreator = (function(){

  function saveSTLFile(stlText){
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

  return {

    createASCIISTL: function(){
      let feasible = false;
      let modelsBuf = LM.sketchBuffer.getModels();
      let outputTxt = "";
      outputTxt += "solid logomor_solid \n";
      for (const m of modelsBuf.filter(el => el.logoStyle.fill)){
        feasible = true;
        for (const f of m.faces){
          let normalVector = m._getFaceNormal(m.faces.indexOf(f));
          if ((normalVector.x === 0) && (normalVector.y === 0) && (normalVector.z === 0)){
            continue;
          }
          outputTxt += "\tfacet normal " + normalVector.x + " " + normalVector.y + " " + normalVector.z + "\n";
          outputTxt += "\t\touter loop\n"
          for (const vertexIndex of f){
            outputTxt += "\t\t\tvertex " + m.vertices[vertexIndex].x + " " + m.vertices[vertexIndex].y + " " + m.vertices[vertexIndex].z + "\n";
          }
          outputTxt += "\t\tendloop\n";
          outputTxt += "\tendfacet\n";
        }
      }
      outputTxt += "endsolid \n";
      if (feasible) {
        saveSTLFile(outputTxt);
      } else {
        alert("Only solid objects drawings can be exported to STL files\nTry creating one using the beginface, endface commands");
      }
    },

  }

})();





















