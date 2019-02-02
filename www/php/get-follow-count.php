<?php
include 'db.php';
$userId = $_GET["user-id"];
$results = $c->query("SELECT * FROM followers WHERE user_id='" . $userId . "'");
$followerCount = 0;
if ($results) {
    $followerCount = $results->num_rows;
}
$results = $c->query("SELECT * FROM followers WHERE follower_id='" . $userId . "'");
$followingCount = 0;
if ($results) {
    $followingCount = $results->num_rows;
}
echo "{\"follower\": " . $followerCount . ", \"following\": " . $followingCount . "}";