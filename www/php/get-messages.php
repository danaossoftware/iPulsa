<?php
include 'db.php';
include 'common.php';
$senderId = $_POST["sender-id"];
$receiverId = $_POST["receiver-id"];
$start = intval($_POST["start"]);
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "' ORDER BY sent_date DESC LIMIT " . $start . ",10");
$messages = [];
if ($results && $results->num_rows > 0) {
    while ($row = $results->fetch_assoc()) {
        array_push($messages, $row);
    }
}
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "' ORDER BY sent_date DESC LIMIT " . $start . ",10");
if ($results && $results->num_rows > 0) {
	while ($row = $results->fetch_assoc()) {
		array_push($messages, $row);
	}
}
echo json_encode($messages);