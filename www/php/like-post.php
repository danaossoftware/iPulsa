<?php
include 'db.php';
include 'common.php';
$feedId = $_GET["post-id"];
$userId = getUserID();
$c->query("INSERT INTO likes (id, feed_id, user_id) VALUES ('" . uniqid() . "', '" . $feedId . "', '" . $userId . "')");