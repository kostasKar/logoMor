var logoParser = {

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
	  var sourceCodeIndex = 0;
	  var lineNumbersArray = [];
	  
	  for (i = 0; i < this.wholeSourceTokens.length; i++){
	    sourceCodeIndex = this.sourceCodeTxt.indexOf(this.wholeSourceTokens[i], sourceCodeIndex);
	    lineNumbersArray.push((this.sourceCodeTxt.substring(0, sourceCodeIndex).match(/\n/g)||[]).length + 1);
	  }

	  return lineNumbersArray;
	},

	parse: function(sourceCode = null){
	  if (sourceCode === null){
		  sourceCode = myCodeMirror.getValue();
	  }
	  this.sourceCodeTxt = this.prepareSourceCodeText(sourceCode);
	  this.wholeSourceTokens = this.sourceCodeTxt.trim().split(/[\s]+/).filter(function (el) {return el != "";});
	  this.mainSourceTokens = [...this.wholeSourceTokens];
	  this.mainSourceTokensLineNumbers = this.createLineNumbersArrayForWholeProgram();
	  console.log(this.mainSourceTokens);
	}

}