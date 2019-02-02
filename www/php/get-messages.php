<?php
include 'db.php';
session_start();
$receiverId = $_SESSION["receiver-id"];
$senderId = $_SESSION["ipulsa_user_id"];
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
if ($results && $results->num_rows > 0) {
    $messages = [];
    while ($row = $results->fetch_assoc()) {
        array_push($messages, $row);
    }
    echo json_encode($messages);
} else {
    $results = $c->query("SELECT * FROM messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
    if ($results && $results->num_rows > 0) {
        $messages = [];
        while ($row = $results->fetch_assoc()) {
            array_push($messages, $row);
        }
        echo json_encode($messages);
    } else {
        echo -1;
    }
}