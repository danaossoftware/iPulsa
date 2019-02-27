<?php

function getUserID() {
    $c = new mysqli("localhost", "u954666570_pulsa", "HelloWorld123");
    $c->select_db("u954666570_pulsa");
	session_id("ipulsa");
	session_start();
	echo $_SESSION["ipulsa_user_id"];
};