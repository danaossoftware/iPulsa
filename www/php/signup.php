<?php
include 'db.php';
$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];
$referral = $_GET["referral"];
$userId = uniqid();
if ($c->query("INSERT INTO users (id, name, email, password, referral) VALUES ('" . $userId . "', '" . $name . "', '" . $email . "', '" . $password . "', '" . $referral . "')")) {
    session_start();
    $_SESSION["ipulsa_user_id"] = $userId;
    $_SESSION["ipulsa_email"] = $email;
    $_SESSION["ipulsa_password"] = $password;
    $params = session_get_cookie_params();
    $expiryDate = 7; //Expiry date, in days
    setcookie(session_name(), $_COOKIE[session_name()], time() + $expiryDate*24*60*60, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    echo 0;
} else {
    echo -1;
}