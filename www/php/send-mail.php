<?php
$from = $_GET["from"];
$to = $_GET["to"];
$subject = $_GET["subject"];
$content = $_GET["content"];
include 'mail.php';
sendMail($from, $to, $subject, $content);