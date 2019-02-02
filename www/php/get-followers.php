<?php
include 'db.php';
$userId = $_GET["user-id"];
$results = $c->query("SELECT * FROM followers WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $followers = [];
    while ($row = $results->fetch_assoc()) {
        array_push($followers, $row);
    }
    echo json_encode($followers);
} else {
    echo -1;
}