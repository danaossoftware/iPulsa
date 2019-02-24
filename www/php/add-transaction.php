<?php
include 'db.php';
$transactionID = $_GET["transaction_id"];
$code = $_GET["code"];
session_id("ipulsa");
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$c->query("INSERT INTO transaction_ids (id, user_id, code, date) VALUES ('" . $transactionID . "', '" . $userId . "', '" . $code . "', " . round(microtime(true)*1000) . ")");