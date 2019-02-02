<?php
include 'db.php';
include 'common.php';
$followedUserId = $_GET["user-id"];
$userId = getUserID();
$c->query("DELETE FROM followers WHERE user_id='" . $followedUserId . "' AND follower_id='" . $userId . "'");