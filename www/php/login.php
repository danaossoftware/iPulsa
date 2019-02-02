<?php
include 'db.php';
$email = $_GET["email"];
$password = $_GET["password"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "' AND password='" . $password . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active) VALUES ('" . uniqid() . "', '" . $row["id"] . "', '" . $ip . "', " . round(microtime(true)*1000) . ")");
    echo 0;
} else {
    echo -1;
}