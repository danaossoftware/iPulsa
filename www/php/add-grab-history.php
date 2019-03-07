<?php
include 'db.php';
session_id("ipulsa");
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$type = intval($_POST["type"]);
$productCode = $_POST["product_code"];
$nominal = intval($_POST["nominal"]);
$status = intval($_POST["status"]);
$c->query("INSERT INTO grab_history (id, user_id, type, product_code, nominal, date, status) VALUES ('" . uniqid() . "', '" . $userId . "', " . $type . ", '" . $productCode . "', " . $nominal . ", " . $date . ", " . $status . ")");