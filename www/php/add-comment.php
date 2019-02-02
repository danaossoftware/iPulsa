<?php
include 'db.php';
$feedId = $_POST["post-id"];
$comment = $_POST["comment"];
session_start();
$commenter = $_SESSION["ipulsa_user_id"];
$c->query("INSERT INTO comments (id, feed_id, commenter, comment) VALUES ('" . uniqid() . "', '" . $feedId . "', '" . $commenter . "', '" . $comment . "')");