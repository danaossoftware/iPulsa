<?php
include 'db.php';
$senderId = $_POST["sender-id"];
$receiverId = $_POST["receiver-id"];
$c->query("DELETE FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
$c->query("DELETE FROM messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");