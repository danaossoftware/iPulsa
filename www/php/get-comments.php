<?php
include 'db.php';
$start = intval($_POST["start"]);
$feedId = $_POST["post-id"];
$results = $c->query("SELECT * FROM comments WHERE feed_id='" . $feedId . "'");
$comments = [];
if ($results && $results->num_rows > 0) {
    while ($row = $results->fetch_assoc()) {
        array_push($comments, $row);
    }
}
echo json_encode($comments);