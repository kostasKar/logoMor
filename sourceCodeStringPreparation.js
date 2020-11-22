




function prepareSourceCodeText(inputStr){

	inputStr = inputStr.toLowerCase();
	inputStr = inputStr.replace(/([\[\]\(\)\+\-\*\/])/g, " $1 ");
	inputStr = inputStr.replace(/([<|>])([^=])/g, " $1 $2"); //separate only standalone < or >
	inputStr = inputStr.replace(/([<|>]=)/g, " $1 ");
	inputStr = inputStr.replace(/([^<|>])(=)/g, "$1 $2 ");
	inputStr = inputStr.replace(/;.*$/g, " ");
	inputStr = inputStr.replace(/;.*\n/g, " ");

	return inputStr;
}