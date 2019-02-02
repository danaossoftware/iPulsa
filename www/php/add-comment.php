<?php
include 'db.php';
include 'common.php';
$feedId = $_POST["post-id"];
$comment = $_POST["comment"];
$commenter = getUserID();
$c->query("INSERT INTO comments (id, feed_id, commenter, comment) VALUES ('" . uniqid() . "', '" . $feedId . "', '" . $commenter . "', '" . $comment . "')");