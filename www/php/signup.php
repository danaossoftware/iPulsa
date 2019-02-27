<?php
include 'db.php';
$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$referral = $_POST["referral"];
$userId = uniqid();
$results = $c->query("SELECT * FROM users WHERE email='" . $email. "'");
if ($results && $results->num_rows > 0) {
	echo -1;
	return;
}
$c->query("INSERT INTO users (id, name, email, password, referral) VALUES ('" . $userId . "', '" . $name . "', '" . $email . "', '" . $password . "', '" . $referral . "')");
session_id("ipulsa");
session_start();
$_SESSION["ipulsa_user_id"] = $userId;
echo 0;