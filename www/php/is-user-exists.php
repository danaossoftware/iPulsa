<?php
include 'db.php';
$user = $_POST["user"];
$results = $c->query("SELECT * FROM users WHERE email='" . $user . "' OR phone='" . $user . "'");
if ($results && $results->num_rows > 0) {
    echo 0;
} else {
    echo -1;
}