<?php
include 'db.php';
$messageId = $_GET["id"];
$c->query("DELETE FROM messages WHERE id='" . $messageId . "'");