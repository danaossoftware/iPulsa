<?php
include 'db.php';
$senderId = $_GET["sender-id"];
$receiverId = $_GET["receiver-id"];
$date = round(microtime(true)*1000);
$c->query("UPDATE messages SET read_date=" . $date . " WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "' AND read_date=0");