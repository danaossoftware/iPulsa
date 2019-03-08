<?php
include 'db.php';
$userId = $_POST["user_id"];
$type = intval($_POST["type"]);
$productCode = $_POST["product_code"];
$price = intval($_POST["price"]);
$status = intval($_POST["status"]); //0 = Failed, 1 = Success
$c->query("INSERT INTO emoney_history (id, user_id, type, product_code, price, date, status) VALUES ('" . uniqid() . "', '" . $userId . "', " . $type . ", '" . $productCode . "', " . $price . ", " . round(microtime(true)*1000) . ", " . $status . ")");