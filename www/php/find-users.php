<?php
include 'db.php';
include 'common.php';
$name = getUserID();
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$results = $c->query("SELECT * FROM users WHERE name='" . $name . "'");
$users = [];
while ($row = $results->fetch_assoc()) {
    array_push($users, $row);
}
echo json_encode($users);