<?php
include 'db.php';
include 'common.php';
$followedUserId = $_POST["user-id"];
$userId = $_POST["my-user-id"];
$results = $c->query("SELECT * FROM followers WHERE user_id='" . $followedUserId . "' AND follower_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
} else {
    $c->query("INSERT INTO followers (id, user_id, follower_id) VALUES ('" . uniqid() . "', '" . $followedUserId . "', '" . $userId . "')");
}