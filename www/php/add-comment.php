<?php
include 'db.php';
include 'common.php';
$commendId = uniqid();
$feedId = $_POST["post-id"];
$comment = $_POST["comment"];
$commenter = $_POST["user-id"];
$c->query("INSERT INTO comments (id, feed_id, commenter, comment, date) VALUES ('" . $commendId . "', '" . $feedId . "', '" . $commenter . "', '" . $comment . "', " . round(microtime(true)*1000) . ")");
echo $commendId;