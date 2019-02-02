<?php
include 'db.php';
$feedId = $_GET["post-id"];
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$c->query("DELETE FROM likes WHERE feed_id='" . $feedId . "' AND user_id='" . $userId . "'");