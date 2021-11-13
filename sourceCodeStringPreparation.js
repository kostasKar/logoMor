




function prepareSourceCodeText(inputStr){

	inputStr = inputStr.toLowerCase();
	inputStr = inputStr.replace(/([\[\]\(\)\+\-\*\/])/g, " $1 "); //isolate operators and enclosures
	inputStr = inputStr.replace(/([<>])([^=])/g, " $1 $2");       //isolate standalone <, >
	inputStr = inputStr.replace(/([<>]=)/g, " $1 ");              //isolate <=, >=
	inputStr = inputStr.replace(/([^<>])(=)/g, "$1 $2 ");         //isolate standalone =
	inputStr = inputStr.replace(/;.*$/gm, " ");                   //remove comments

	return inputStr;
}