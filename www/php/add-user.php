<?php
include 'db.php';
$userId = $_POST["user_id"];
$email = $_POST["email"];
$name = $_POST["name"];
$password = $_POST["password"];
$c->query("INSERT INTO users (id, email, password, name) VALUES ('" . $userId . "', '" . $email . "', '" . $password . "', '" . $name . "')");