<?php
include 'db.php';
session_id("ipulsa");
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$productCode = $_POST["product_code"];
$price = intval($_POST["price"]);
$status = intval($_POST["status"]);
$c->query("INSERT INTO data_history (id, user_id, product_code, price, status) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $productCode . "', " . $price . ", " . $status . ")");