<?php
include 'db.php';
session_id("ipulsa");
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$type = intval($_POST["type"]);
$nominal = intval($_POST["nominal"]);
$status = intval($_POST["status"]); //0 = Failed, 1 = Success
$c->query("INSERT INTO electricity_history (id, user_id, type, nominal, date, status) VALUES ('" . uniqid() . "', '" . $userId . "', " . $type . ", " . $nominal . ", " . round(microtime(true)*1000) . ", " . $status . ")");