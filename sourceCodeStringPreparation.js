




function prepareSourceCodeText(inputStr){

	inputStr = inputStr.toLowerCase();
	inputStr = inputStr.replace("[", " [ ");
	inputStr = inputStr.replace("]", " ] ");
	inputStr = inputStr.replace("(", " ( ");
	inputStr = inputStr.replace(")", " ) ");
	inputStr = inputStr.replace("+", " + ");
	inputStr = inputStr.replace("-", " - ");
	inputStr = inputStr.replace("*", " * ");
	inputStr = inputStr.replace("/", " / ");
	inputStr = inputStr.replace(/([<|>])([^=])/, " $1 $2"); //separate only standalone < or >
	inputStr = inputStr.replace(/([<|>]=)/, " $1 ");
	inputStr = inputStr.replace(/([^<|>])(=)/, "$1 $2 ");

	return inputStr;
}