<?php
include 'db.php';
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$results = $c->query("SELECT * FROM followers WHERE follower_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $posts = [];
    $count = mysqli_num_rows($c->query("SELECT * FROM feed"));
    $cmd = "SELECT * FROM feed WHERE user_id=";
    $cnt = mysqli_num_rows($results);
    $i = 0;
    while ($row = $results->fetch_assoc()) {
        $userId = $row["user_id"];
        if ($i < $cnt-1) {
            $cmd .= ("'" . $userId . "' OR user_id=");
        } else {
            $cmd .= ("'" . $userId . "'");
        }
        $i++;
    }
    $cmd .= (" ORDER BY date DESC LIMIT " . $count);
    $results = $c->query($cmd);
    while ($row = $results->fetch_assoc()) {
        array_push($posts, $row);
    }
    echo json_encode($posts);
} else {
    echo -1;
}