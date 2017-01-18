<?php 
require 'config/global.php';
if (isset($_POST['submit'])) {
	$email = "jsingizi7@gmail.com";
	$password = "tafadzwa";
	if(filter_input(INPUT_POST, 'email')==$email&&filter_input(INPUT_POST, 'password')==$password){
		echo "<script>alert('Login successfull');</script>";
	}else{
		echo "<script>alert('Invalid login');</script>";
	}
	//echo "<script>alert('It works James!!!');</script>";
}

if(!empty($_POST)){
	$params  = array('email' => $_POST['email'], 'password' => $_POST['password']);
}else{
	$params  = array('email' => '', 'password' => '');
}

echo $twig->render('login.html',$params);