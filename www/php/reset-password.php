<?php
include 'db.php';
$email = $_GET["email"];
$password = $_GET["password"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    $c->query("UPDATE users SET password='" . $password . "' WHERE email='" . $email . "'");
    echo 0;
} else {
    echo -1;
}