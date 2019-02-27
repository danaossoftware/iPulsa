<?php
include 'db.php';
include 'get-ip.php';
$user = $_POST["user"];
$password = $_POST["password"];
$results = $c->query("SELECT * FROM users WHERE email='" . $user . "' OR phone='" . $user . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
	if ($row["password"] != $password) {
		echo -2;
		return;
	}
    session_id("ipulsa");
    session_start();
    $_SESSION["ipulsa_user_id"] = $row["id"];
    echo 0;
} else {
    echo -1;
}