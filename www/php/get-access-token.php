<?php
include 'db.php';
$userId = $_POST["user-id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
$row = $results->fetch_assoc();
$accessToken = $row["fcm_access_token"];
echo $accessToken;