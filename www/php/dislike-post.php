<?php
include 'db.php';
include 'common.php';
$feedId = $_POST["post_id"];
$userId = $_POST["user_id"];
$c->query("DELETE FROM likes WHERE feed_id='" . $feedId . "' AND user_id='" . $userId . "'");