<?php
include 'db.php';
$userId = $_GET["user-id"];
session_start();
$followerId = $_SESSION["ipulsa_user_id"];
$results = $c->query("SELECT * FROM followers WHERE user_id='" . $userId . "' AND follower_id='" . $followerId . "'");
if ($results && $results->num_rows > 0) {
    echo 0;
} else {
    echo -1;
}