LM.variableManipulatorsSliders = (function(){

	function createSliderForVar(name, value){
		if (document.getElementById(name + "slider") != null){
			return;
		}
		document.getElementById("slidersClearButton").disabled = false;
		var container = document.getElementById("variablesDiv");
		var sliderContainer = document.createElement("div");
		sliderContainer.className  = "sliderContainer";

		var sliderNameValueDiv = document.createElement("div");
		sliderNameValueDiv.className = "sliderNameValue";

		var varNameLabel = document.createElement("label");
		varNameLabel.className = "sliderVarName codeFont";
		varNameLabel.innerText = name + ":";
		var numOfNameLetters = name.length;
		var initialFontSize = 14;
		var maxNumOfLetters = 10;
		if(numOfNameLetters > maxNumOfLetters){
			varNameLabel.style.fontSize = (initialFontSize * maxNumOfLetters / numOfNameLetters ) + 'px';
		}
		
		var sliderValue = document.createElement("output");
		sliderValue.className = "sliderValue codeFont";
		sliderValue.value = value;

		var slider = document.createElement("input");
		slider.id = name + "slider";
		slider.type = "range";
		slider.min = Math.min(0, 10*value);
		slider.max = (value != 0)? Math.max(0, 10*value) : 10;
		slider.step = (Math.round(value)==value)? 1 : 0.1;
		slider.value = Number(value);
		slider.className  = "slider";
		slider.oninput= function(){
			sliderValue.value = this.value;
			LM.retainMode.fireExecution();
		};

		var maxLabel = document.createElement("label");
		maxLabel.className = "rangeLabel";
		maxLabel.innerText = "Max"
		var minLabel = document.createElement("label");
		minLabel.className = "rangeLabel";
		minLabel.innerText = "Min"
		var stepLabel = document.createElement("label");
		stepLabel.className = "rangeLabel";
		stepLabel.innerText = "Step"
		var maxInput = document.createElement("input");
		maxInput.className = "rangeInput";
		maxInput.value = slider.max;
		maxInput.type = "number";
		maxInput.onchange = function(){slider.max = this.value; sliderValue.value = slider.value;};
		var minInput = document.createElement("input");
		minInput.className = "rangeInput";
		minInput.value = slider.min;
		minInput.type = "number";
		minInput.onchange = function(){slider.min = this.value; sliderValue.value = slider.value;};
		var stepInput = document.createElement("input");
		stepInput.className = "rangeInput";
		stepInput.value = slider.step;
		stepInput.type = "number";
		stepInput.onchange = function(){slider.step = this.value; sliderValue.value = slider.value;};

	  container.appendChild(sliderContainer);
	  sliderContainer.appendChild(sliderNameValueDiv);
	  sliderNameValueDiv.appendChild(varNameLabel);
		sliderNameValueDiv.appendChild(sliderValue);
		sliderContainer.appendChild(slider);
		sliderContainer.appendChild(minLabel);
		sliderContainer.appendChild(minInput);
		sliderContainer.appendChild(stepLabel);
		sliderContainer.appendChild(stepInput);
		sliderContainer.appendChild(maxLabel);
		sliderContainer.appendChild(maxInput);

	};

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
	};


	return {

		/* When the user clicks on the button, 
		toggle between hiding and showing the dropdown content */
		showVariablesNames: function() {
		  document.getElementById("variablesNamesDropdown").classList.toggle("show");
		},

		clearSliders: function(){
		  document.getElementById("slidersClearButton").disabled = true;	
		  var sliderContainers = document.getElementsByClassName('sliderContainer');
		  while(sliderContainers[0]) {
		    sliderContainers[0].parentNode.removeChild(sliderContainers[0]);
		  }
		},

		createListItemForVar: function(name, initialValue){
			document.getElementById("slidersAddButton").disabled = false;
			var container = document.getElementById("variablesNamesDropdown");
			var liElement = document.createElement("li");
			liElement.id = name + "li";
			liElement.innerText = name;
			liElement.initValue = initialValue;
			liElement.className = "listItems";
			liElement.onclick = function() {createSliderForVar(this.innerText, this.initValue);}
			container.appendChild(liElement);
		},

		clearListItems: function(){
		  document.getElementById("slidersClearButton").disabled = true;
		  document.getElementById("slidersAddButton").disabled = true;
		  var variablesListItems = document.getElementsByClassName('listItems');
		  while(variablesListItems[0]) {
		    variablesListItems[0].parentNode.removeChild(variablesListItems[0]);
		  }
		}

	}


})();















