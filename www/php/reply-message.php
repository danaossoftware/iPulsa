<?php
include 'db.php';
$messageId = $_POST["message-id"];
$senderId = $_POST["sender-id"];
$receiverId = $_POST["receiver-id"];
$message = $_POST["message"];
$messageId = uniqid();
$sentDate = round(microtime(true)*1000);
$c->query("INSERT INTO messages (id, sender_id, receiver_id, message, reply_to_id, sent_date) VALUES ('" . $messageId . "', '" . $senderId . "', '" . $receiverId . "', '" . $message . "', '" . $messageId . "', " . $sentDate . ")");
echo json_encode($c->query("SELECT * FROM messages WHERE id='" . $messageId . "'")->fetch_assoc());