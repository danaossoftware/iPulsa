<?php
include 'db.php';
include 'common.php';
$userId = getUserID();
$results = $c->query("SELECT * FROM feed WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $posts = [];
    while ($row = $results->fetch_assoc()) {
        array_push($posts, $row);
    }
    echo json_encode($posts);
} else {
    echo -1;
}