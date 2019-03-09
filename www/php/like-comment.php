<?php
include 'db.php';
$commentId = $_POST["comment_id"];
$userId = $_POST["user_id"];
$c->query("INSERT INTO comment_likes (id, comment_id, user_id) VALUES ('" . uniqid() . "', '" . $commentId . "', '" . $userId . "')");