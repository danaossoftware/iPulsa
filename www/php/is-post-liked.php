<?php
include 'db.php';
include 'common.php';
$feedId = $_POST["post_id"];
$userId = $_POST["user_id"];
$results = $c->query("SELECT * FROM likes WHERE feed_id='" . $feedId . "' AND user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    echo 1;
} else {
    echo 0;
}