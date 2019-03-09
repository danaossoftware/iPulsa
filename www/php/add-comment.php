<?php
include 'db.php';
include 'common.php';
$commendId = uniqid();
$feedId = $_POST["post-id"];
$comment = $_POST["comment"];
$commenter = $_POST["user-id"];
$c->query("INSERT INTO comments (id, feed_id, commenter, comment) VALUES ('" . $commendId . "', '" . $feedId . "', '" . $commenter . "', '" . $comment . "')");
echo $commendId;