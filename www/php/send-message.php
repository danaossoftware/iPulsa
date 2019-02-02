<?php
$attachmentURL = $_POST["attachment-url"];
/*include 'db.php';
include 'common.php';
$receiverId = $_POST["receiver-id"];
$message = $_POST["message"];
$attachmentType = $_POST["attachment-type"];
$senderId = getUserID();
$date = round(microtime(true)*1000);
$c->query("INSERT INTO messages (id, sender_id, receiver_id, message, sent_date, attachment, attachment_type) VALUES ('" . uniqid() . "', '" . $senderId . "', '" . $receiverId . "', '" . $message . "', '" . $date . "', '" . $attachmentURL . "', '" . $attachmentType . "')");
$results = $c->query("SELECT * FROM last_messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
if ($results && $results->num_rows > 0) {
    if ($attachmentURL == "") {
        $c->query("UPDATE last_messages SET last_message='" . $message . "' WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
    } else {
        $c->query("UPDATE last_messages SET last_message='Media' WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
    }
} else {
    $results = $c->query("SELECT * FROM last_messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
    if ($results && $results->num_rows > 0) {
        if ($attachmentURL == "") {
            $c->query("UPDATE last_messages SET last_message='" . $message . "' WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
        } else {
            $c->query("UPDATE last_messages SET last_message='Media' WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
        }
    } else {
        if ($attachmentURL == "") {
            $c->query("INSERT INTO last_messages (id, sender_id, receiver_id, last_message) VALUES ('" . uniqid() . "', '" . $senderId . "', '" . $receiverId . "', '" . $message . "')");
        } else {
            $c->query("INSERT INTO last_messages (id, sender_id, receiver_id, last_message) VALUES ('" . uniqid() . "', '" . $senderId . "', '" . $receiverId . "', 'Media')");
        }
    }
}*/
echo $attachmentURL;