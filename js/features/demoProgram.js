
LM.demoPrograms = (function(){

	let programmsArray = [{title: "Random Curve", version: "1.0"},
                        {title: "Bracelet", version: "1.0"},
                        {title: "Sierpinski Triangle", version: "1.0"},
                        {title: "3D Hilbert Curve", version: "1.0"},
                        {title: "Crazy Cubes", version: "1.0"},
                        {title: "Accelerating Sphere", version: "1.0"},
                        {title: "Flying Avatars", version: "1.0"},
                        {title: "Colorful Starfish", version: "1.0"},
                        {title: "Bouncing Ball", version: "1.0"},
                        {title: "Pinball", version: "1.0"},
                        {title: "Random Tree", version: "1.0"},
                        {title: "Sorting Algorithms", version: "1.0"},
                        {title: "TETRIS", version: "1.0"},
                        {title: "Conway's Game of Life", version: "1.0"},
                        {title: "Soccer Ball", version: "1.0"},
                        {title: "Solid Logomor Icon", version: "1.0"}];

	return {

		populateExamples: function(el){
			el = el.nextElementSibling;
			if (!el.firstChild){
				for(let i = 0; i < programmsArray.length; i++){
					let d = document.createElement("div");
					d.innerText = programmsArray[i].title;
					d.onclick = function () {
						document.getElementById("projectNameInputField").value = programmsArray[i].title;
            if (!programmsArray[i].codeText){
              const xhttp = new XMLHttpRequest();
              xhttp.onload = function () {
                if(this.status == 200){
                  programmsArray[i].codeText = this.responseText; 
                  LM.codeMirror.setValue(programmsArray[i].codeText);
                  LM.interpreter.setup();  
                }
              }
              xhttp.open("GET", "examples/" + programmsArray[i].title + ".txt?version=" + programmsArray[i].version, true);
              xhttp.send();
            } else {
              LM.codeMirror.setValue(programmsArray[i].codeText);
              LM.interpreter.setup();
            }
					}
					el.appendChild(d);
				}
			}
		},

	}

})();


