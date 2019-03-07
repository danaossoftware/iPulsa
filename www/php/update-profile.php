<?php
include 'db.php';
$userId = $_POST["user_id"];
$name = $_POST["name"];
$phone = $_POST["phone"];
$c->query("UPDATE users SET name='" . $name . "', phone='" . $phone . "', WHERE id='" . $userId . "'");