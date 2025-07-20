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
	  
	  let startTxtIndex = 0;
	  let currentLineNumber = 1;
	  let lineNumbersArray = [];
	  
	  for (let token of this.wholeSourceTokens){
		let tokenTxtIndex = this.sourceCodeTxt.indexOf(token, startTxtIndex);
		currentLineNumber += (this.sourceCodeTxt.substring(startTxtIndex, tokenTxtIndex).match(/\n/g)||[]).length;
		lineNumbersArray.push(currentLineNumber);
		startTxtIndex = tokenTxtIndex + token.length;
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