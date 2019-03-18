<?php
include 'db.php';
$messageId = $_POST["id"];
$readDate = $_POST["read-date"];
$c->query("UPDATE messages SET read_date=" . $readDate . " WHERE id='" . $messageId . "'");