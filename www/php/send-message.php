<?php
include 'db.php';
$receiverId = $_POST["receiver-id"];
$message = $_POST["message"];
session_start();
$senderId = $_SESSION["ipulsa_user_id"];
$date = round(microtime(true)*1000);
$c->query("INSERT INTO messages (id, sender_id, receiver_id, message, sent_date) VALUES ('" . uniqid() . "', '" . $senderId . "', '" . $receiverId . "', '" . $message . "', '" . $date . "')");
$results = $c->query("SELECT * FROM last_messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
if ($results && $results->num_rows > 0) {
    $c->query("UPDATE last_messages SET last_message='" . $message . "' WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
} else {
    $results = $c->query("SELECT * FROM last_messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
    if ($results && $results->num_rows > 0) {
        $c->query("UPDATE last_messages SET last_message='" . $message . "' WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
    } else {
        $c->query("INSERT INTO last_messages (id, sender_id, receiver_id, last_message) VALUES ('" . uniqid() . "', '" . $senderId . "', '" . $receiverId . "', '" . $message . "')");
    }
}