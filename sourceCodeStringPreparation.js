




function prepareSourceCodeText(inputStr){

	inputStr = inputStr.replace("[", " [ ");
	inputStr = inputStr.replace("]", " ] ");
	inputStr = inputStr.replace("(", " ( ");
	inputStr = inputStr.replace(")", " ) ");

	return inputStr;
}