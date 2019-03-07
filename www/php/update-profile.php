<?php
include 'db.php';
$userId = $_POST["user_id"];
$name = $_POST["name"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$c->query("UPDATE users SET name='" . $name . "', phone='" . $phone . "', password='" . $password . "' WHERE id='" . $userId . "'");