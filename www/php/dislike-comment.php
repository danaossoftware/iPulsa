<?php
include 'db.php';
$commentId = $_POST["comment_id"];
$userId = $_POST["user_id"];
$c->query("DELETE FROM comment_likes WHERE comment_id='" . $commentId . "' AND user_id='" . $userId . "'");