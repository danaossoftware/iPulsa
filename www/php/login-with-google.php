<?php
include 'db.php';
$email = $_GET["email"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    session_start();
    $_SESSION["ipulsa_user_id"] = $results->fetch_assoc()["id"];
    $_SESSION["ipulsa_email"] = $email;
    $params = session_get_cookie_params();
    $expiryDate = 7; //Expiry date, in days
    setcookie(session_name(), $_COOKIE[session_name()], time() + $expiryDate*24*60*60, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    echo 0;
} else {
    echo -1;
}