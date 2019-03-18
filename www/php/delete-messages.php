<?php
include 'db.php';
$messageIds = explode(";", $_POST["message-ids"]);
for ($i=0; $i<sizeof($messageIds); $i++) {
	$messageId = $messageIds[$i];
	$c->query("DELETE FROM messages WHERE id='" . $messageId . "'");
}