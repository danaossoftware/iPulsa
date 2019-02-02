<?php
include 'db.php';
$feedId = $_GET["post-id"];
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$c->query("INSERT INTO likes (id, feed_id, user_id) VALUES ('" . uniqid() . "', '" . $feedId . "', '" . $userId . "')");