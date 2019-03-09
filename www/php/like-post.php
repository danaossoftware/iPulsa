<?php
include 'db.php';
include 'common.php';
$feedId = $_POST["post_id"];
$userId = $_POST["user_id"];
$c->query("INSERT INTO likes (id, feed_id, user_id) VALUES ('" . uniqid() . "', '" . $feedId . "', '" . $userId . "')");