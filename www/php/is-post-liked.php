<?php
include 'db.php';
$feedId = $_GET["post-id"];
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$results = $c->query("SELECT * FROM likes WHERE feed_id='" . $feedId . "' AND user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    echo 1;
} else {
    echo 0;
}