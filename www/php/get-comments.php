<?php
include 'db.php';
$feedId = $_GET["post-id"];
$results = $c->query("SELECT * FROM comments WHERE feed_id='" . $feedId . "'");
if ($results && $results->num_rows > 0) {
    $comments = [];
    while ($row = $results->fetch_assoc()) {
        array_push($comments, $row);
    }
    echo json_encode($comments);
} else {
    echo -1;
}