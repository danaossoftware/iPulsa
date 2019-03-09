<?php
include 'db.php';
include 'common.php';
$userId = $_POST["user_id"];
$followerId = $_POST["my_user_id"];
$results = $c->query("SELECT * FROM followers WHERE user_id='" . $userId . "' AND follower_id='" . $followerId . "'");
if ($results && $results->num_rows > 0) {
    echo 0;
} else {
    echo -1;
}