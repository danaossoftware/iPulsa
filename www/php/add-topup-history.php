<?php
include 'db.php';
session_id("ipulsa");
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$productCode = $_POST["product_code"];
$price = intval($_POST["price"]);
$c->query("INSERT INTO topup_history (id, user_id, product_code, price) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $productCode . "', " . $price . ")");