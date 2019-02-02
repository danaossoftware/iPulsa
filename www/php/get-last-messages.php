<?php
include 'db.php';
include 'common.php';
$userId = getUserID();
$results = $c->query("SELECT * FROM last_messages WHERE sender_id='" . $userId . "' OR receiver_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $messages = [];
    while ($row = $results->fetch_assoc()) {
        array_push($messages, $row);
    }
    echo json_encode($messages);
} else {
    echo -1;
}