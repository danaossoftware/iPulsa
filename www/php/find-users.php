<?php
include 'db.php';
include 'common.php';
$name = $_GET["name"];
$userId = getUserID();
$results = $c->query("SELECT * FROM users WHERE name='" . $name . "'");
$users = [];
while ($row = $results->fetch_assoc()) {
    array_push($users, $row);
}
echo json_encode($users);