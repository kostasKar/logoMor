
LM.demoPrograms = (function(){

	let programmsArray = [{title: "Random Curve"},
                        {title: "Bracelet"},
                        {title: "Sierpinski Triangle"},
						{title: "3D Hilbert Curve"},
                        {title: "Crazy Cubes"},
                        {title: "Accelerating Sphere"},
                        {title: "Flying Avatars"},
                        {title: "Colorful Starfish"},
                        {title: "Bouncing Ball"},
                        {title: "Pinball"},
                        {title: "Fibonacci Spiral"},
                        {title: "Sorting Algorithms"},
                        {title: "TETRIS"},
                        {title: "Conway's Game of Life"},
                        {title: "Soccer Ball"},
                        {title: "Solid Logomor Icon"}];

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
              xhttp.open("GET", "examples/" + programmsArray[i].title + ".txt", true);
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


