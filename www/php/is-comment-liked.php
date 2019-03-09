<?php
include 'db.php';
$commentId = $_POST["comment_id"];
$userId = $_POST["user_id"];
$results = $c->query("SELECT * FROM comment_likes WHERE comment_id='" . $commentId . "' AND user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
	echo 1;
} else {
	echo 0;
}