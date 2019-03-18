<?php
include 'db.php';
$senderId = $_POST["sender-id"];
$receiverId = $_POST["receiver-id"];
$totalMessages = 0;
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
$totalMessages += $results->num_rows;
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
$totalMessages += $results->num_rows;
echo $totalMessages;