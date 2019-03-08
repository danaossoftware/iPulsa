<?php
include 'db.php';
$userId = $_POST["user-id"];
$start = intval($_POST["start"]);
$results = $c->query("SELECT * FROM feed WHERE user_id='" . $userId . "' LIMIT " . $start . ",10");
$posts = [];
while ($row = $results->fetch_assoc()) {
    array_push($posts, $row);
}
echo json_encode($posts);