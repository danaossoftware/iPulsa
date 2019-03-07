<?php
include 'db.php';
$userId = $_POST["user_id"];
$type = intval($_POST["type"]);
$productCode = $_POST["product_code"];
$nominal = intval($_POST["nominal"]);
$status = intval($_POST["status"]);
$c->query("INSERT INTO gojek_history (id, user_id, type, product_code, nominal, date, status) VALUES ('" . uniqid() . "', '" . $userId . "', " . $type . ", '" . $productCode . "', " . $nominal . ", " . $date . ", " . $status . ")");