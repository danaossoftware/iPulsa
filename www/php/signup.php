<?php
include 'db.php';
$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];
$referral = $_GET["referral"];
$userId = uniqid();
$ip = $_SERVER["REMOTE_ADDR"];
if ($c->query("INSERT INTO users (id, name, email, password, referral) VALUES ('" . $userId . "', '" . $name . "', '" . $email . "', '" . $password . "', '" . $referral . "')")) {
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $ip . "', " . round(microtime(true)*1000) . ")");
    echo 0;
} else {
    echo -1;
}