<?php
include 'db.php';
$senderId = $_GET["sender-id"];
$receiverId = $_GET["receiver-id"];
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "' ORDER BY sent_date DESC LIMIT 1");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}