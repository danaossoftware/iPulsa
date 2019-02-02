<?php
include 'db.php';
include 'common.php';
$userId = getUserID();
$results = $c->query("SELECT * FROM followers WHERE follower_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $users = [];
    while ($row = $results->fetch_assoc()) {
        array_push($users, $row);
    }
    echo json_encode($users);
} else {
    echo -1;
}