<?php
include 'db.php';
$messageId = $_POST["id"];
$readDate = round(microtime(true)*1000);
$c->query("UPDATE messages SET read_date=" . $readDate . " WHERE id='" . $messageId . "'");