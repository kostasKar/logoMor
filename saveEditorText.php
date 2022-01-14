<?php


if ($_SERVER['REQUEST_METHOD'] === 'POST'){

	$id = $_POST['id'];
	$obj->sourceCode = $_POST['editorCode'];
	$obj->projectName = $_POST['projectName'];

	if ($id != null) {		
		$filename =  "savedFiles/" . $id . ".txt";
		$file = fopen($filename, "w");
		fwrite($file, json_encode($obj));
		fclose($file);
	}
} else if ($_SERVER['REQUEST_METHOD'] === 'GET'){

	$id = $_GET['id'];

	if ($id != null){
		$filename = "savedFiles/" . $id . ".txt";
		if (file_exists($filename)){
			$myfile = fopen($filename, "r");
			echo fread($myfile, filesize($filename));
			fclose($myfile);
		} else {
			echo "";
		}
	}
}


?>