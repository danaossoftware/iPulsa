<?php
include 'db.php';
$followedUserId = $_GET["user-id"];
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$c->query("DELETE FROM followers WHERE user_id='" . $followedUserId . "' AND follower_id='" . $userId . "'");