<?php
include 'db.php';
$messageId = $_POST["message-id"];
$senderId = $_POST["sender-id"];
$receiverId = $_POST["receiver-id"];
$message = $_POST["message"];
$c->query("INSERT INTO messages (id, sender_id, receiver_id, message, reply_to_id) VALUES ('" . uniqid() . "', '" . $senderId . "', '" . $receiverId . "', '" . $message . "', '" . $messageId . "')");