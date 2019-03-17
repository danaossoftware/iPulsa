<?php
include 'db.php';
$messageId = $_POST["id"];
$c->query("DELETE FROM messages WHERE id='" . $messageId . "'");