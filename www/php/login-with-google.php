<?php
include 'db.php';
include 'get-ip.php';
$email = $_GET["email"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $ip = getIP();
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active) VALUES ('" . uniqid() . "', '" . $row["id"] . "', '" . $ip . "', " . round(microtime(true)*1000) . ")");
    echo 0;
} else {
    echo -1;
}