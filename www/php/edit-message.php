<?php
include 'db.php';
$messageId = $_POST["id"];
$message = $_POST["message"];
$c->query("UPDATE messages SET message='" . $message . "' WHERE id='" . $messageId . "'");
$results = $c->query("SELECT * FROM messages WHERE id='" . $messageId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $senderId = $row["sender_id"];
    $receiverId = $row["receiver_id"];
    $c->query("UPDATE last_messages SET last_message='" . $message . "' WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
}