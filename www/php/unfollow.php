<?php
include 'db.php';
include 'common.php';
$followedUserId = $_POST["user-id"];
$userId = getUserID();
$c->query("DELETE FROM followers WHERE user_id='" . $followedUserId . "' AND follower_id='" . $userId . "'");