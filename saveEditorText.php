<?php


if ($_SERVER['REQUEST_METHOD'] === 'POST'){

	$id = $_POST['id'];
	$code = $_POST['editorCode'];
	if ($id != null) {		
		$filename =  "savedFiles/" . $id . ".txt";
		$file = fopen($filename, "w");
		fwrite($file, $code);
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