<?php
include 'db.php';
$userId = $_POST["user_id"];
$email = $_POST["email"];
$c->query("INSERT INTO users (id, email) VALUES ('" . $userId . "', '" . $email . "')");
