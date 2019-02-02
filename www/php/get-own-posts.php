<?php
include 'db.php';
session_start();
$userId = $_SESSION["ipulsa_user_id"];
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