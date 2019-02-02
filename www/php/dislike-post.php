<?php
include 'db.php';
include 'common.php';
$feedId = $_GET["post-id"];
$userId = getUserID();
$c->query("DELETE FROM likes WHERE feed_id='" . $feedId . "' AND user_id='" . $userId . "'");