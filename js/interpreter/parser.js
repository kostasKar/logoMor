LM.parser = (function(){

	let sourceCodeTxt = "";
	let wholeSourceTokens = [];

	function prepareSourceCodeText (inputStr) {
		inputStr = inputStr.toLowerCase();
		inputStr = inputStr.replace(/([\[\]\(\)\+\-\*\/])/g, " $1 "); //isolate operators and enclosures
		inputStr = inputStr.replace(/([<>])([^=])/g, " $1 $2");       //isolate standalone <, >
		inputStr = inputStr.replace(/([<>]=)/g, " $1 ");              //isolate <=, >=
		inputStr = inputStr.replace(/([^<>])(=)/g, "$1 $2 ");         //isolate standalone =
		inputStr = inputStr.replace(/;.*$/gm, " ");                  //remove comments
		return inputStr;
	}

	function createLineNumbersArrayForWholeProgram (){
	  
	  let startTxtIndex = 0;
	  let currentLineNumber = 1;
	  let lineNumbersArray = [];
	  
	  for (let token of wholeSourceTokens){
		let tokenTxtIndex = sourceCodeTxt.indexOf(token, startTxtIndex);
		currentLineNumber += (sourceCodeTxt.substring(startTxtIndex, tokenTxtIndex).match(/\n/g)||[]).length;
		lineNumbersArray.push(currentLineNumber);
		startTxtIndex = tokenTxtIndex + token.length;
	  }
	  
	  return lineNumbersArray;
	}

	return {

		mainSourceTokens: [],
		mainSourceTokensLineNumbers: [],

		parse: function(sourceCode = null){
			if (sourceCode === null){
				sourceCode = LM.codeMirror.getValue();
			}
			sourceCodeTxt = prepareSourceCodeText(sourceCode);
			wholeSourceTokens = sourceCodeTxt.trim().split(/[\s]+/).filter(function (el) {return el != "";});
			this.mainSourceTokens = [...wholeSourceTokens];
			this.mainSourceTokensLineNumbers = createLineNumbersArrayForWholeProgram();
			console.log(this.mainSourceTokens);
			LM.retainMode.setForNewSourceTokens(this.mainSourceTokens);
		}

	}

})();