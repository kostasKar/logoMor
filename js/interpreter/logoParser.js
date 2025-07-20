LM.parser = {

	sourceCodeTxt: "",
	wholeSourceTokens: [],
	mainSourceTokens: [],
	mainSourceTokensLineNumbers: [],

	prepareSourceCodeText: function(inputStr){
		inputStr = inputStr.toLowerCase();
		inputStr = inputStr.replace(/([\[\]\(\)\+\-\*\/])/g, " $1 "); //isolate operators and enclosures
		inputStr = inputStr.replace(/([<>])([^=])/g, " $1 $2");       //isolate standalone <, >
		inputStr = inputStr.replace(/([<>]=)/g, " $1 ");              //isolate <=, >=
		inputStr = inputStr.replace(/([^<>])(=)/g, "$1 $2 ");         //isolate standalone =
		inputStr = inputStr.replace(/;.*$/gm, " ");                  //remove comments
		return inputStr;
	},

	createLineNumbersArrayForWholeProgram: function(){
	  
	  let currentTxtIndex = 0;
	  let startTxtIndex = 0;
	  let currentLineNumber = 1;
	  let lineNumbersArray = [];
	  
	  for (let i = 0; i < this.wholeSourceTokens.length; i++){
		currentTxtIndex = this.sourceCodeTxt.indexOf(this.wholeSourceTokens[i], startTxtIndex);
		currentLineNumber += (this.sourceCodeTxt.substring(startTxtIndex, currentTxtIndex).match(/\n/g)||[]).length;
		lineNumbersArray.push(currentLineNumber);
		startTxtIndex = currentTxtIndex + this.wholeSourceTokens[i].length;
	  }
	  
	  return lineNumbersArray;
	},

	parse: function(sourceCode = null){
	  if (sourceCode === null){
		  sourceCode = LM.codeMirror.getValue();
	  }
	  this.sourceCodeTxt = this.prepareSourceCodeText(sourceCode);
	  this.wholeSourceTokens = this.sourceCodeTxt.trim().split(/[\s]+/).filter(function (el) {return el != "";});
	  this.mainSourceTokens = [...this.wholeSourceTokens];
	  this.mainSourceTokensLineNumbers = this.createLineNumbersArrayForWholeProgram();
	  console.log(this.mainSourceTokens);
		LM.retainMode.setForNewSourceTokens(this.mainSourceTokens);
	}

}