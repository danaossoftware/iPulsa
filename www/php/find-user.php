<?php
include 'db.php';
$key = $_POST["key"];
$results = $c->query("SELECT * FROM users WHERE email COLLATE UTF8_GENERAL_CI LIKE '%" . $key . "%' ");
if ($results && $results->num_rows > 0) {
    $users = [];
    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }
    echo json_encode($users);
} else {
    echo -1;
}