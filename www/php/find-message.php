<?php
include 'db.php';
include 'common.php';
$senderId = $_POST["sender-id"];
$receiverId = $_POST["receiver-id"];
$searchedMessageId = $_POST["message-id"];
// Ambil jumlah pesan terlebih dahulu
$totalMessages = 0;
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "'");
$totalMessages += $results->num_rows;
$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "'");
$totalMessages += $results->num_rows;
// Cari pesan dengan id yang sama dengan $searchedMessageId
$start = 0;
$messages = [];
$totalMessagesRead = 0;
while (true) {
	if ($totalMessagesRead >= $totalMessages) {
		echo "";
		return;
	}
	$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $senderId . "' AND receiver_id='" . $receiverId . "' ORDER BY sent_date DESC LIMIT " . $start . ",10");
	if ($results && $results->num_rows > 0) {
		$correctMessageFound = false;
		while ($row = $results->fetch_assoc()) {
			array_push($messages, $row);
			if ($row["id"] == $searchedMessageId) {
				$correctMessageFound = true;
			}
			$totalMessagesRead++;
		}
		if ($correctMessageFound) {
			echo json_encode($messages);
			return;
		}
	} else {
		$results = $c->query("SELECT * FROM messages WHERE sender_id='" . $receiverId . "' AND receiver_id='" . $senderId . "' ORDER BY sent_date DESC LIMIT " . $start . ",10");
		$correctMessageFound = false;
		while ($row = $results->fetch_assoc()) {
			array_push($messages, $row);
			if ($row["id"] == $searchedMessageId) {
				$correctMessageFound = true;
			}
			$totalMessagesRead++;
		}
		if ($correctMessageFound) {
			echo json_encode($messages);
			return;
		}
	}
	$start += 10;
}