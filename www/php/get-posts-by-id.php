<?php
include 'db.php';
$userId = $_GET["user-id"];
$results = $c->query("SELECT * FROM feed WHERE user_id='" . $userId . "'");
$posts = [];
while ($row = $results->fetch_assoc()) {
    array_push($posts, $row);
}
echo json_encode($posts);