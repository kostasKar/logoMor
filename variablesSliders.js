


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showVariablesNames() {
  document.getElementById("variablesNamesDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
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
	newSlider.oninput= function(){
		this.nextElementSibling.value = this.value;
		if (!isLooping()){
			redraw();
		}
	};
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
