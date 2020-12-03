


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showVariablesNames() {
  document.getElementById("variablesNamesDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
  	clearFunctionListItems();
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function createSliderForVar(name, value){
	if (document.getElementById(name) != null){
		return;
	}
	document.getElementById("slidersClearButton").disabled = false;
	var container = document.getElementById("variablesDiv");
	var sliderContainer = document.createElement("div");
	sliderContainer.className  = "sliderContainer";
	var varNameLabel = document.createElement("label");
	varNameLabel.className = "sliderVarName";
	varNameLabel.innerText = name;
	var newSlider = document.createElement("input");
	newSlider.id = name;
	newSlider.type = "range";
	newSlider.min = Math.min(0, 10*value);
	newSlider.max = (value != 0)? Math.max(0, 10*value) : 10;
	newSlider.step = (Math.round(value)==value)? 1 : 0.1;
	newSlider.value = Number(value);
	newSlider.className  = "slider";
	newSlider.oninput= function(){this.nextElementSibling.value = this.value;};
	var sliderValue = document.createElement("output");
	sliderValue.value = value;
	container.appendChild(sliderContainer);
	sliderContainer.appendChild(varNameLabel);
	sliderContainer.appendChild(newSlider);
	sliderContainer.appendChild(sliderValue);
}

function clearSliders(){
  document.getElementById("slidersClearButton").disabled = true;	
  var sliderContainers = document.getElementsByClassName('sliderContainer');
  while(sliderContainers[0]) {
    sliderContainers[0].parentNode.removeChild(sliderContainers[0]);
  }
}



function createListItemForVar(name, initialValue){
	document.getElementById("slidersAddButton").disabled = false;
	var container = document.getElementById("variablesNamesDropdown");
	var liElement = document.createElement("li");
	liElement.id = name + "li";
	liElement.innerText = name;
	liElement.initValue = initialValue;
	liElement.className = "listItems";
	liElement.onclick = function() {createSliderForVar(this.innerText, this.initValue);}
	container.appendChild(liElement);
}

function clearListItems(){
  document.getElementById("slidersClearButton").disabled = true;
  document.getElementById("slidersAddButton").disabled = true;
  var variablesListItems = document.getElementsByClassName('listItems');
  while(variablesListItems[0]) {
    variablesListItems[0].parentNode.removeChild(variablesListItems[0]);
  }
}





function createFunctionListItems(){
	for (procName in procedurePrototypes){
		addFunctionListItemName(procName);
	}
}

function clearFunctionListItems(){
	var functionListItems = document.getElementsByClassName('functionListItems');
	while(functionListItems[0]){
		functionListItems[0].parentNode.removeChild(functionListItems[0]);
	}
}

function addFunctionListItemName(name){
	var container = document.getElementById("functionsNamesDropdown");
	var liElement = document.createElement("li");
	liElement.innerText = name;
	liElement.className = "functionListItems";
	liElement.onclick = function() {createManipulatorForFunc(this.innerText);}
	container.appendChild(liElement);
}

function showFunctionsNames(){
	createFunctionListItems();
	document.getElementById("functionsNamesDropdown").classList.toggle("show");
}

function clearFunctions(){
  var functionContainers = document.getElementsByClassName('functionManipulatorContainer');
  while(functionContainers[0]) {
    functionContainers[0].parentNode.removeChild(functionContainers[0]);
  }
}


function createManipulatorForFunc(name){
	if (document.getElementById(name) != null){
		return;
	}
	var proc = procedurePrototypes[name];
	var container = document.getElementById("functionsDiv");
	var functionManipulatorContainer = document.createElement("div");
	functionManipulatorContainer.id = name;
	functionManipulatorContainer.className = "functionManipulatorContainer";
	var functionNameLabel = document.createElement("label");
	functionNameLabel.innerText = name;
	functionNameLabel.className = "functionName"
	functionManipulatorContainer.appendChild(functionNameLabel);
	var functionRunButton = document.createElement("button");
	functionRunButton.innerText = "Run";
	functionRunButton.className = "dropbtn";
	functionRunButton.onclick = function (){runFunction(name);}
	functionManipulatorContainer.appendChild(functionRunButton);
	for (var paramName in proc.localVariables){
		var parameterDiv = document.createElement("div");
		parameterDiv.className ="functionParamSliderContainer";
		var parameterLabel = document.createElement("label");
		parameterLabel.className = "sliderVarName";
		parameterLabel.innerText = paramName;
		var newSlider = document.createElement("input");
		newSlider.id = name + paramName;
		newSlider.type = "range";
		newSlider.className  = "slider";
		newSlider.oninput= function(){this.nextElementSibling.value = this.value;};
		var sliderValue = document.createElement("output");
		functionManipulatorContainer.appendChild(parameterDiv);
		parameterDiv.appendChild(parameterLabel);
		parameterDiv.appendChild(newSlider);
		parameterDiv.appendChild(sliderValue);
	}
	container.appendChild(functionManipulatorContainer);

}

function runFunction(name){
	var sC = name + " ";
	var proc = procedurePrototypes[name];
	for (paramName in proc.localVariables){
		sC += document.getElementById(name+paramName).value + " ";
	}
	var temp = procedurePrototypes;
	parseLogo(sC);
	procedurePrototypes = temp;

}