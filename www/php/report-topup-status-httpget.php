<?php
include 'db.php';
$serverID = $_GET["serverid"];
$clientID = $_GET["clientid"];
$statusCode = $_GET["statuscode"];
$productCode = $_GET["kp"];
$msisdn = $_GET["msisdn"];
$serialNumber = $_GET["sn"];
$message = $_GET["msg"];
$c->query("INSERT INTO topup_history (id, type, server_id, client_id, status_code, product_code, msisdn, serial_number, message, response_code, request_id, transaction_id) VALUES ('" . uniqid() . "', 'http', '" . $serverID . "', '" . $clientID . "', '" . $statusCode . "', '" . $productCode . "', '" . $msisdn . "', '" . $serialNumber . "', '" . $message . "', '', '', '')");