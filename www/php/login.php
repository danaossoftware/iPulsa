<?php
include 'db.php';
include 'get-ip.php';
$email = $_GET["email"];
$password = $_GET["password"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "' AND password='" . $password . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    /*$ip = getIP();
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active) VALUES ('" . uniqid() . "', '" . $row["id"] . "', '" . $ip . "', " . round(microtime(true)*1000) . ")");*/
    session_id("ipulsa");
    session_start();
    $_SESSION["ipulsa_user_id"] = $row["id"];
    echo 0;
} else {
    echo -1;
}